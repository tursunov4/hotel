import React from 'react'
import './ObjectManage.scss'
function ObjectManage() {
  return (
    <div>
      <div className="active-object">
        <ul className="object_list">
          <li>Все</li>
          <li>Активные </li>
          <li>Замороженные</li>
        </ul>
         <div className="object-nomer">
          <p>Всего объектов: <span className="nomer-2">124</span> </p>
         </div>
      </div>
    </div>
  )
}

export default ObjectManage