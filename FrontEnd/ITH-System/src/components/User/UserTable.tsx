import { format } from 'date-fns';
import axios from "axios";
// import Swal from 'sweetalert2';
// import SHA256 from "crypto-js/sha256";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../hook/API_BASE_URL";
const UserTable = () => {
    const [User, setUser] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>(""); // เพิ่มสถานะสำหรับคำค้นหา

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const UserDataResponse = await axios.post(`${API_BASE_URL}/User/FetchUser`,
                    {
                        "USER_USERNAME": ""
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(UserDataResponse)
                setUser(UserDataResponse.data);
            } catch (error) {
                console.error('Error fetching Operator:', error);
            }
        };

        fetchUser();
    }, []);


    // คำนวณตำแหน่งของข้อมูลที่จะต้องแสดงในหน้าปัจจุบัน
    const indexOfLastOperator = currentPage * itemsPerPage;
    const indexOfFirstOperator = indexOfLastOperator - itemsPerPage;

    // กรองข้อมูลตามคำค้นหา
    const filteredUsers = User.filter(us =>
        us.USER_USERNAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบันหลังจากการกรอง
    const currentUsers = filteredUsers.slice(indexOfFirstOperator, indexOfLastOperator);


    return (
        <>
            <div className="flex flex-col lg:flex-row p-1 justify-between items-center mb-4 space-x-4">
                <div className="flex items-center space-x-2">
                    <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="block px-4 py-2 pr-8 text-base leading-6 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    {/* <button className="btn bg-green-300 hover:bg-green-800" onClick={OperModal('Register_User_Modal')}>Add user</button> */}
                    <input
                        type="text"
                        placeholder="Search user"
                        className="block w-full px-4 py-2 text-base leading-6 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* <button type="button" className="btn btn-primary" onClick={OperModal('Operator_Form_Modal')}><FaPlus /></button> */}
                </div>
            </div>
            <div className="data-stats-slider-outer relative rounded-md border border-stroke bg-white py-2 m-2 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="w-full overflow-x-auto table table-hover table-striped table-mobile-responsive table-mobile-sided">
                    <table className="table w-full table-xs">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-base">Username</th>
                                <th className="text-base">E-mail</th>
                                <th className="text-base">Name</th>
                                <th className="text-base">Role</th>
                                <th className="text-base">Status</th>
                                <th className="text-base">Last login</th>
                                <th className="text-base">Last Update</th>
                                <th className="text-base"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers
                                .map((us, index) => (
                                    <tr key={index}
                                        className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                                    >
                                        <td></td>
                                        <td>{us.USER_USERNAME}</td>
                                        <td>{us.USER_EMAIL}</td>
                                        <td>{us.USER_FIRSTNAME} {us.USER_LASTNAME}</td>
                                        <td>{us.USER_ROLE}</td>
                                        <td className={`font-bold ${us.USER_STATUS === 'ACTIVE' ? 'text-green-700' : us.USER_STATUS === 'SUSPENDED' ? 'text-red-500' : us.USER_STATUS === 'LOCKED' ? 'text-gray-500' : ''}`}>{us.USER_STATUS}</td>
                                        <td>{format(us.USER_LASTLOGIN, 'dd-MMM-yyyy')}</td>
                                        <td>{format(us.USER_UPDATEDAT, 'dd-MMM-yyyy')}</td>
                                        {/* <td>
                                            <button type="button" className="btn btn-accent btn-xs m-1" onClick={() => ResetUserPassword(us.USER_USERNAME, "*LC!T฿5&c3")}>
                                                Reset password
                                            </button>
                                            <button type="button" className="btn btn-success btn-xs m-1">View data</button>
                                            {us.USER_STATUS === "ACTIVE" ? (
                                                <button type="button" className="btn btn-error btn-xs m-1" onClick={() => ChangeUserStatus(us.USER_USERNAME, "SUSPENDED")}>
                                                    Suspend
                                                </button>
                                            ) : (
                                                <button type="button" className="btn btn-success btn-xs m-1" onClick={() => ChangeUserStatus(us.USER_USERNAME, "ACTIVE")}>
                                                    Active / Unlock
                                                </button>
                                            )}
                                        </td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center my-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 mx-1 border-t border-b text-blue-500">Page {currentPage}</span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={indexOfLastOperator >= filteredUsers.length}
                            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserTable