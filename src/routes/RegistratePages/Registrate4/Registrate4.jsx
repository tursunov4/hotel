import React, { useState } from "react";
import '../components/MyFileInput/MyFileInput.scss'
import "./Registrate4.scss";
import MyButton from "../../../components/MyButton/MyButton";
import Modal from "../../../components/Modal/Modal";
import { useNavigate, useParams } from "react-router";
import http from "../../../axios";
function Registrate4() {
  const [active , setActive] = useState(false)
  const { id } = useParams()
  const [imagearr , setImageArr] = useState([])
  const [information , setInformation] = useState('')
  const [des , setDes] = useState('')
  const [image , setImage] = useState('')
  const navigate = useNavigate()
  if(image){
    const form = new FormData()
    form.append('image' , image)
    http.post('/partner/hotel/images/' , form).then(res=>{
      setImage('')
      if(res.status === 201){
        setImageArr([...imagearr , res.data.id])
      }
    })
  } 
  const submitRegister =(e)=>{
    e.preventDefault()
    http.post('/partner/hotel/additional_info/create/' , {
      hotel: id-0,
      description: des,
      how_to_get: information,
      image: imagearr        
    }).then((res)=>{
      if(res.status===201){
        setActive(true)
        setTimeout(() => {
          setActive(false)
          navigate('/object-manage')
        }, 1500)
      }
    })
  }

  return (
    <div className="registr-4">
      <Modal
        isActive={active}
        text={
          "Вы успешно зарегистриро вализарегистрировализ арегистрировали зарегистрировали объект"
        }
      />
      <div className="registr-4__title">Дополнительная информация</div>
      <div className="registr-4__row">
        <div className="registr-4__left">
          <textarea
            onChange={(e)=>setInformation(e.target.value)}
            required
            placeholder="Добавьте описание объекта размещения"
            className="registr-4__text"
          ></textarea>
          <textarea
            onChange={(e)=>setDes(e.target.value)}
            required
            placeholder="Расскажите, как до вас добраться"
            className="registr-4__text"
          ></textarea>
        </div>
        <div className="file-input-wrap">
      <label className="file-input-label">
        <strong>Перетащи свои фотографии сюда или нажми на кнопку</strong>
        <span>Загрузите как минимум одну фотографию</span>
        <button className="file-input-button">{imagearr.length >0 ?  `выбраны ${imagearr.length} - файла`:"Загрузить файл"}</button>

        <input
           onChange={(e)=>setImage(e.target.files[0])}        
          type="file"       
          placeholder={imagearr.length >0 ?  `выбраны ${imagearr.length} - файла`:"Загрузить файл"}
        />
      </label>
    </div>
       
      </div>
      <div className="registr-4__btn">
        <MyButton onClick={(e)=>submitRegister(e)}>Завершить регистрацию</MyButton>
      </div>
    </div>
  );
}

export default Registrate4;
