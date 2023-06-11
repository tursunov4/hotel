import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import NavBar from "../../../components/NavBar/NavBar";
import "./PrivateRoutes.scss";
import { Link } from "react-router-dom";
import userImg from "./../../../assets/images/user-img.png";
import { useNavigate } from "react-router";
function PrivateRoutes() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const first_name = localStorage.getItem('firstname')
  const last_name = localStorage.getItem('lastname')
  const image = localStorage.getItem('image')
  const email = localStorage.getItem('email')
  const titles = [
    {
      path: "/object-manage",
      title: "Управление объектами размещения",
    },
    {
      path: "/registre-new-object",
      title: "Регистрация нового объекта размещения",
    },
  ];
  useEffect(() => {
    const all = document.querySelectorAll(".burger__item");
    for (let el of all) {
      el.classList.remove("active");
      if (el.querySelector(`a[href='${currentUrl}']`)?.parentElement) {
        el.querySelector(
          `a[href='${currentUrl}']`
        )?.parentElement?.classList?.add("active");
      }
    }
    for (let el of titles) {
      if (el.path === currentUrl) {
        document.querySelector(".menu__title").innerHTML = el.title;
      }
    }
  }, [currentUrl]);
  function openMenu(e) {
    const burgerNaws = document.querySelector(".burger__navs");

    burgerNaws.classList.toggle("active");
  }
  useEffect(() => {
    const burgerNaws = document.querySelector(".burger__navs");
    document.body.addEventListener("click", (e) => {
      if (!e.target.closest(".burger__icon")) {
        burgerNaws.classList.remove("active");
      }
    });
  }, []);
  const navigate = useNavigate()
  const logoutClick =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('id')
      navigate('/')
    window.location.reload()
  }
  return (
    <div>
      <div className="object-manage">
        <div className="wrapper">
          <NavBar />
          <main className="main">
            <div className="menu-top">
              <div className="menu__row">
                <h2 className="menu__title">Управление объектами размещения</h2>
                <div className="menu__right">
                  <div className="notification"></div>
                  <div className="user-info">
                    <div className="user__descr">
                      <div className="user__name">{first_name}</div>
                      <div className="user__email">{email}</div>
                    </div>
                    <div className="user__img">
                      <img className="userrrimg" width={40} height={40} src={image} alt="user" />
                    </div>
                  </div>
                  <div className="burger">
                    <div onClick={openMenu} className="burger__icon"></div>
                    <div className="burger__navs">
                      <div className="burger__item">
                        <Link to={"/object-manage"}>Мои объекты</Link>
                      </div>
                      <div className="burger__item">
                        <Link to={"/registre-new-object/1"}>
                          Регистрация объекта
                        </Link>
                      </div>
                      <div className="burger__item">
                        <Link to={"/fdasfd"}>Бронирования</Link>
                      </div>
                      <div className="burger__item">
                        <Link to={"/asdfasfd"}>Отзывы</Link>
                      </div>
                      <div className="burger__item">
                        <a  onClick={logoutClick} >Выйти</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default PrivateRoutes;
