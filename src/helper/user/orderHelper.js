import axios from "axios";
import swal from "sweetalert";

const helpers = {
  getUserOrders: async function (userId, setOrders) {
    try {
      let result = await axios.get("/user/order/listUserOrders/" + userId);
      if (result.status === 200) {
        setOrders(result.data);
      }
    } catch (e) {
      return;
    }
  },

  getUserOrderDetails: async function (userId, orderId, setProductDetails) {
    try {
      let response = await axios.get(
        `/user/order/getProductDetails/${userId}/${orderId}`
      );
      if (response.status === 200) {
        setProductDetails(response.data);
      }
    } catch (e) {
      return;
    }
  },

  cancelOrder: async function (userId, orderId, getAddressAgain) {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async(willDelete) => {
        if (willDelete) {
          let resposne = await axios.post("/user/order/changeStatus/", {
            userId,
            orderId,
            status:"CANCELED"
          });

          if(resposne.status===200 || resposne.status===201){
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              getAddressAgain();
          }else{
            swal("Something went wrong", "ok", "error");
          }
        } else {
          return;
        }
      });
    } catch (e) {
        return;
    }
  },
};

export default helpers;
