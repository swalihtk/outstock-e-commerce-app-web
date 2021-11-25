import axios from 'axios';
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
    }
}


export default helpers;