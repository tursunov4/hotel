import React, { useEffect, useState } from "react";
import edit from "./../../../assets/icons/edit.svg";
import trash from "./../../../assets/icons/trash.svg";
import "./Registrate3.scss";
import MyButton from "../../../components/MyButton/MyButton";
import AddNumber from "../components/AddNumber/AddNumber";
import { useNavigate, useParams } from "react-router";
import Modal from "../../../components/Modal/Modal";
import ReactPaginate from 'react-paginate';
import http from "../../../axios";
function Registrate3() {
  const [show, setShow] = useState(false)
  const [edits , setEdit] = useState(false)
  const [rooms , setRooms] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  const [item , setItem] = useState({})
  console.log(id)
  useEffect(()=>{
   http.get(`/partner/hotels/${id}/rooms/`).then((res) =>{
    console.log(res.data)
    setRooms(res.data)
   })
  },[])
  const editRooms =(item)=>{
    setItem(item)
    setShow(true)
    setEdit(true)
  }
  const deleteRoom =(id)=>{
    http.delete(`/partner/hotel/rooms/${id}/`).then((res)=>{
      if(res.status === 204){
        window.location.reload()
      }
    }).catch((err) =>{
      console.log(err)
    })
  }
  const handleNext =()=>{
   navigate(`/register-next/${id}`)
  }
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const itemsPerPage = 6; // Number of items to display per page
const startIndex = currentPage * itemsPerPage;
const visibleItems = rooms.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="registr-3 table">
      <AddNumber setItem={setItem} setActive={setShow}  id={id} isActive={show} edit={edits} item={item} />
      <div className="row">
        <div className="table__title">Номера и цены </div>
        <div className="table__title-right">
          <div className="table__all-nums">
            Всего номеров: <strong>{rooms.length}</strong>
          </div>
          <button  onClick={setShow} on className="table__add-btn">Добавить номер</button>
        </div>
      </div>
      <div className="table__wrapper">
        <table>
          <thead>
            <tr>
              <th>Тип номера</th>
              <th>Количество номеров</th>
              <th>Вместимость</th>
              <th>Размер номера</th>
              <th>Цена за ночь</th>
              <th>Сообщения от PetsInn</th>
            </tr>
          </thead>
          <tbody>
            {
              visibleItems?.map((item, index)=>(

            <tr key={index}>
              <td>{item.tip_nomer}</td>
              <td>{item.numbers}</td>
              <td>{item.capacity}</td>
              <td>{item.size}</td>
              <td>{item.base_price}</td>
              <td>
                <div className="table__btns">
                  <button onClick={()=>editRooms(item)}>
                    <img src={edit} alt="edit" />
                  </button>
                  <button>
                    <img onClick={()=>deleteRoom(item.id)} src={trash} alt="delete" />
                  </button>
                </div>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
      </div>
     
           <ReactPaginate
      className='paginate'
      pageCount={Math.ceil(rooms.length / itemsPerPage)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      activeClassName={'active'}
    />
      <div className="table__btn-next">
        <MyButton onClick={handleNext}>Далее </MyButton>
      </div>
    </div>
  );
}

export default Registrate3;
