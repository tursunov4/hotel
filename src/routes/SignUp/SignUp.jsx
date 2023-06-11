import React, { useState } from "react";
import "./SignUp.scss";
import MyForm from "../../components/MyForm/MyForm";
import MyInput from "../../components/MyInput/MyInput";
import axiosInstance from "../../axios";
import Modal from "../../components/Modal/Modal";
import http from "../../axios";
import { useNavigate } from "react-router";
function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  // function onsubmitForm(e) {
  //   e.preventDefault();
  //   axiosInstance
  //     .post("/partner/register/", {
  //       username,
  //       firstname,
  //       email,
  //       password,
  //       password2,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         setError(error.response.data.email);
  //         setTimeout(() => {
  //           setError(null);
  //         }, 5000);
  //       }
  //     });
  //   console.log(username, firstname, email, password, password2);
  // }
  const onsubmitForm =(e)=>{
    e.preventDefault()
    http.post('/partner/register/' , {
      username: username,
  firstname: firstname,
  email: email,
  password: password,
  password2: password2
    }).then((res)=>{
      console.log(res)
      if(res.status === 201) {
        navigate('/singin')
      }
    }).catch((err) =>{
      console.log(err)
    })
  }
  return (
    <div>
      <Modal isActive={!!error} text={error} />

      <MyForm onSubmit={(e)=>onsubmitForm(e)} type="signup">
        <div className="signup">
          <MyInput
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            placeholder="Фамилия"
          />
          <MyInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Имя"
          />
          <MyInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Электронная почта"
          />
          <MyInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          <MyInput
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            placeholder="Подтвердите пароль"
          />
        </div>
      </MyForm>
    </div>
  );
}

export default SignUp;
