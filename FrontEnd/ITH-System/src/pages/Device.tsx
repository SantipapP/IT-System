import DeviceTable from "../components/Device/DeviceTable"
import Sidebar from "../components/Sidebar"

const Device = () => {
    return (
        <>
            <Sidebar />
            <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
                <DeviceTable />
            </div>
        </>
    )
}
export default Device