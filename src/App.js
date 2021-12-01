import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routers from "./Routers";
import "antd/dist/antd.css";
import { useEffect } from "react";

// axios
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {

  useEffect(async()=>{
    await axios.get("/admin/offers/checkOfferExpires");
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Routers />
      </div>
    </Provider>
  );
}

export default App;
