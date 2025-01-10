import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    return (
        <>
            <Sidebar/>
            <div className="ml-15 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="">Dashboard to the right side</p>
            </div>
        </>
    );
}

export default Dashboard;
