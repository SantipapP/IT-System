from Connectors.ITH_DB_Connection import create_connection
import hashlib
import datetime
from mysql.connector import Error

class UserController:
    def AuthLogin(USER_DATA):
        SHA258PASSWORD = hashlib.sha256(USER_DATA.USER_PASSWORD.encode()).hexdigest() 
        # สร้างการเชื่อมต่อ
        conn = create_connection()

        # ใช้งานการเชื่อมต่อ
        if conn:
            try:
                cursor = conn.cursor(dictionary=True)  # ใช้ dictionary=True เพื่อให้ผลลัพธ์เป็น dictionary

                # ชื่อ Stored Procedure
                stored_procedure = "SP_AuthLogin"

                # เรียกใช้ Stored Procedure โดยใช้ callproc และส่งพารามิเตอร์
                cursor.callproc(stored_procedure, (USER_DATA.USER_USERNAME,SHA258PASSWORD,))

                # ดึงผลลัพธ์จากการเรียก Stored Procedure
                result_json = []
                for result in cursor.stored_results():
                    rows = result.fetchall()
                    columns = [desc[0] for desc in result.description]  # ดึงชื่อคอลัมน์จาก description
                    if rows:
                        for row in rows:
                            result_dict = dict(zip(columns, row))  # สร้าง dictionary โดยใช้ชื่อคอลัมน์
                            # print(result_dict)  # แสดงผลลัพธ์ที่เป็น dictionary
                            result_json.append(result_dict)

                if not result_json:
                    return {"status": 404, "message": "Data not found"}

            except Exception as e:
                return {"status": 500, "message": f"Error: {e}"}
            finally:
                # ปิดการเชื่อมต่อ
                if cursor:
                    cursor.close()
                if conn.is_connected():
                    conn.close()

            return {"status": 200, "data": result_json}

        return {"status": 500, "message": "Database connection failed"}
    
    def FetchUser(USER_DATA):
        # สร้างการเชื่อมต่อ
        conn = create_connection()

        # ใช้งานการเชื่อมต่อ
        if conn:
            try:
                cursor = conn.cursor(dictionary=True)  # ใช้ dictionary=True เพื่อให้ผลลัพธ์เป็น dictionary

                # ชื่อ Stored Procedure
                stored_procedure = "SP_FetchUser"

                # เรียกใช้ Stored Procedure โดยใช้ callproc และส่งพารามิเตอร์
                cursor.callproc(stored_procedure, (USER_DATA.USER_USERNAME,))

                # ดึงผลลัพธ์จากการเรียก Stored Procedure
                result_json = []
                for result in cursor.stored_results():
                    rows = result.fetchall()
                    columns = [desc[0] for desc in result.description]  # ดึงชื่อคอลัมน์จาก description
                    if rows:
                        for row in rows:
                            result_dict = dict(zip(columns, row))  # สร้าง dictionary โดยใช้ชื่อคอลัมน์
                            # print(result_dict)  # แสดงผลลัพธ์ที่เป็น dictionary
                            result_json.append(result_dict)

                if not result_json:
                    return {"status": 404, "message": "Data not found"}

            except Exception as e:
                return {"status": 500, "message": f"Error: {e}"}
            finally:
                # ปิดการเชื่อมต่อ
                if cursor:
                    cursor.close()
                if conn.is_connected():
                    conn.close()

            return {"status": 200, "data": result_json}

        return {"status": 500, "message": "Database connection failed"}
    
    def UpdateUser(USER_DATA):
        SHA258PASSWORD = hashlib.sha256(USER_DATA.USER_PASSWORD.encode()).hexdigest()
        """ฟังก์ชันอัปเดตข้อมูลใน MySQL"""
        conn = create_connection()
        if not conn:
            return {"status": 500, "message": "Database connection failed"}

        try:
            cursor = conn.cursor()
            # ชื่อ Stored Procedure
            stored_procedure = "SP_UpdateUser"
            
            # เรียกใช้ Stored Procedure โดยใช้ callproc
            cursor.callproc(
                stored_procedure,
                (
                    USER_DATA.USER_USERNAME,
                    SHA258PASSWORD,
                    USER_DATA.USER_CHANGEPASS,
                    USER_DATA.USER_EXPIRED,
                )
            )

            # ตรวจสอบว่าแถวไหนถูกอัปเดต
            rows_affected = cursor.rowcount
            if rows_affected == 0:
                return {"status": 404, "message": "Data not found or not updated"}

            # ยืนยันการอัปเดต
            conn.commit()

            return {"status": 200, "message": "User data updated successfully"}

        except Error as e:
            error_message = str(e)  # หรือ e.args ถ้าต้องการรายละเอียดเพิ่มเติมเกี่ยวกับข้อผิดพลาด
            return {"status": 500, "message": f"Error: {error_message}"}
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
        
