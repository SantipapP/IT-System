import { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../../hook/useLocalStorage';
import { API_BASE_URL } from '../../hook/API_BASE_URL';

const ChangePassModal = () => {
    const navigate = useNavigate();
    const [NewPass, setNewPass] = useState('')
    const [ConfirmNewPass, setConfirmNewPass] = useState('')
    const [StorageUsers] = useLocalStorage('UserData', []);

    const SubmitChangePass = async () => {
        const currentDate = new Date();
        const expiredDate = new Date();
        expiredDate.setDate(currentDate.getDate() + 90);
        const formattedexpiredDate = expiredDate.toLocaleDateString();

        if (NewPass == ConfirmNewPass) {
            console.log(StorageUsers);
            try {
                const ChangePasswordResponse = await axios.post(
                    `${API_BASE_URL}/User/UpdateUser`,
                    {
                        "USER_USERNAME": StorageUsers[0].USER_USERNAME,
                        "USER_PASSWORD": NewPass,
                        "USER_CHANGEPASS": "Y",
                        "USER_EXPIRED" : formattedexpiredDate
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        validateStatus: function (status) {
                            return status < 500;
                        },
                    }
                );
                if (ChangePasswordResponse.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Change password completed',
                        text: 'Page will reload',
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(() => {
                        if (StorageUsers[0].USER_ROLE === "ADMIN") {
                            navigate('/Dashboard');
                        } else {
                            navigate('/ticker');
                        }
                    });

                }
                console.log(ChangePasswordResponse.data)
            } catch (error) {
                console.error('Error changing password:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An unexpected error occurred. Please try again later.',
                });
            }
        } else {
            closeModal()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter and confirm the new password to match.',
            });
            showModal()
        }
    }

    const closeModal = () => {
        const modal = document.getElementById('Change_Pass_Modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    }
    const showModal = () => {
        const modal = document.getElementById('Change_Pass_Modal') as HTMLDialogElement;
        if (modal) {
            modal.show();
        }
    }

    return (
        <dialog id="Change_Pass_Modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Please change password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                        <input type="password" className="input input-bordered w-full" value={NewPass} onChange={(e) => setNewPass(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                        <input type="password" className="input input-bordered w-full" value={ConfirmNewPass} onChange={(e) => setConfirmNewPass(e.target.value)} required />
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="button" className="btn btn-primary m-1" onClick={SubmitChangePass}>Change</button>
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ChangePassModal;