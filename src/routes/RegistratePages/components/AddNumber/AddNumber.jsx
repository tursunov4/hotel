import React, { useState } from "react";
import "./AddNumber.scss";
import Dog from "./../../../../assets/images/Dog.png";
import Cat from "./../../../../assets/images/Cat.png";
import MyButton from "../../../../components/MyButton/MyButton";
import http from "../../../../axios";
import close from '../../../../assets/icons/close.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddNumber({ setActive, isActive , setItem,item , id , edit}) {
  const [animalclass , setAnimalsClass] = useState(true)
  const [tip ,setTip] = useState(item.tip_nomer)
  const[numbers ,setNumbers] = useState(item.numbers)
  const[capacity , setCapacity] = useState(item.capacity)
  const[size ,setSize] = useState(item.size)
  const[animals, setAnimals] = useState('Кошки')
  const[base_price , setPrice] = useState(item.base_price)
  const notify = (text) => toast(`${text}`);
  const animalHandle =()=>{
    setAnimals('Кошки')
    setAnimalsClass(true)
  }
  const animalHandle2 =()=>{
    setAnimals('Собаки')
    setAnimalsClass(false)
  }
  const handleSubmit =()=>{
    http.post('/partner/hotels/rooms/create/' , {
      hotel: id-0,
      tip_nomer:tip,
      numbers: numbers-0,
      capacity: capacity-0,
      size: size-0,
      animals: animals,
      base_price: base_price-0,    
    }).then((res) =>{
      console.log(res.data)
      if(res.status === 201){
        window.location.reload()
      }
    }).catch((err)=>{
      console.log(err)
      notify( `
      ${err.response.data.tip_nomer ?`Тип номера - ${err.response.data.tip_nomer}`  : ''}
      ${err.response.data.numbers ?`Количество мест в номере - ${err.response.data.numbers}`  : ''}
      ${err.response.data.capacity ?`Количество - ${err.response.data.capacity}`  : ''}
      ${err.response.data.size ?`Размер номера (кв.м) - ${err.response.data.size}`  : ''}
      ${err.response.data.base_price ?`Базовая цена номера - ${err.response.data.base_price}`  : ''}
      
      ` )
    })
  }
 const handleEdit=()=>{
  http.put(`/partner/hotel/rooms/${item.id}/` ,{
    hotel: id-0,
    tip_nomer: tip ?tip : item.tip_nomer ,
    numbers: numbers-0 ? numbers-0: item.numbers,
    capacity: capacity-0 ? capacity-0 : item.capacity,
    size: size-0 ? size-0 : item.size,
    animals: animals,
    base_price: base_price-0 ? base_price-0 : item.base_price,
  }).then((res)=>{
    console.log(res.data)
    if(res.status === 200){
      window.location.reload()
    }
  }).catch((err)=>{
    console.log(err)
    notify( `
    ${err.response.data.tip_nomer ?`Тип номера - ${err.response.data.tip_nomer}`  : ''}
    ${err.response.data.numbers ?`Количество мест в номере - ${err.response.data.numbers}`  : ''}
    ${err.response.data.capacity ?`Количество - ${err.response.data.capacity}`  : ''}
    ${err.response.data.size ?`Размер номера (кв.м) - ${err.response.data.size}`  : ''}
    ${err.response.data.base_price ?`Базовая цена номера - ${err.response.data.base_price}`  : ''}
    
    ` )
  })
 }
 const closeClick=()=>{
   setAnimalsClass(true)
   setActive(false)
   setNumbers('')
   setTip('')
   setCapacity('')
   setPrice('')
   setSize('')
   setItem({})
 }
  return (
    <div className={isActive ? "active add-number" : "add-number"}>
        <ToastContainer
              autoClose={1500}              
       />
      <div className="add-number__content">
      <img width={25} onClick={closeClick}  src={close} alt="dsaf" className="add__number-icon" />
        <h2 className="add-number__title">Добавление номера</h2>
        <div className="add-number__row">
          <div className="add-number__left">
            <label className="add-number__label">
              <div className="add-subtitle">Тип номера</div>
              <input
                defaultValue={item.tip_nomer}
                onChange={(e)=>setTip(e.target.value)}
                className="add-input"
                type="text"
              />
            </label>
            <label className="add-number__label">
              <div className="add-subtitle">Количество мест в номере</div>
              <input defaultValue={item.numbers}  onChange={((e) =>setNumbers(e.target.value))} className="add-input" type="text" />
            </label>
          </div>
          <div className="add-number__right">
            <label className="add-number__label">
              <div className="add-subtitle">Количество</div>
              <input defaultValue={item.capacity} onChange={(e)=>setCapacity(e.target.value)} className="add-input"  type="text" />
            </label>
            <label className="add-number__label">
              <div className="add-subtitle">Размер номера (кв.м)</div>
              <input defaultValue={item.size} onChange={(e) =>setSize(e.target.value)} className="add-input"  type="text" />
            </label>
          </div>
        </div>
        <h4 className="add-subtitle">Кто может разместиться в номерем</h4>
        <div className="pets">
          <div onClick={animalHandle} className={ animalclass ? `cat pet` : `cat`}>
            <img className="pat" src={Cat} alt="cat" />
            <span>Кошки</span>
          </div>
          <div onClick={animalHandle2}  className={ animalclass ? `dog` : `dog pet`}>
            <img src={Dog} alt="dog" />
            <span>Собаки</span>
          </div>
        </div>
        <div className="price">
          <h4 className="add-subtitle">Базовая цена номера (один гость)</h4>
          <div className="price__row">
            <input defaultValue={item.base_price} onChange={(e)=>setPrice(e.target.value)}  className="add-input" type="text" />
            {
              edit ? 
              <MyButton onClick={handleEdit} className="price-btn">редактировать</MyButton>:
              <MyButton onClick={handleSubmit} className="price-btn">Добавить</MyButton>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNumber;
