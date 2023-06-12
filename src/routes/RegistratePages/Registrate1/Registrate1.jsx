import React, { useState } from "react";
import "./Registrate1.scss";
import RegisterObjForm from "../components/RegisterObjForm";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import MyButton from "../../../components/MyButton/MyButton";
import http from "../../../axios";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registrate1() {
  const id = localStorage.getItem('id')

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
  const notify = (text) => toast(`${text}`);
 
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
      notify( `${err.response.data.title ?`Название отеля - ${err.response.data.title}`  : ''} ${err.response.data.website ?`Название адрес сайта - ${err.response.data.website}`  : ''} ${err.response.data.contact_info ?`Контактное лицо - ${err.response.data.contact_info}`  : ''} 
       ${err.response.data.country ?` Страна - ${err.response.data.country}`  : ''}
       ${err.response.data.city ?`Город - ${err.response.data.city}`  : ''}
       ${err.response.data.address ?`Улица и номер дома - ${err.response.data.address}`  : ''}
        ` )
    })
  }
  const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };
  
  const [placemarkGeometry, setPlacemarkGeometry] = useState([55.751574, 37.573856]); // Начальное значение - нет метки

  const handleMapClick = (event) => {
    const clickedCoordinates = event.get("coords");

    setPlacemarkGeometry(clickedCoordinates); // Устанавливаем координаты для новой метки
    console.log(clickedCoordinates);
    axios.get( `https://geocode-maps.yandex.ru/1.x/?apikey=a1790995-bbe5-41eb-8c22-35713a9dbbb8&format=json&geocode=${clickedCoordinates[1]},${clickedCoordinates[0]}`).then((res)=>{
      setAdres(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted)
  }).catch((err)=>{
    console.log(err)
  })
  };
  const handleButton1 =()=>{
    setButton(true)
   
  }
  return (
    <form  className="registr">
         <ToastContainer
              autoClose={1500}              
       />
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
