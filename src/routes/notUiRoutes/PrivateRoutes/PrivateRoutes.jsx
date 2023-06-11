import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import NavBar from "../../../components/NavBar/NavBar";
import "./PrivateRoutes.scss";
import { Link } from "react-router-dom";
import userImg from "./../../../assets/images/user-img.png";
function PrivateRoutes() {
  const location = useLocation();
  const currentUrl = location.pathname;
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
                      <div className="user__name">Иванов Иван</div>
                      <div className="user__email">username@mail.ru</div>
                    </div>
                    <div className="user__img">
                      <img src={userImg} alt="user" />
                    </div>
                  </div>
                  <div className="burger">
                    <div onClick={openMenu} className="burger__icon"></div>
                    <div className="burger__navs">
                      <div className="burger__item">
                        <Link to={"/"}>Мои объекты</Link>
                      </div>
                      <div className="burger__item">
                        <Link to={"/registre-new-object/1"}>
                          Регистрация объекта
                        </Link>
                      </div>
                      <div className="burger__item">
                        <Link to={"/"}>Бронирования</Link>
                      </div>
                      <div className="burger__item">
                        <Link to={"/"}>Отзывы</Link>
                      </div>
                      <div className="burger__item">
                        <span >Выйти</span>
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
