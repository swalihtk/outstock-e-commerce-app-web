import axios from 'axios';
import swal from 'sweetalert';
import { listAllAddress } from '../../redux/user/addressReducer';

const helpers={
    addressAdd:async function(body, dispatch, setAddForm, resetForm, setSubmitErr){
        try{
            let response=await axios.post("user/account/address/add", body);  
            if(response.status===201){
                dispatch(listAllAddress(body.userId));
                setAddForm(false);
                resetForm();
            }      
        }catch(err){
            setSubmitErr("Sorry!! something went wrong!")
        }
    },

    getUserDetails:async function(userId, setUserDetails){
        try{
            let response=await axios.get("/user/account/details/"+userId);
            setUserDetails(response.data);
        }catch(e){
            return;
        }
    },

    updateUserDetails:async function(userId, firstname, lastname, username, email, setLoading, setErr, getUserDetails){
        try{
            let body={
                firstName:firstname,
                lastName:lastname,
                username:username,
                email:email
            }
            setLoading(true);
            let response=await axios.put("/user/account/changeDetails/"+userId, body);
            setLoading(false);
           
            if(response.status===201){
                swal("User updated successfully!!", "ok", "success");
                getUserDetails();
                setErr("");
            }else{
                setErr(response.data.error);
            }
        }catch(e){
            setLoading(false);
            return;
        }
    },

    changeUserPassword:async function(userId, verifyPassword, newPassword, setErr, setLoading){
        try{
            setLoading(true);
            let body={
                verifyPassword:verifyPassword,
                newPassword:newPassword
            }
            let response=await axios.put("/user/account/changePassword/"+userId, body);
            setLoading(false);
            if(response.status===201){
                swal("Password updated succesfully!!", "ok", "success");
            }else{
                setErr(response.data.err)
            }
        }catch(e){
            console.log(e);
            return;
        }
    },

    updateProfilePhoto:async function(userId, image, setLoading, setErr, setShowSaveImage){
        try{
            setLoading(true);
            let body={
                image
            }
            let response=await axios.put(`/user/account/changeProfileImage/${userId}`, body);
            setLoading(false);
            if(response.status===201){
                swal("Profile updated succesfully!!", "ok", "success");
                setShowSaveImage(false);
            }else{
                setErr(response.data);
            }
        }catch(e){
            setLoading(false);
        }
    }
}


export default helpers;