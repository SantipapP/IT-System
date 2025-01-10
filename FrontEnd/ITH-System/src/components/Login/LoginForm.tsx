import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../hook/API_BASE_URL";
import ChangePassModal from "./ChangePassModal";
const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
            // console.log('Logging in:', { username, password });
            const payload = {
                USER_USERNAME: username,
                USER_PASSWORD: password
            }
            // เรียก API เพื่อทำการล็อกอิน
            try {
                const loginResponse = await axios.post(`${API_BASE_URL}/User/AuthLogin`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    validateStatus: function (status) {
                        return status < 500;
                    },
                });
                console.log(loginResponse);
                if (loginResponse.status === 200) {
                    if (loginResponse.data[0].USER_CHANGEPASS === 'N') {
                        localStorage.setItem('UserData', JSON.stringify(loginResponse.data[0]));
                        await Swal.fire({
                            title: "Change password!",
                            text: "This account is either new or has had its password reset. Please set a new password to continue.",
                            icon: "warning"
                        });
                        OperModal("Change_Pass_Modal")
                    } else if (loginResponse.data[0].USER_STATUS === 'LOCKED') {
                        Swal.fire({
                            title: "Error!",
                            text: "Your account is locked.",
                            icon: "error"
                        });
                    } else if (loginResponse.data[0].USER_STATUS === 'SUSPENDED') {
                        Swal.fire({
                            title: "Error!",
                            text: "Your account is suspended.",
                            icon: "error"
                        });
                    } else {
                        await Swal.fire({
                            title: "Success!",
                            text: "You have successfully logged in.",
                            icon: "success"
                        });
                        localStorage.setItem('UserData', JSON.stringify(loginResponse.data[0]));
                        if (loginResponse.data[0].USER_ROLE === 'ADMIN') {
                            navigate('/dashboard');
                        } else {
                            navigate('/ticket');
                        }
                    }
                } else if (loginResponse.status === 404) {
                    Swal.fire({
                        title: "Error!",
                        text: "Username or password invalid.",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error('Error logging in:', error); // แสดง error ใน console
            }
        } else {
            // alert('Please enter both username and password');
            Swal.fire({
                title: "Error!",
                text: "Please enter both username and password.",
                icon: "error"
            });
        }
    };

    const OperModal = (modalId: string) => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <>
            <ChangePassModal />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800">IT-Helpdesk Login</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring focus:ring-blue-300"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-lg focus:ring focus:ring-blue-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-sm text-center text-gray-600">
                        Forgot your password?{' '}
                        <a href="#" className="text-blue-500 hover:underline">
                            Reset here
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginForm