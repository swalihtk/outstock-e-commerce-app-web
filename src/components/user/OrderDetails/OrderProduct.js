import React, { useEffect, useState } from "react";
import OrderStatus from "./OrderStatus";

function OrderProduct({ productInfo, orderDetails }) {
  // state
  let [products, setProducts] = useState([]);
  let [orders, setOrders]=useState({});

  // mount
  useEffect(() => {
    if (!productInfo) return;
    setProducts(productInfo);

    if(!orderDetails) return;
    setOrders(orderDetails);
  }, [productInfo]);

  return (
    <div className="orderProduct__main">
      <h1>Product Details</h1>
      <div className="orderProduct__container">
        {products.map((item, index) => {
          return (
            <div className="orderProduct__card" key={index}>
              <div className="orderProduct__img">
                <img
                  src={item.productImages[0].img}
                  alt=""
                />
              </div>
              <div className="orderProduct__details">
                <h1>{item.name}</h1>
                <p>
                  <strong>Price: </strong>₹{item.price}
                </p>
                <p>
                  <strong>Color: </strong>{item.color}
                </p>
                <p>
                  <strong>Quantity: </strong>{orders.products[index].quantity}
                </p>
              </div>
            </div>
          );
        })}

        {/* <OrderStatus /> */}
      </div>
    </div>
  );
}

export default OrderProduct;
