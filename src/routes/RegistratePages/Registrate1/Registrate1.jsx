import React, { useState } from "react";
import "./Registrate1.scss";
import RegisterObjForm from "../components/RegisterObjForm";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import MyButton from "../../../components/MyButton/MyButton";
import http from "../../../axios";
import { useNavigate } from "react-router";
import axios from "axios";
const id = localStorage.getItem('id')

function Registrate1() {
  const [data, setData] = useState({
    nameOtel: "",
    address: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    street: "",
  });
  const [button , setButton] = useState(false)
  const [addres , setAdres] = useState('')
  const navigate = useNavigate()
 
  const sendToMainInfo =(e)=>{
    e.preventDefault()
    http.post("/partner/hotels/create/" , {   
      partner: id-0,
    title:data.nameOtel,
  website: data.address,
  contact_info: data.contact,
  email: data.email,
  country: data.state,
  city: data.city,
  address: data.street,
  location:`${placemarkGeometry[0]};${placemarkGeometry[1]}`,

    }).then((res) =>{
      console.log(res.data)
      if(res.status === 201){
        navigate(`/register-single/${res.data.id}`)
      }
    }).catch((err) =>{
      console.log(err)
    })
  }
  const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };
  
  const [placemarkGeometry, setPlacemarkGeometry] = useState([55.751574, 37.573856]); // Начальное значение - нет метки
  const [state , setState] = useState('')
  const handleMapClick = (event) => {
    const clickedCoordinates = event.get("coords");

    setPlacemarkGeometry(clickedCoordinates); // Устанавливаем координаты для новой метки
    console.log(clickedCoordinates);
  };
  const handleButton1 =()=>{
    setButton(true)
    axios.get( `https://geocode-maps.yandex.ru/1.x/?apikey=a1790995-bbe5-41eb-8c22-35713a9dbbb8&format=json&geocode=${placemarkGeometry[0]},${placemarkGeometry[1]}`).then((res)=>{
      setAdres(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted)
  }).catch((err)=>{
    console.log(err)
  })
  }
  return (
    <form  className="registr">
      <div className="raw">
        <RegisterObjForm data={data} setData={setData} />
        <div className="map_component">
      <YMaps width="100%" height="100%">
        <Map
          state={mapState}
          width="100%"
          height="100%"
          onClick={handleMapClick}
        >
          {placemarkGeometry && <Placemark geometry={placemarkGeometry} />}
        </Map>
      </YMaps>
    </div>
      </div>
      <div className="bottom-form">
        <div className="registr__button">
          {
           button ? 
           <div className="bottom-form" >
             <div className="name__location">
             {addres}
            </div>
            <div className="registr__button">
            <MyButton onClick={(e)=>sendToMainInfo(e)}>Далее </MyButton>
           </div>
           </div>:   <MyButton onClick={handleButton1} type="submit">Подтвердить адрес на карте</MyButton>
          }
        </div>
      </div>
    </form>
  );
}

export default Registrate1;
