import React, { useEffect, useState } from 'react'
import './ObjectManage.scss'
import http from '../../axios'
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import close from '../../assets/icons/close.svg'
import { Tune } from '@mui/icons-material';
import MyButton from '../../components/MyButton/MyButton';
import ReactPaginate from 'react-paginate';
function ObjectManage() {
  const [hotels ,setHotels] = useState([])
  const [hotelid , setHotelid] = useState('')
  const [edits , setEdit] = useState(false)
  const [title , setTitle] = useState('')
  const [website , setWebsite] = useState('')
  const [contact_info , setContact] = useState('')
  const [country , setCountry] = useState('')
  const [city , setCity] = useState('')
  const [addres , setAdres] = useState('')
  
  useEffect(()=>{
   http.get('/partner/hotels/').then((res)=>{
    console.log(res.data)
    setHotels(res.data)
   }).catch((err)=>{
    console.log(err)
   })
  } , [])
  const editHotels =(item)=>{
   setHotelid(item.id)
   setTitle(item.title)
   setWebsite(item.website)
   setContact(item.contact_info)
   setCountry(item.country)
   setCity(item.city)
   setAdres(item.address)
   setEdit(true)
  }
  const deleteHotel=(id)=>{
   http.delete(`/partner/hotels/${id}/`).then((res)=>{
    if(res.status === 204){
      window.location.reload()
    }
   }).catch((err)=>{
    console.log(err)
   })
  }
  const closeClick =()=>{
    setEdit(false)
  }
  const submitHotelEdit =()=>{
    http.put(`/partner/hotels/${hotelid}/` ,{
      title: title,
      website: website,
      contact_info: contact_info,
      country: country,
      city: city,
      address: addres
    }).then((res)=>{
      console.log(res)
      if(res.status ===200){
        window.location.reload()
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const itemsPerPage = 6; // Number of items to display per page
const startIndex = currentPage * itemsPerPage;
const visibleItems = hotels.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div>
      {
        edits ? 
        <div className='active add-number'>
      <div className="add-number__content">
      <img width={25} onClick={closeClick}  src={close} alt="dsaf" className="add__number-icon" />
        <h2 className="add-number__title">Изменит Гостиница</h2>
        <div className="add-number__row">
          <div className="add-number__left">
            <label className="add-number__label">
              <div className="add-subtitle">Основная информация</div>
              <input 
                onChange={(e)=>setTitle(e.target.value)}  
                defaultValue={title}           
                className="add-input"
                type="text"
                placeholder="Название отеля"
              />
            </label>
            <label className="add-number__label">
              <div className="add-subtitle">Контактные данные</div>
              <input onChange={(e)=> setWebsite(e.target.value)} defaultValue={website} placeholder="Название адрес сайта" className="add-input" type="text" />
            </label>
            <label className="add-number__label">
              <div className="add-subtitle">Город</div>
              <input onChange={(e)=>setCity(e.target.value)} defaultValue={city}  placeholder="Город" className="add-input"  type="text" />
            </label>
          </div>
          <div className="add-number__right">
            <label className="add-number__label">
              <div className="add-subtitle">Контактное лицо</div>
              <input onChange={(e)=>setContact(e.target.value)} defaultValue={contact_info}  placeholder="Контактное лицо"  className="add-input"  type="text" />
            </label>
            
            <label className="add-number__label">
              <div className="add-subtitle">Страна</div>
              <input onChange={(e)=>setCountry(e.target.value)} defaultValue={country}  placeholder="Страна" className="add-input"  type="text" />
            </label>
            <label className="add-number__label">
              <div className="add-subtitle">Улица и номер дома</div>
              <input onChange={(e)=>setAdres(e.target.value)} defaultValue={addres} placeholder="Улица и номер дома" className="add-input"  type="text" />
            </label>
          </div>
        </div>
        <div >
          <MyButton onClick={submitHotelEdit} >Изменит Гостиница</MyButton>
        </div>
       
      </div>
        </div> :''
      }
      <div className="active-object">

        <ul className="object_list">
          <li>Все</li>
          <li>Активные </li>
          <li>Замороженные</li>
        </ul>
         <div className="object-nomer">
          <p>Всего объектов: <span className="nomer-2">{hotels.length}</span> </p>
         </div>
      </div>
      <div className="add__hotel">
        
      </div>
      <div className="table__wrapper">
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Адрес</th>
              <th>Статус</th>
              <th>Заезды/Отъезды</th>
              <th>Сообщения от гостей</th>
              <th>Сообщения от PetsInn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
             visibleItems.map((item, index) =>(
              <tr key={index}>
                <td>{item.title}</td>
                <td className='tdd2'>{item.country} {item.city} {item.address}</td>
                <td><span className='button__active'>Активный</span></td>
                <td>5/1</td>
                <td>2</td>
                <td>
                <div className="table__btnss">
              
                    <img  onClick={()=>editHotels(item)} src={edit} alt="edit" />
          
                    <img onClick={()=>deleteHotel(item.id)} src={trash} alt="delete" />
                  
                </div>
                </td>
              </tr>
             ))
            }
          </tbody>
        </table>
        <ReactPaginate
      className='paginate'
      pageCount={Math.ceil(hotels.length / itemsPerPage)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      activeClassName={'active'}
    />
      </div>
    </div>
  )
}

export default ObjectManage