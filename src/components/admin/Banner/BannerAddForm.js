import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function BannerAddForm() {
  // form handler
  let [bannerImage, setBannerImage] = useState("");
  let [bannerImgPrv, setBannerImgPrv] = useState("");
  let [title, setTitle] = useState("");
  let [link, setLink] = useState("");

  // image handler
  function imageChangeHandler(e) {
    setBannerImage(e.target.files[0]);
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    setBannerImgPrv(imgUrl);
  }

  return (
    <div className="bannerAddForm__main container">
      <Form>
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

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BannerAddForm;
