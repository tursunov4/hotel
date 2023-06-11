import React, { useEffect } from "react";
import "./NavBar.scss";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function NavBar() {
  const location = useLocation();
  let currentUrl = location.pathname;
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
          <Link to={'/'} >Мои объекты</Link>
        </div>
        <div className="section-nav">
          <Link to={"/registre-new-object/1"}>
            Регистрация объекта
          </Link>
        </div>
        <div className="section-nav">
          <Link to={'/'}>Бронирования</Link>
        </div>
        <div className="section-nav">
          <Link to={'/'}>Отзывы</Link>
        </div>
      </div>
      <div className="logout">
        <a href="/login">Выйти</a>
      </div>
    </div>
  );
}

export default NavBar;
