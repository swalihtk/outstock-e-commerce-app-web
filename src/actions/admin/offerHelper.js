import axios from 'axios'
import swal from "sweetalert";
import {getAllOffers} from "../../redux/admin/offerReducer";
import { showAllProductAdmin } from '../../redux/admin/showAllProduct';

const helpers={
    createOffer:async function(body, setShow, dispatch){
        try{
            let response=await axios.post("/admin/offers/create", body);
            if(response.status===201){
                setShow(false);
                swal("Offer created!!", "ok", "success");
                dispatch(getAllOffers())
            }else{
                return;
            }
        }catch(e){
            return;
        }
    },
    deleteOffer:async function(offerId, dispatch){
        try{
            let response=await axios.delete(`/admin/offers/delete/${offerId}`);
            if(response.status===200){
                swal("Deleted", "Ok", "success");
                dispatch(getAllOffers())
            }else{
                return;
            }
        }catch(e){
            return;
        }
    },

    editDetailsGet:async function(offerId, setOfferDetails){
        try{
            let response=await axios.get(`/admin/offers/getOne/${offerId}`);
            if(response.status===200){
                setOfferDetails(response.data);
            }else{
                return;
            }
        }catch(e){
            return;
        }
    },

    updateDetails:async function(offerId, body, dispatch, setShowForm){
        try{
            let response=await axios.put(`/admin/offers/edit/${offerId}`, body);
            if(response.status===200){
                swal("Updated!", "Ok", "success");
                dispatch(getAllOffers());
                setShowForm(false);
            }else{
                return;
            }
        }catch(e){
            return;
        }
    },

    // Offer apply
    applyOfferForProducts:async function(productId, offerId, offerName, percentage, expires, dispatch, showForm){
        try{
            let response=await axios.post("/admin/offers/applyOffer", {
                productId,
                offerId,
                offerName,
                percentage,
                expires
            })

            if(response.status===201){
                swal("Offer Applyed!!", "ok", "success");
                showForm(false);
                dispatch(showAllProductAdmin(1, "", "", -1));
            }else{
                return;
            }
        }catch(e){
            return;
        }
    }
}

export default helpers;
