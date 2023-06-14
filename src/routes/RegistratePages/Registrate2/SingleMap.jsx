import React from "react"
import { useState } from "react"
import './Registrate2.scss'
import axios from "axios"
import { YMaps , Map  , Placemark} from "@pbe/react-yandex-maps"
import { useContext } from "react"
import { Context } from "../../../contex/Contex"
import MyButton from "../../../components/MyButton/MyButton"
import http from "../../../axios"
import { useNavigate, useParams } from "react-router"

const SingleMap = ()=>{
  const {id} = useParams()
  const navigate = useNavigate()
  const {locations , setLocations , adress1, setAdress1} = useContext(Context)
  const [placemarkGeometry, setPlacemarkGeometry] = useState([...locations])
  const [addres , setAdres] = useState(adress1)
  const mapState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };
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
  const handleclickMap=()=>{
  
    http.post('/partner/hotels/location/create/' , {
    hotel :id-0,
    location:`${placemarkGeometry[0]};${placemarkGeometry[1]}`
    }).then((res)=>{
      if(res.status===201){
            navigate(`/register-single/${id}`)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  return(
    <div className="singlemap">
             <div className="map_component2">
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
         <div className="addres-map__form">
          <div className="addres__map-text">
             {addres}
          </div>
          <div className="btn-map">
            <MyButton onClick={handleclickMap}>Далее</MyButton>
          </div>
         </div>
        </div>
    </div>
  )
}
export default SingleMap