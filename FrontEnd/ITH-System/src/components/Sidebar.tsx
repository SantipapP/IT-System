import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome,FaTag,FaLaptop,FaUser,FaBars   } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
const Sidebar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex">
            <div className={`fixed top-0 left-0 h-full md:w-64 bg-gray-800 transition-width duration-300 text-white
                ${isOpen ? "w-64" : "w-15"}
                `}>
                <div className="flex justify-between item-center p-4">
                    <h2 className={`text-xl fout-bold md:block ${isOpen ? "block" : "hidden"}`}>MyApp</h2>
                    <button className="block md:hidden" onClick={()=> setIsOpen(!isOpen)}>
                        {isOpen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                <nav className="mt-4">
                    <ul>
                        <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                            <FaHome size={24} />
                            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                                Home
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                            <FaTag size={24} />
                            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                                Ticker
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=> navigate("/Device")}>
                            <FaLaptop size={24} />
                            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                                Device
                            </span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer" onClick={()=> navigate("/User")}>
                            <FaUser size={24} />
                            <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                                User
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
