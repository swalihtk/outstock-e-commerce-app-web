import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import bannerHelper from '../../../helper/admin/bannerHelper';

function BannerAddForm({setAddFormShow}) {

  // form handler state
  let [bannerImage, setBannerImage] = useState("");
  let [bannerImgPrv, setBannerImgPrv] = useState("");
  let [title, setTitle] = useState("");
  let [link, setLink] = useState("");
  let [loading, setLoading]=useState(false);
  let [formErr, setFormErr]=useState("");

  // action
  function imageChangeHandler(e) {
    setBannerImage(e.target.files[0]);
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    setBannerImgPrv(imgUrl);
  }

  function createNewBanner(e){
    e.preventDefault();

    // validation
    if(!title || !link || !bannerImage){
      setFormErr("Please fill all fields!!");
      return;
    }

    setFormErr("");
    // form data
    let formSubmitData=new FormData();
    formSubmitData.append("image", bannerImage);
    formSubmitData.append("title", title);
    formSubmitData.append("url", link);

    bannerHelper.createNewBanner(formSubmitData, setLoading, setAddFormShow);
  }

  return (
    <div className="bannerAddForm__main container">
      <Form onSubmit={createNewBanner}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Banner Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title.."
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Banner Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="link..."
            onChange={(e) => setLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Banner Image</Form.Label>
          <Form.Control type="file" onChange={imageChangeHandler} />
        </Form.Group>

        <div className="bannerAdd__img">
          <img
            src={
              bannerImgPrv
                ? bannerImgPrv
                : "https://louisville.edu/history/images/noimage.jpg/image"
            }
            alt=""
          />
        </div>
        {formErr&&<p className="text-center text-danger">{formErr}</p>}
        <Button variant="primary" type="submit" className="mt-4">
          {loading?<Spinner animation="border" variant="light"/>:"Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default BannerAddForm;
