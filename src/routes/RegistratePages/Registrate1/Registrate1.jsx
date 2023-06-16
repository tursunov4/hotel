import React, { useEffect, useState } from "react";
import "./Registrate1.scss";
import RegisterObjForm from "../components/RegisterObjForm";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import MyButton from "../../../components/MyButton/MyButton";
import http from "../../../axios";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { Context } from "../../../contex/Contex";
function Registrate1() {
  const {locations , setLocations,adress1, setAdress1} = useContext(Context)
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
  const apikey = 'a1790995-bbe5-41eb-8c22-35713a9dbbb8'
  const [button , setButton] = useState(false)
  const [addres , setAdres] = useState('')
  const [hotelid , setHotelid] = useState('')
  const navigate = useNavigate()
  const notify = (text) => toast(`${text}`);

  const sendToMainInfo =(e)=>{
    e.preventDefault()
    http.post('/partner/hotels/location/create/' , {
    hotel :hotelid-0,
    location:`${placemarkGeometry[0]};${placemarkGeometry[1]}`
    }).then((res)=>{
      if(res.status===201){
            navigate(`/register-single/${hotelid}`)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  const mapState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };
  
  const [placemarkGeometry, setPlacemarkGeometry] = useState([]); // Начальное значение - нет метки
 
  const handleMapClick = (event) => {
    const clickedCoordinates = event.get("coords");

    setPlacemarkGeometry(clickedCoordinates); // Устанавливаем координаты для новой метки
    console.log(clickedCoordinates);
    axios.get( `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&format=json&geocode=${clickedCoordinates[1]},${clickedCoordinates[0]}`).then((res)=>{
      setAdres(res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted)
  }).catch((err)=>{
    console.log(err)
  })
  };
  const handleButton1 =()=>{
    setButton(true)
    axios.get( `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&format=json&geocode=${ `${data.state}${data.city}${data.street}`}`).then((res)=>{
      setPlacemarkGeometry([res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]-0 , res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]-0])    
      setLocations([res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]-0 , res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]-0])    
      setAdres(`${data.state} ${data.city} ${data.street}`) 
     
    }).catch((err)=>{
      console.log(err)
    })
    http.post("/partner/hotels/create/" , {   
      partner: id-0,
      title:data.nameOtel,
      website:`https://${data.address}`,
      contact_info: data.contact,
      email: data.email,
      country: data.state,
      city: data.city,
      address: data.street,

    
        }).then((res) =>{
          console.log(res.data)
          if(res.status === 201){
            setHotelid(res.data.id)
            
          }
        }).catch((err) =>{
          notify( `${err.response.data.title ?`Название отеля - ${err.response.data.title}`  : ''} ${err.response.data.website ?`Название адрес сайта - ${err.response.data.website}`  : ''} ${err.response.data.contact_info ?`Контактное лицо - ${err.response.data.contact_info}`  : ''} 
           ${err.response.data.country ?` Страна - ${err.response.data.country}`  : ''}
           ${err.response.data.city ?`Город - ${err.response.data.city}`  : ''}
           ${err.response.data.address ?`Улица и номер дома - ${err.response.data.address}`  : ''}
            ` )
        })
  }
 const handleButton2=(e)=>{
  e.preventDefault()
  axios.get( `https://geocode-maps.yandex.ru/1.x/?apikey=a1790995-bbe5-41eb-8c22-35713a9dbbb8&format=json&geocode=${ `${data.state}${data.city}${data.street}`}`).then((res)=>{
    setPlacemarkGeometry([res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]-0 , res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]-0])    
    setLocations([res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]-0 , res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]-0])    
    setAdres(`${data.state} ${data.city} ${data.street}`) 
    setAdress1(`${data.state} ${data.city} ${data.street}`)
  }).catch((err)=>{
    console.log(err)
  })
  http.post("/partner/hotels/create/" , {   
    partner: id-0,
    title:data.nameOtel,
    website:`https://${data.address}`,
    contact_info: data.contact,
    email: data.email,
    country: data.state,
    city: data.city,
    address: data.street,  
      }).then((res) =>{
        console.log(res.data)
        if(res.status === 201){

          setHotelid(res.data.id)
        
          setTimeout(() => {            
            navigate(`/regiter-map/${res.data.id}`)          
          }, 300)
     
        }
      }).catch((err) =>{
        notify( `${err.response.data.title ?`Название отеля - ${err.response.data.title}`  : ''} ${err.response.data.website ?`Название адрес сайта - ${err.response.data.website}`  : ''} ${err.response.data.contact_info ?`Контактное лицо - ${err.response.data.contact_info}`  : ''} 
         ${err.response.data.country ?` Страна - ${err.response.data.country}`  : ''}
         ${err.response.data.city ?`Город - ${err.response.data.city}`  : ''}
         ${err.response.data.address ?`Улица и номер дома - ${err.response.data.address}`  : ''}
          ` )
      })
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
            <div className="registr__button1">
            <MyButton onClick={(e)=>sendToMainInfo(e)}>Далее </MyButton>
           </div>
           </div>:   <MyButton onClick={handleButton1} type="submit">Подтвердить адрес на карте</MyButton>
          }
        </div>
         

      </div>

       <MyButton className="register-button22" onClick={(e)=>handleButton2(e)} >Подтвердить адрес на карте</MyButton>
    </form>
  );
}

export default Registrate1;
