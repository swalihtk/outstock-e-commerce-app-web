import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import whishlistActions from "../../../actions/user/whishlistController";
import { Spinner } from "react-bootstrap";

function Index() {
  // states
  let [whishlistItems, setWhishListItems] = useState([]);
  let [whishListLoading, setWhishListLoading] = useState(false);
  let { userId } = useSelector((state) => state.userLogin);
  let [whishlIistErr, setWhishListErr] = useState("");
  useEffect(() => {
    listAllItemsInWhishlist();
  }, []);

  function listAllItemsInWhishlist(){
    whishlistActions.listWhishlistItems(
        setWhishListLoading,
        setWhishListItems,
        setWhishListErr,
        userId
      );
  }


  let [deleting, setDeleting]=useState(false);

  function deleteItemFromWhishlist(productId){
      whishlistActions.deleteFromWhishlist(setDeleting, userId, productId, listAllItemsInWhishlist);
  }

  return (
    <>
      <div className="whishlist container">
        <h1>My Whislist</h1>
        <hr />
        <div className="whishlist__product__container">
          {/* Product Card */}
          {whishlistItems.length > 0 ? (
            whishlistItems.map((items, index) => {

                let productName=items.name.length>25?items.name.substr(0, 25)+"...":items.name;
                // console.log(items._id);
              return (
                <div className="whislist__product" key={items._id}>
                  <div className="whishlist__img">
                    <img
                      src={
                          items.productImages[0].img
                      }
                      alt=""
                    />
                  </div>
                  <div className="whishlist__product__details">
                    <h1>{productName}</h1>
                    <p>₹{items.price}</p>
                  </div>
                  <div className="whilist__dlt_btn" onClick={()=>deleteItemFromWhishlist(items._id)} id="deleteBtn">
                <img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0xLjUuNWgxNXYxNWgtMTV6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iI0MyQzJDMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSAxMy44MzNjMCAuOTE3Ljc1IDEuNjY3IDEuNjY3IDEuNjY3aDYuNjY2Yy45MTcgMCAxLjY2Ny0uNzUgMS42NjctMS42Njd2LTEwSDF2MTB6bTEwLjgzMy0xMi41SDguOTE3TDguMDgzLjVIMy45MTdsLS44MzQuODMzSC4xNjdWM2gxMS42NjZWMS4zMzN6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="
                      alt=""
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No items found</h1>
          )}
          {/* End of Product Card */}
        </div>
      </div>
    </>
  );
}

export default Index;
