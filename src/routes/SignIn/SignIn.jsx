import React, { useState } from "react";
import "./SignIn.scss";
import MyForm from "../../components/MyForm/MyForm";
import MyInput from "../../components/MyInput/MyInput";
import Modal from "../../components/Modal/Modal";
import http from "../../axios";
function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //user@example.com
  //string3030
  const onSubmitForm =(e) =>{
    e.preventDefault()
    http.post('/partner/login/',{
         email_or_username: login,
         password: password,
         tokens :'dfdfdf'
        }).then((res) =>{
       localStorage.setItem('token' , res.data.tokens.access)
       localStorage.setItem('id', res.data.id)
      if(res.status === 200){
        window.location.reload()
        console.log(res)
      }
   
      
      }).catch((err) =>{
        console.log(err)
      })
  }
  return (
    <div>
      <MyForm onSubmit={(e) => onSubmitForm(e)} type="signin">
        <Modal isActive={!!error} text={error} />
        <label className="input">
          <MyInput
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            minLength={3}
            placeholder="Введите логин или Email"
          />
        </label>
        <div className="forgot">
          <a href="/signup">Забыли пароль?</a>
        </div>
        <label className="input">
          <MyInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            type="password"
            placeholder="Введите пароль"
          />
        </label>
      </MyForm>
    </div>
  );
}

export default SignIn;
