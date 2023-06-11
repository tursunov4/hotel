import React, { useEffect, useState } from 'react'
import './ObjectManage.scss'
import http from '../../axios'
function ObjectManage() {
  const [hotels ,setHotels] = useState([])
  useEffect(()=>{
   http.get('/partner/hotels/').then((res)=>{
    console.log(res.data)
    setHotels(res.data)
   }).catch((err)=>{
    console.log(err)
   })
  } , [])
  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            {
             hotels.map((item, index) =>(
              <tr key={index}>
                <td>{item.title}</td>
                <td className='tdd2'>{item.country} {item.city} {item.address}</td>
                <td><span className='button__active'>Активный</span></td>
                <td>5/1</td>
                <td>2</td>
                <td>0</td>
              </tr>
             ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ObjectManage