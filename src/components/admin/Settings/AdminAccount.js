import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import accountHelper from '../../../actions/user/accountHelper';
import { useSelector } from 'react-redux';
import {Spinner} from 'react-bootstrap';
import ImageCroper from '../../../layouts/admin/ImageCroper';
import SaveIcon from '@material-ui/icons/Save';
import {Button, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router';

function AdminAccount() {
    
    // state 
    let [imageUpdateLoading, setImageUpdateLoading]=useState(false);

    let [imageErr, setImageErr]=useState("");

    let [previewSource, setPreviewSource]=useState("");
    let [haveImage, setHaveImage]=useState(false);
    let [showSaveImage,setShowSaveImage]=useState(false);

     // state
     let [currentPassword, setCurrentPassword]=useState("");
     let [newPassword, setNewPassword]=useState("");
     let [confirmPassword,setConfirmPassword]=useState("");
     let [formErr, setFormErr]=useState("");
     let [loading,setLoading]=useState(false);
    
    let [showPasswordChangeForm,setShowPasswordChangeForm]=useState(false);
    
    // redux
    let {adminId}=useSelector(state=>state.adminLogedin);
    let {info}=useSelector(state=>state.adminLogedin);
    
    // routes
    let navigate=useNavigate();

    // mount
    useEffect(()=>{
        if(!info.profileImage) return;
        setPreviewSource(info.profileImage);
    },[info])

    // actions form
    function handleImageOnChange(e){
        setHaveImage(true);
        if(!e.target.files) return;
        setPreviewSource(URL.createObjectURL(e.target.files[0]));
        setShowSaveImage(true);
    }
    function handleSaveProfileImage(e){
        accountHelper.updateProfilePhoto(adminId, previewSource, setImageUpdateLoading, setImageErr, setShowSaveImage);    
    }
    function handlePasswordChange(e){
        e.preventDefault();
        if(!currentPassword || !newPassword || !confirmPassword){
            setFormErr("please fill all fields!!");
            return;
        }
        if(newPassword!==confirmPassword){
            setFormErr("New Password and confirm password should be same!!");
            return;
        }

        setFormErr("");
        accountHelper.changeAdminPassword(adminId, currentPassword, newPassword, setFormErr,setLoading, navigate);
    }
   
    // test
   
    return (
        <>
        {/* Password change modal */}
        <Modal
        show={showPasswordChangeForm}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Change Password
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="passwordChange__main">
                <form onSubmit={handlePasswordChange}>
                <label>Enter current password</label><br/>
                <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} /><br/>
                <hr/>
                <label>Enter New password</label><br/>
                <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} /><br/>
                <label>Confirm new password</label><br/>
                <input type="text"  value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/><br/>
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
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>setShowPasswordChangeForm(false)}>Close</Button>
        </Modal.Footer>
        </Modal>
        {/* End of password change modal */}
        <div className="myAccount__main">
            {haveImage&&<ImageCroper imageToCrop={previewSource} setBoolean={setHaveImage} setPreview={setPreviewSource} aspectRatio={1,1}/>}
            <div className="myAccount__profilePhoto">
                <img src={previewSource?previewSource:"https://cdn-icons-png.flaticon.com/512/147/147144.png"} alt="" />
                {
                showSaveImage?
                imageUpdateLoading?
                <Spinner animation="border" variant="primary" />
                :
                <SaveIcon style={{cursor:"pointer", color:"green"}} onClick={handleSaveProfileImage}/>
                :
                <label htmlFor="profilePic" title="change profile photo"><EditIcon/></label>}
                <input type="file" id="profilePic" onChange={handleImageOnChange} style={{display:"none"}}/>
                {imageErr&&<p className="text-danger mt-1">{imageErr}</p>}
            </div>
            <div className="adminAccount__chngPassword" onClick={()=>setShowPasswordChangeForm(true)}>
                    <button>Change Password</button>
            </div>
        </div>
        </>
    )
}

export default AdminAccount
