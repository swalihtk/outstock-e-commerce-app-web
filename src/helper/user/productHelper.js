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

    createNewProduct:async function(formData, body, setLoading, setShowForm){
        try{
            setLoading(true);
            
            let response=await axios.post("/admin/product/getImageLink", formData);
            body.productImages = response.data;
            console.log(body);
            let responseTwo=await axios.post("/admin/product/add", body)

            if(responseTwo.status===201 || responseTwo.status===200){
                swal({title: "Success",text: "Product Uploaded!",icon: "success",button: "Ok!"});
                setShowForm(false);
            }
        }catch(e){
            console.log(e);
            setLoading(false);
            return;
        }
    }
}

export default helpers