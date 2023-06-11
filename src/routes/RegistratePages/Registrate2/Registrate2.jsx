import React, { useState } from "react";
import RegisterObjForm from "../components/RegisterObjForm";
import MapComponent from "../components/YandexMaps";
import MyButton from "../../../components/MyButton/MyButton";
import "./Registrate2.scss";
function Registrate2() {
  const [data, setData] = useState({
    nameOtel: "",
    address: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    street: "",
  });
  return (
    <div className="registr registr-2">
      <div className="raw">
        <RegisterObjForm data={data} setData={setData} />
        <MapComponent />
      </div>
      <div className="bottom-form">
        <div className="name__location">
          {`${data.state} , ${data.city} , ${data.street}`}
  
        </div>
        <div className="registr__button">
          <MyButton>Далее </MyButton>
        </div>
      </div>
    </div>
  );
}

export default Registrate2;
