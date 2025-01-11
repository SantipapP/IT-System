const DeviceForm = () => {
    return (
        <>
            <div className="data-stats-slider-outer relative rounded-lg border border-stroke bg-white py-6 px-4 m-4 shadow-lg dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    {/* Device Code */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="deviceCode" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Code</label>
                        <input id="deviceCode" type="text" placeholder="Enter device code" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Serial Number */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="serialNumber" className="font-bold text-lg text-gray-700 dark:text-gray-200">Serial Number</label>
                        <input id="serialNumber" type="text" placeholder="Enter serial number" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Device Name */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="deviceName" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Name</label>
                        <input id="deviceName" type="text" placeholder="Enter device name" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Category */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="category" className="font-bold text-lg text-gray-700 dark:text-gray-200">Category</label>
                        <select id="category" className="select select-bordered select-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Please select</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    {/* Device Brand */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="brand" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Brand</label>
                        <select id="brand" className="select select-bordered select-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Please select</option>
                        </select>
                    </div>
                    {/* Device Model */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="model" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Model</label>
                        <input id="model" type="text" placeholder="Enter device model" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Device Asset Tag */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="assetTag" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Asset Tag</label>
                        <input id="assetTag" type="text" placeholder="Enter asset tag" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Device Purchase Date */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="purchaseDate" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Purchase Date</label>
                        <input id="purchaseDate" type="datetime-local" placeholder="Enter purchase date" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Device Warranty End */}
                    <div className="flex flex-col w-full lg:w-1/4 p-2">
                        <label htmlFor="warrantyEnd" className="font-bold text-lg text-gray-700 dark:text-gray-200">Device Warranty End</label>
                        <input id="warrantyEnd" type="date" placeholder="Enter warranty end date" className="input input-bordered input-md w-full max-w-sm py-2 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button className="btn btn-primary px-6 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
                    <button className="btn btn-secondary px-6 py-2 text-white bg-gray-500 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">Reset</button>
                </div>
            </div>

        </>
    )
}
export default DeviceForm