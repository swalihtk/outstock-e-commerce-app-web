import axios from 'axios';
import swal from 'sweetalert';

const helpers={
    getMainCategorys:async function(setCategoryLoading, setMainCategory, setMainCatValue){
        try{
            setCategoryLoading(true);
            let response=await axios.get("/admin/category/get");
            setCategoryLoading(false);
            let data=response.data;
            setMainCategory(data);
            setMainCatValue(data[0].categoryName)
        }catch(e){
            setCategoryLoading(false);
            return;
        }
    },

    getSubCategory:async function(setSubCategoryLoading, mainCatValue, setSubCategory, setSubCatValue){
        try{
            setSubCategoryLoading(true);
            let response=await axios.get(`/admin/category/getSub/${mainCatValue}`);

            setSubCategoryLoading(false);
            setSubCategory(response.data);
            setSubCatValue(response.data[0]);
        }catch(e){
            return;
        }
    },

    createNewProduct:async function(body, setLoading, setShowForm){
        try{
            setLoading(true);
            let response=await axios.post("/admin/product/add", body)

            if(response.status===201 || response.status===200){
                swal({title: "Success",text: "Product Uploaded!",icon: "success",button: "Ok!"});
                setShowForm(false);
            }
        }catch(e){
            console.log(e);
            setLoading(false);
            return;
        }
    },

    getEditProductDetails:async function(productId, setProudctDetails){
        try{
            let response=await axios.get("/admin/product/listOne/"+productId);
            setProudctDetails(response.data);
        }catch(e){
            console.log(e);
            return;
        }
    }, 

    editProductDetails:async function(productId, body, setUpdateLoading, setShowForm){
        try{
            setUpdateLoading(true);
            let response=await axios.put("/admin/product/update/" + productId, body);
            if(response.status===200 || response.status===201){
                setUpdateLoading(false);
                swal({title: "Success",text: "Product Updated!",icon: "success",button: "Ok!"});
                setShowForm(false);
            }else{
                setUpdateLoading(false);
            }
        }catch(e){
            console.log(e);
            setUpdateLoading(false);
            return;
        }
    }
}

export default helpers