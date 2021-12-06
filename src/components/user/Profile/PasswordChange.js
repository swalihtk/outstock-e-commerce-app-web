import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import accountController from '../../../actions/user/accountHelper';
import validationHelper from "../../../utils/validationHelpers";


function PasswordChange() {

    // state
    let [currentPassword, setCurrentPassword]=useState("");
    let [newPassword, setNewPassword]=useState("");
    let [confirmPassword,setConfirmPassword]=useState("");
    let [formErr, setFormErr]=useState("");
    let [loading,setLoading]=useState(false);

    let [passwordErr, setPasswordErr]=useState("");

    // hooks
    let navigate=useNavigate();
    let {userId}=useSelector(state=>state.userLogin)

    // actions
    function handlePasswordChange(e){
        e.preventDefault();
        if(!currentPassword || !newPassword || !confirmPassword){
            return;
        }
        if(newPassword!==confirmPassword){
            setFormErr("New Password and confirm password should be same!!");
            return;
        }

        accountController.changeUserPassword(userId, currentPassword, newPassword, setFormErr,setLoading, navigate);
    }

    return (
        <div className="passwordChange__main">
            <h1>Change Password</h1>
            <form onSubmit={handlePasswordChange}>
            <label>Enter current password</label><br/>
            <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} /><br/>
            <hr/>
            <label>Enter New password</label><br/>
            <input type="password" value={newPassword} onChange={e=>{
                 validationHelper.passwordInputChangeHandler(e.target.value, setPasswordErr);
                setNewPassword(e.target.value)}} 
                onBlur={e=>{
                    validationHelper.passwordInputBlurHandler(newPassword, setPasswordErr);
                }}
                /><br/>
                {
                    passwordErr&&<><span className="text-danger">{passwordErr}</span><br/></>
                }
            <label>Confirm new password</label><br/>
            <input type="text"  value={confirmPassword} onChange={e=>{
                setConfirmPassword(e.target.value)}}/><br/>
            {
                loading?
                <Spinner variant="primary" animation="border" />
                :
                <button type="submit">Change</button>
            }
            {
                formErr&&<p className="text-center text-danger">{formErr}</p>
            }
            </form>            
        </div>
    )
}

export default PasswordChange
