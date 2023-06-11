import React from "react";
import Logo from "../Logo/Logo";
import google from "../../assets/icons/google.svg";
import MyButton from "../MyButton/MyButton";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import "./MyForm.scss";
import http from "../../axios";
import { useNavigate } from "react-router";
function MyForm({ children, type, ...props }) {
  let data = {
    signin: {
      title: "С возращением!",
      subTitle: "Для входа введите свой логин и пароль",
      googleBtn: "Войти с Google",
      btn: "Войти",
      question: "Не зарегистрированы?",
      answer: "Регистрация",
      link: "/singup",
    },
    signup: {
      title: "Создайте аккаунт партнера",
      subTitle: "Для регистрации заполните все поля",
      googleBtn: "Зарегистрироваться с Google",
      btn: "Создать аккаунт",
      question: "Есть аккаунт?",
      answer: "Вход",
      link: "/singin",
    },
  };
  const navigate = useNavigate()
  const handeleForm = useGoogleLogin({
        onSuccess: (codeResponse) => {
   
            http.post('/social-auth/GoogleLogin' ,{            
                      access_token:codeResponse.access_token,
                      code: "string"
                    }).then(res=>{                        
                      localStorage.setItem('token' , res.data.tokens.access)
                      localStorage.setItem('id' , res.data.id)
                      console.log(res)
                        if(res.status === 200){
                         navigate('/object-manage')
                         window.location.reload()
                        }
                    
                    }).catch((err)=>{
                      console.log(err)
                    })         
          
        }
        ,
        onError: (error) => console.log('Login Failed:', error)
    });
  
  
  return (
    <form {...props} className="form">
      <div className="logo">
        <Logo />
      </div>
      <h2 className="title">{data[type].title}</h2>
      <p className="sub-title">{data[type].subTitle}</p>
      <button onClick={()=>handeleForm()} type="button" className="goole-btn">
        <img src={google} alt="google" />
        {data[type].googleBtn}
      </button>
      <div className="or">
        <span>Или</span>
      </div>

      {children}
      <MyButton type="submit" className="btn">
        {data[type].btn}
      </MyButton>
      <div className="question-answer">
        <span>{data[type].question}</span>
        <a href={data[type].link}>{data[type].answer}</a>
      </div>
    </form>
  );
}

export default MyForm;
