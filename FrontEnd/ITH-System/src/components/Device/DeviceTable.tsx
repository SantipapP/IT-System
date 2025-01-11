import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
const DeviceTable = () => {

    // ฟังก์ชันจัดการเมื่อคลิกปุ่มดูรายละเอียด
    const handleViewDetails = (id: string) => {
        console.log(`Viewing details for asset: ${id}`);
    };

    // ฟังก์ชันจัดการเมื่อคลิกปุ่มแก้ไข
    const handleEdit = (id: string) => {
        console.log(`Editing asset: ${id}`);
    };

    // ฟังก์ชันจัดการเมื่อคลิกปุ่มลบ
    const handleDelete = (id: string) => {
        if (confirm(`Are you sure you want to delete asset: ${id}?`)) {
            console.log(`Deleted asset: ${id}`);
        }
    };

    return (
        <>
                <div className="flex flex-col lg:flex-row p-1 justify-between items-center mb-4 space-x-4">
                    <div className="w-full overflow-x-auto table table-hover table-striped table-mobile-responsive table-mobile-sided">
                        <table className="table w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                                <tr>
                                    <th className="py-3 px-4 text-left">Device Code</th>
                                    <th className="py-3 px-4 text-left">Serial Number</th>
                                    <th className="py-3 px-4 text-left">Category</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-center">Image</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                <tr className="text-base border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-4 px-4" data-content="Device Code">IT-NB-001</td>
                                    <td className="py-4 px-4" data-content="Serial Number">SKLDF29201</td>
                                    <td className="py-4 px-4" data-content="Category">Notebook</td>
                                    <td className="py-4 px-4 text-green-600 font-semibold" data-content="Status">ACTIVE</td>
                                    <td className="py-4 px-4" data-content="Image">
                                        <FaEye
                                            className="cursor-pointer text-blue-500 hover:text-blue-700 text-lg"
                                            onClick={() => handleViewDetails('IT-NB-001')}
                                        />
                                    </td>
                                    <td className="py-4 px-4 flex justify-center items-center gap-4" data-content="Action">
                                        <FaEdit
                                            className="cursor-pointer text-yellow-500 hover:text-yellow-700 text-lg"
                                            onClick={() => handleEdit('IT-NB-001')}
                                        />
                                        <FaTrashAlt
                                            className="cursor-pointer text-red-500 hover:text-red-700 text-lg"
                                            onClick={() => handleDelete('IT-NB-001')}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
        </>
    )
}
export default DeviceTable