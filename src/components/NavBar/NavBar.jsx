import React, { useEffect } from "react";
import "./NavBar.scss";
import Logo from "../Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function NavBar() {
  const location = useLocation();
  let currentUrl = location.pathname;
  const navigate = useNavigate()
  const logoutClick =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('id')
      navigate('/')
    window.location.reload()
  }
  useEffect(() => {
    const all = document.querySelectorAll(".section-nav");
    for (let el of all) {
      el.classList.remove("active");
    }
    let array = currentUrl.split("/");
    if (array.at(-2) === "registre-new-object") {
      array.pop();
      array.push("1");
      currentUrl = array.join("/");
    }
    document
      .querySelector(`a[href='${currentUrl}']`)
      ?.parentElement?.classList?.add("active");
  }, [currentUrl]);

  return (
    <div className="navbar">
      <div className="navs">
        <div className="section-logo">
          <Logo />
        </div>
        <div className="section-nav">
        {/* to={"/dashboard/object-manage"} */}
          <Link to={'/object-manage'} >Мои объекты</Link>
        </div>
        <div className="section-nav">
          <Link to={"/registre-new-object/1"}>
            Регистрация объекта
          </Link>
        </div>
        <div className="section-nav">
          <Link to={'/Бронирования'}>Бронирования</Link>
        </div>
        <div className="section-nav">
          <Link to={'/Отзывы'}>Отзывы</Link>
        </div>
      </div>
      <div className="logout">
        <a onClick={logoutClick}>Выйти</a>
      </div>
    </div>
  );
}

export default NavBar;
