import React, { useEffect, useState } from "react";
import "../style.css";
import ImageCroper from "../../../layouts/admin/ImageCroper";
import productHelper from "../../../actions/user/productHelper";

// material
import ImageIcon from '@material-ui/icons/Image';
import { Spinner } from "react-bootstrap";

function ProductCreate({setShowAddProduct}) {

  // form states
  let [name,setName]=useState("");
  let [price,setPrice]=useState(1);
  let [quantity,setQuantity]=useState(1);
  let [brand, setBrand]=useState("");
  let [color, setColor]=useState("black");
  let [discription,setDiscription]=useState("");

  // image states
  let [image1, setImage1]=useState(false);
  let [image2, setImage2]=useState(false);
  let [image3, setImage3]=useState(false);
  let [previewSource1, setPreviewSource1]=useState("");
  let [previewSource2, setPreviewSource2]=useState("");
  let [previewSource3, setPreviewSource3]=useState("");
  let [loadImage1, setLoadImage1]=useState("");
  let [loadImage2, setLoadImage2]=useState("");
  let [loadImage3, setLoadImage3]=useState("");

  let [imageOne,setImageOne]=useState("");
  let [imageTwo,setImageTwo]=useState("");
  let [imageThree,setImageThree]=useState("");

  // category states
  let [mainCategoryLoading, setMainCategoryLoading]=useState(false);
  let [subCategoryLoading, setSubCategoryLoading]=useState(false);
  let [mainCatValue,setMainCatValue]=useState("");
  let [subCatValue,setSubCatValue]=useState("");
  let [mainCategoryArray, setMainCategoryArray]=useState([]);
  let [subCategoryArray, setSubCategoryArray]=useState([]);

  // create states
  let [uploadLoading,setUploadLoading]=useState(false);

  // mount
  useEffect(()=>{
    productHelper.getMainCategorys(setMainCategoryLoading, setMainCategoryArray, setMainCatValue);
  },[])
  useEffect(()=>{
    productHelper.getSubCategory(setSubCategoryLoading, mainCatValue, setSubCategoryArray, setSubCatValue);
  }, [mainCatValue])

  // actions (image) (onchange)
  function handleImageOne(e){
    if(!e.target.files[0]) return;
    setImageOne(e.target.files[0]);
    setImage1(true);
    setPreviewSource1(URL.createObjectURL(e.target.files[0]));
  }
  function handleImageTwo(e){
    if(!e.target.files[0]) return;
    setImageTwo(e.target.files[0]);
    setImage2(true);
    setPreviewSource2(URL.createObjectURL(e.target.files[0]));
  }
  function handleImageThree(e){
    if(!e.target.files[0]) return;
    setImageThree(e.target.files[0]);
    setImage3(true);
    setPreviewSource3(URL.createObjectURL(e.target.files[0]));
  }

  /****** Upload Product Handler *****/
    function formUploadHandler(e) {
      e.preventDefault();

        if(!name || !price || !brand || !discription || !imageOne || !imageTwo || !imageThree) return;
        let body = {
          name: name,
          price: price,
          color: color,
          brand: brand,
          category: mainCatValue,
          subCategory: subCatValue,
          quantity: quantity,
          discription:discription,
          images:[
            previewSource1,
            previewSource2,
            previewSource3
          ]
        };
        productHelper.createNewProduct(body, setUploadLoading, setShowAddProduct);
      }

  return (
    <div>

      {/* Croper */}

      {
        image1&&<ImageCroper imageToCrop={previewSource1} haveImage={setImage1} setBoolean={setImage1} setPreview={setPreviewSource1} aspectRatio={700/500}/>
      } 
      {
        image2&&<ImageCroper imageToCrop={previewSource2} haveImage={setImage2} setBoolean={setImage2} setPreview={setPreviewSource2} aspectRatio={700/500}/>
      }
      {
        image3&&<ImageCroper imageToCrop={previewSource3} haveImage={setImage3} setBoolean={setImage3} setPreview={setPreviewSource3} aspectRatio={700/500}/>
      }

      {/* New Form */}
      <div className="productCreate__main container">
        <form onSubmit={formUploadHandler}>
        <div className="row" style={{marginTop:"-1rem"}}>
          <div className="col-6 col-md-6 product__form">
            <label>Name</label><br/>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className="col-6 col-md-6 product__form">
            <label>Price</label><br/>
            <input type="number" min={1} value={price} onChange={e=>setPrice(e.target.value)} />
          </div>
          <div className="col-4 col-md-4 product__form">
            <label>Brand</label><br/>
            <input type="text" value={brand} onChange={e=>setBrand(e.target.value)} />
          </div>
          <div className="col-4 col-md-4 product__form">
            <label>Color</label><br/>
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
          </div>
          <div className="col-4 col-md-4 product__form">
            <label>Quanity</label><br/>
            <input type="number" min="1" value={quantity} onChange={e=>setQuantity(e.target.value)} />
          </div>

          {/* Image Forms */}
          <div className="col-4 col-md-4 product__form text-center">
            <label htmlFor="image1"><ImageIcon style={{fontSize:"3rem"}}/></label><br/>
            <input type="file" id="image1" accept="image/*" value="" style={{display:"none"}} onChange={handleImageOne}/>
          </div>
          <div className="col-4 col-md-4 product__form text-center">
            <label htmlFor="image2"><ImageIcon style={{fontSize:"3rem"}}/></label><br/>
            <input type="file" id="image2" accept="image/*" value="" style={{display:"none"}} onChange={handleImageTwo}/>
          </div>
          <div className="col-4 col-md-4 product__form text-center">
            <label htmlFor="image3"><ImageIcon style={{fontSize:"3rem"}}/></label><br/>
            <input type="file" id="image3" accept="image/*" value="" style={{display:"none"}} onChange={handleImageThree}/>
          </div>

          <div className="col-4 col-md-4 product__form">
          <img src={previewSource1?previewSource1:"https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"} alt="" 
          />
          </div>
          <div className="col-4 col-md-4 product__form">
          <img src={previewSource2?previewSource2:"https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"} alt="" 
          />
          </div>
          <div className="col-4 col-md-4 product__form">
          <img src={previewSource3?previewSource3:"https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"} alt="" 
          />
          </div>

          {/* Select category */}
          <div className="col-6 col-md-6 product__form">
            <label>MainCategory</label><br/>
            <select value={mainCatValue} onChange={e=>setMainCatValue(e.target.value)}>
              {
                mainCategoryArray.map((item, index)=>{
                  return <option key={index}>{item.categoryName}</option>
                })
              }
            </select>
          </div>

          <div className="col-6 col-md-6 product__form">
            <label>SubCategory</label><br/>
            <select value={setSubCatValue} onChange={e=>setSubCatValue(e.target.value)}>
              {
                subCategoryArray.map((item, index)=>{
                  return <option key={index}>{item}</option>
                })
              }
            </select>
          </div>

          <div className="col-12 col-md-12 product__form">
            <label>Description</label><br/>
            <textarea cols="10" row="10" value={discription} onChange={e=>setDiscription(e.target.value)}/>  
          </div>

          <div className="col-6 col-6 product__form" style={{textAlign:"right"}}>
            {
              uploadLoading?
              <button style={{background:"grey"}}>CANCEL</button>
              :
              <button onClick={()=>setShowAddProduct(false)} type="button">CANCEL</button>
            }
          </div>
          <div className="col-6 col-6 product__form">
            {
              uploadLoading?
              <button style={{background:"#f0f0f0", color:"black"}} type="submit"><Spinner animation="border" size="sm" style={{marginRight:"1rem"}} variant="success" />UPLOADING</button>
              :
              <button style={{background:"blue"}} type="submit">SAVE</button>
            }
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}


export default ProductCreate;
