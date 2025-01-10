import Sidebar from "../components/Sidebar"
import UserTable from "../components/User/UserTable"
const User = () => {
    return (
        <>
            <Sidebar />
            <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
                <UserTable />
            </div>
        </>
    )
}
export default User