import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import accountHelper from '../../../actions/user/accountHelper';
import { useSelector } from 'react-redux';
import {Spinner} from 'react-bootstrap';
import ImageCroper from '../../../layouts/admin/ImageCroper';
import SaveIcon from '@material-ui/icons/Save';

function MyAccount() {

    // state 
    let [username, setUsername]=useState("");
    let [email, setEmail]=useState("");
    let [firstName, setFirstname]=useState("");
    let [lastName, setLastname]=useState("");

    let [detailUpdateLoading, setDetailUpdateLoading]=useState(false);
    let [imageUpdateLoading, setImageUpdateLoading]=useState(false);

    let [detailErr, setDetailErr]=useState("");
    let [imageErr, setImageErr]=useState("");

    let [userDetails, setUserDetails]=useState({});

    let [isChanged, setIsChanged]=useState(0);
    let [previewSource, setPreviewSource]=useState("");
    let [haveImage, setHaveImage]=useState(false);
    let [showSaveImage,setShowSaveImage]=useState(false);

    // hooks
    let {userId}=useSelector(state=>state.userLogin);

    // mount
    useEffect(()=>{
        getUserDetails();
    },[userId])

    useEffect(()=>{
        if(!userDetails) return;
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setFirstname(userDetails.firstname);
        setLastname(userDetails.lastname);
        setPreviewSource(userDetails.profileImage)
    },[userDetails])

    // actions
    function getUserDetails(){
        accountHelper.getUserDetails(userId, setUserDetails);
    }

    // actions form
    function handleEditForm(e){
        e.preventDefault();
        setIsChanged(false);
        if(!userId) return;
        accountHelper.updateUserDetails(userId, firstName, lastName, username, email, setDetailUpdateLoading, setDetailErr, getUserDetails, setIsChanged);
    }
    function handleImageOnChange(e){
        setHaveImage(true);
        if(!e.target.files) return;
        setPreviewSource(URL.createObjectURL(e.target.files[0]));
        setShowSaveImage(true);
    }
    function handleSaveProfileImage(e){
        accountHelper.updateProfilePhoto(userId, previewSource,setImageUpdateLoading, setImageErr,setShowSaveImage);
    }
   
    // test
   
    return (
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
            <div className="myAccount__detailsForm">
                <form onSubmit={handleEditForm}>
                    <label>FirstName</label><br/>
                    <input type="text" alt="" value={firstName} onChange={(e)=>{
                        setIsChanged(true);
                        setFirstname(e.target.value);
                    }}/><br/>
                    <label>LastName</label><br/>
                    <input type="text" alt="" value={lastName} onChange={(e)=>{
                        setIsChanged(true);
                        setLastname(e.target.value);
                    }}/><br/>
                    <label>Username</label><br/>
                    <input type="text" alt="" value={username} onChange={(e)=>{
                        setIsChanged(true);
                        setUsername(e.target.value);
                    }}/><br/>
                    <label>Email</label><br/>
                    <input type="email" alt="" value={email} onChange={(e)=>{
                        setIsChanged(true);
                        setEmail(e.target.value);
                    }}/><br/>
                    {
                        isChanged&&
                        <button type="submit">UPDATE</button>
                    }
                      {detailUpdateLoading&&<Spinner animation="border" variant="danger" />}
                      {detailErr&&<p className="text-center text-danger">{detailErr}</p>}

                </form>
            </div> 
        </div>
    )
}

export default MyAccount
