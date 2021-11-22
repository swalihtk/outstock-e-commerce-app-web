import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import "../style.css";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { LinearProgress, Slider } from "@material-ui/core";
import Cropper from "react-easy-crop";

function ProductCreate() {
  /*****PARAMS********
    name,
    price,
    images,
    details,
    shortDescription,
    color,
    brand,
    category,
    subCategory,
    quantity
    *********************/

  /******** Category manage ****/
  let [categoryArray, setCategoryArray] = useState([]);
  let [subCategoryArray, setSubCategoryArray] = useState([]);

  // loading
  let [categoryLoading, setCategoryLoading] = useState(false);
  let [subCatLoading, setSubCatLoading] = useState(false);

  // select handler
  let [mainCatValue, setMainCatValue] = useState("");
  let [subCatValue, setSubCatValue] = useState("");

  // main select hanlder
  function handleMainSelect(e) {
    let value = e.target.value;
    setMainCatValue(value);
    getSubCategory(value);
  }

  // get main array
  function getMainCat() {
    setCategoryLoading(true);
    axios
      .get("/admin/category/get")
      .then((response) => {
        let data = response.data;
        setCategoryArray(data);
        getSubCategory(data[0].categoryName);
        setCategoryLoading(false);
        setMainCatValue(data[0].categoryName);
      })
      .catch((err) => {
        alert("Something went wrong!!");
        setCategoryLoading(false);
      });
  }

  // get Subcategory
  function getSubCategory(value) {
    setSubCatLoading(true);
    axios
      .get(`/admin/category/getSub/${value}`)
      .then((response) => {
        let data = response.data;
        setSubCatLoading(false);
        setSubCategoryArray(data);
        setSubCatValue(data[0]);
      })
      .catch((err) => {
        setSubCatLoading(false);
        alert("Something went wrong!!");
      });
  }

  useEffect(() => {
    getMainCat();
  }, []);

  /*********** Form Handler State ********/
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [details, setDetails] = useState("");
  let [color, setColor] = useState("black");
  let [brand, setBrand] = useState("");
  let [quanity, setQuantity] = useState("");

  // image handler
  let [image1, setImage1] = useState("");
  let [image2, setImage2] = useState("");
  let [image3, setImage3] = useState("");

  let [previewSource1, setPreviewSource1] = useState("");
  let [previewSource2, setPreviewSource2] = useState("");
  let [previewSource3, setPreviewSource3] = useState("");
  let [allImageFiles, setAllImageFiles] = useState([]);

  // form error
  let [nameErr, setNameErr] = useState("");
  let [priceErr, setPriceErr] = useState("");
  let [detailsErr, setDetailsErr] = useState("");
  let [quantityErr, setQuantityErr] = useState("");
  let [brandErr, setBrandErr] = useState("");
  let [imageErr, setImageErr] = useState("");

  /********** Handle Image *********/
  function previewImageOne(e) {
    setAllImageFiles((prev) => [...prev, e.target.files[0]]);
    setPreviewImage(e.target.files[0], setPreviewSource1);
  }

  function previewImageTwo(e) {
    setAllImageFiles((prev) => [...prev, e.target.files[0]]);
    setPreviewImage(e.target.files[0], setPreviewSource2);
  }

  function previewImageThree(e) {
    setAllImageFiles((prev) => [...prev, e.target.files[0]]);
    setPreviewImage(e.target.files[0], setPreviewSource3);
  }

  // image preview function
  function setPreviewImage(image, source) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      source(reader.result);
    };
  }

  /****** Upload Product Handler *****/
  function uploadProduct(e) {
    e.preventDefault();

    if (!name) {
      resetError();
      setNameErr("Please provide a name");
    } else if (!price) {
      resetError();
      setPriceErr("Enter the price");
    } else if (!details) {
      resetError();
      setDetailsErr("Please provide details");
    } else if (!quanity) {
      console.log("jldkj");
      resetError();
      setQuantityErr("Please provide quanity");
    } else if (!brand) {
      resetError();
      setBrandErr("Please provide brand name");
    } else if (!previewSource1 && !previewSource2 && !previewSource3) {
      resetError();
      setImageErr("You need three images to create product!");
    } else {
      resetError();

      let formData = new FormData();
      for (let file of allImageFiles) {
        formData.append("image", file);
      }

      let body = {
        name: name,
        price: price,
        details: details,
        color: color,
        brand: brand,
        category: mainCatValue,
        subCategory: subCatValue,
        quantity: quanity,
      };

      swal("Product Uploading", { buttons: false });
      axios
        .post("/admin/product/getImageLink", formData)
        .then((response) => {
          let data = response.data;
          body.productImages = data;
          axios
            .post("/admin/product/add", body)
            .then((response) => {
              swal({
                title: "Success",
                text: "Product Uploaded!",
                icon: "success",
                button: "Ok!",
              });

              window.location.reload();
            })
            .catch((err) => {
              swal({
                title: "Error",
                text: err,
                icon: "error",
                button: "Ok!",
              });
            });
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    }
  }

  function resetError() {
    setNameErr("");
    setPriceErr("");
    setQuantityErr("");
    setDetailsErr("");
    setBrandErr("");
    setImageErr("");
  }

  return (
    <div>
      <h5 className="text-center">--</h5>
      <h3 className="text-center">Create new Product</h3>

      <div className="container">
        <Form
          className="pb-4"
          onSubmit={uploadProduct}
          id="productAdd"
          encType="multipart/form-data"
        >
          <Row>
            <Col>
              <Form.Control
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameErr && <FormError err={nameErr} />}
            </Col>
            <Col>
              <Form.Control
                placeholder="Price"
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {priceErr && <FormError err={priceErr} />}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={7}>
              <Form.Control
                placeholder="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {brandErr && <FormError err={brandErr} />}
            </Col>
            <Col>
              <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
              <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                title="Choose your color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="quantity"
                type="number"
                min={1}
                value={quanity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {quantityErr && <FormError err={quantityErr} />}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Image1</Form.Label>
                <Form.Control
                  type="file"
                  onChange={previewImageOne}
                  name="image"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Image2</Form.Label>
                <Form.Control
                  type="file"
                  onChange={previewImageTwo}
                  name="image"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Image3</Form.Label>
                <Form.Control
                  type="file"
                  onChange={previewImageThree}
                  name="image"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <img
                className="product-preview_image"
                src={
                  previewSource1
                    ? previewSource1
                    : "https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"
                }
                alt=""
              />
            </Col>
            <Col>
              <img
                className="product-preview_image"
                src={
                  previewSource2
                    ? previewSource2
                    : "https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"
                }
                alt=""
              />
            </Col>
            <Col>
              <img
                className="product-preview_image"
                src={
                  previewSource3
                    ? previewSource3
                    : "https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg"
                }
                alt=""
              />
            </Col>
            {imageErr && (
              <p
                className="text-center text-danger"
                style={{
                  display: "inline",
                  marginBottom: "0",
                  marginTop: "0.4rem",
                }}
              >
                {imageErr}
              </p>
            )}
          </Row>
          <Row className="g-2 mt-4">
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Main Category"
              >
                {categoryLoading && <LinearProgress />}
                <Form.Select
                  value={mainCatValue}
                  onChange={handleMainSelect}
                  aria-label="Floating label select example"
                >
                  {categoryArray?.map((item) => {
                    return <option key={item._id}>{item.categoryName}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Sub Category"
              >
                {subCatLoading && <LinearProgress />}
                <Form.Select
                  value={subCatValue}
                  onChange={(e) => setSubCatValue(e.target.value)}
                >
                  {subCategoryArray?.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel
            controlId="floatingTextarea"
            label="short description"
            className="mb-3 mt-4"
          ></FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="details">
            <Form.Control
              as="textarea"
              placeholder="details"
              style={{ height: "100px" }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            {detailsErr && <FormError err={detailsErr} />}
          </FloatingLabel>

          <Button className="mb-4 mt-3 product-create-btn" type="submit">
            Create Product
          </Button>
        </Form>
      </div>
    </div>
  );
}

function FormError({ err }) {
  return (
    <p
      className="text-danger"
      style={{ display: "inline", marginLeft: "0.4rem" }}
    >
      {err}
    </p>
  );
}

export default ProductCreate;
