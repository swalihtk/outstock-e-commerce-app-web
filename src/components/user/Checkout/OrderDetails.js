import { Button, Modal, Placeholder, Spinner } from "react-bootstrap";
import React, { useEffect, useState, ReactDOM } from "react";
import checkoutHelper from "../../../actions/user/checkoutHelper";
import couponActions from "../../../actions/user/couponAction";
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";

// table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";


function OrderDetails({setPaymentState,handlePayment,paymentState,addressState, setProductInfo, setTotalPrice,totalPrice, productDetails}) {
  // redux
  let cartItems = useSelector((state) => state.cart);
  let { userId } = useSelector((state) => state.userLogin);

  // order stats
  let [products, setProducts] = useState([]);
 
  // payment confirmation
  let [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const handleClose = () => setShowOrderConfirm(false);

  let [formErr, setFormErr]=useState("");

  const handleShow = () => {
    if(Object.keys(addressState).length === 0){
      setFormErr("Please specify address!!")
      setShowOrderConfirm(true);
      return;
    }

    if(!paymentState){
      setFormErr("Please specify payment option!!");
      setShowOrderConfirm(true);
      return;
    }

    setFormErr("")
    setShowOrderConfirm(true);
  };

  // component mounts
  useEffect(() => {
    if (!cartItems.products) return;
    setProducts(cartItems.products);
  }, [cartItems]);
  
  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      let productInfo = item.productInfo;
      if(productInfo.offer){
        setTotalPrice(Math.round((total += item.products.quantity * productInfo.offer.offerPrice)));
      }else{
        setTotalPrice(Math.round((total += item.products.quantity * productInfo.price)));
      }
    });
  }, [products]);

  

  useEffect(()=>{
    products.forEach((item, index) => {
      let productInfo = item.productInfo;
      let product = item.products;


      // setProductInfo((prev)=>{
        
      //   let indexof=prev.findIndex(item=>item.productId===product.productId);
      //   if(indexof!==-1){
      //     return;
      //   }

      //   return [
      //     ...prev,
      //     {
      //       productId:product.productId,
      //       quantity:product.quantity,
      //       totalPrice:productInfo.offer?product.quantity*productInfo.offer.offerPrice:product.quantity*productInfo.price
      //     }
      //   ]
      // }
      // )

      let indexof=productDetails.findIndex(item=>item.productId===product.productId);
      if(indexof!==-1) return;
      setProductInfo([...productDetails,{
        productId:product.productId,
        quantity:product.quantity,
        totalPrice:productInfo.offer?product.quantity*productInfo.offer.offerPrice:product.quantity*productInfo.price
      }])
    })
  }, [products])


  

  // ********* paypal *************
  let [paypalSdkReady, setPaypalSdkReady]=useState(false);
  useEffect(() => {
    const getPayapalId=async ()=>{
      let {data:paypalId}=await axios.get("/user/order/paypal/config");
      let script=window.document.createElement("script");
      script.type="text/javascript";
      script.src=`https://www.paypal.com/sdk/js?client-id=${paypalId}`;
      script.async=true;
      script.onload=()=>{
        setPaypalSdkReady(true);
      }
      window.document.body.appendChild(script);
    }
    
    if(!window.paypal){
      getPayapalId();
    }else{
      setPaypalSdkReady(true);
    }

  }, [])

  function handlePaypalSuccess(){
    setPaymentState("PAYPAL")
    handlePayment("PAYPAL");
  }

  // ******* Coupon Handler *******
  let [couponCode, setCouponCode]=useState("");
  let [applyCouponTrue, setApplyCouponTrue]=useState(false);
  let [couponApplying, setCouponApplying]=useState(false);
  let [couponErr, setCouponErr]=useState("");

  function setUpApplyCouponTrue(){
    setCouponCode("");
    setApplyCouponTrue(true);
  }

  function applyCouponHandler(){
    if(!couponCode) return;

    let body={
      userId:userId,
      couponCode:couponCode,
      totalPrice:totalPrice
    }
    couponActions.applyCoupon(setCouponApplying, setCouponErr, body, setTotalPrice);
  }
  
  return (
    <>
      {/* Modal */}

      <Modal show={showOrderConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
         {
              formErr?<p className="text-center text-danger">{formErr}</p>
              :
              <Modal.Title>Do you want to confirm order?</Modal.Title>
            }
        </Modal.Header>
       <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            !formErr&&
            <Button variant="primary" onClick={()=>handlePayment(paymentState)}>
              Confirm
            </Button>
          } 
        </Modal.Footer>
      </Modal>
      <div className="orderDetails__main">
        <div className="orderDetails__coupon text-center mt-4">
          {
            applyCouponTrue?
            <>
            <div className="applyCoupon__main">
            <input type="text" value={couponCode} onChange={e=>setCouponCode(e.target.value)} />
            
            {
              couponApplying?
              <Spinner animation="border" style={{marginRight:"1rem", fontSize:"1rem"}} variant="primary" />
              :
              <Button className="btn-primary" onClick={applyCouponHandler}>Apply</Button>}
            </div>
            {
              couponErr&&<p className="text-center text-danger">{couponErr}</p>
            }
            </>
            :
            <Button className="btn-light" onClick={setUpApplyCouponTrue}>
            <strong>Have a coupon? </strong>Click here to enter the coupon
          </Button>
          }
        </div>
        <div className="orderDetails__body">
          <h1>Your Order</h1>
          <hr />
          <div className="orderDetails__bodyTable">

            {
            cartItems.loading?
            (
              <div>
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </div>
            )
            :
            (<TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p style={{fontSize:"14px"}}><strong>Product</strong></p>
                    </TableCell>
                    <TableCell align="center">
                    <p style={{fontSize:"14px"}}><strong>Quantity</strong></p>
                    </TableCell>
                    <TableCell align="center">
                    <p style={{fontSize:"14px"}}><strong>Price</strong></p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((item, index) => {
                      let productInfo = item.productInfo;
                      let product = item.products
                      let totalPrice=productInfo.offer?product.quantity*productInfo.offer.offerPrice:product.quantity*productInfo.price;
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                          <p style={{fontSize:"14px"}}>{productInfo.name?.length>40?
                          productInfo.name.substr(0,40)+"..."
                          :
                          productInfo.name
                        }</p>
                          </TableCell>
                          <TableCell align="center">
                          <p style={{fontSize:"14px"}}>{product.quantity}</p>
                          </TableCell>
                          <TableCell align="center">
                          <p style={{fontSize:"14px"}}>₹{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Nothing found
                      </TableCell>
                      <TableCell align="center">--</TableCell>
                      <TableCell align="center">----</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>)}

            {
            cartItems.loading?
              (
                <div style={{marginTop:"5rem"}}>
                  <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                  </Placeholder>
                </div>
              )
            :
            (<div className="orderDetails__total">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      <p style={{fontSize:"14px"}}><strong>Total Amount</strong></p>
                      </TableCell>
                      <TableCell align="center">
                      <p style={{fontSize:"14px"}}><strong>₹{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>)}
          </div>
        </div>
        <div className="order__payment">
          <div className="order__paymentMethod">
            <input
              type="radio"
              name="payment"
              value={"COD"}
              onClick={(e) => setPaymentState(e.target.value)}
            />
            <p>CASH ON DELIVERY</p>
          </div>
          <div className="order__paymentMethod">
            <input
              type="radio"
              name="payment"
              value={"RAZORPAY"}
              onClick={(e) => setPaymentState(e.target.value)}
            />
            <p>RAZORPAY</p>
            <br />
          </div>
          <div className="order__paymentMethod">
                    {/* Payapl */}
                    {
                      paypalSdkReady&&Object.keys(addressState).length !== 0&&
                      <PayPalButton
                      amount={totalPrice}
                      onSuccess={handlePaypalSuccess}
                      />
                    }
          </div>
        </div>
        <div className="order__btn">
          <button onClick={handleShow}>PLACE ORDER</button>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
