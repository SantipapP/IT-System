import DeviceForm from "../components/Device/DeviceForm"
import DeviceTable from "../components/Device/DeviceTable"
import Sidebar from "../components/Sidebar"

const Device = () => {
    return (
        <>
            <div className="flex">
                <div className="z-20 w-64">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <DeviceForm />
                    <DeviceTable />
                </div>
            </div>

        </>
    )
}
export default Device