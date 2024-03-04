import {useEffect, useState} from "react";
import './authModal.css'
import closeIcon from '../../images/Modal/close icon.png'
import axios from "axios";

export default function AuthModal() {
    const [loginStatus, setLoginStatus] = useState('')
    const [registerStatus, setRegisterStatus] = useState('')

    function register(event) {
        axios({
            method: 'POST',
            url: '/api/register',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                name: document.getElementById('name').value
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                setRegisterStatus('Успешно зарегистрированны!')
                setTimeout(() => {
                    document.getElementById('toggle').checked = false
                }, 1000);
            }
        }).catch((error) => {
            setRegisterStatus('Не удалось создать пользователя с такими данными!')
        })
        event.preventDefault()
    }

    function login(event) {
        axios({
            method: 'POST',
            url: '/api/login',
            data: {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value,
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setLoginStatus('Успешно вошли в систему!')
            }
        }).catch((error) => {
            setLoginStatus('Не удалось войти с такими данными!')
        })
        event.preventDefault()
    }

    return (
        <div id="modal">
            <div className="wrapper">
                <div className="card-switch">
                    <label className="switch">
                        <input className="toggle" type="checkbox" id='toggle'/>
                        <span className="slider"></span>
                        <span className="card-side"></span>
                        <div className="flip-card__inner">
                            <div className="flip-card__front">
                                <div className="circle_modal_front">
                                </div>
                                <a href="" id="close_modal"><img className="krest" src={closeIcon}/></a>
                                <div className="title">Log in</div>
                                <form className="flip-card__form"
                                      id="loginForm">
                                    <input type="email" placeholder="Email" name="email" id='loginEmail'
                                           className="flip-card__input"/>

                                    <input type="password" placeholder="Password" id='loginPassword' name="password"
                                           className="flip-card__input"/>
                                    <span>{loginStatus}</span>
                                    <button type='button' onClick={login} className="flip-card__btn">Let`s go!</button>
                                </form>
                            </div>
                            <div className="flip-card__back">
                                <div className="circle_modal_back"></div>
                                <a href="" id="close_modal"><img className="krest" src={closeIcon}/></a>
                                <div className="title">Sign up</div>
                                <form className="flip-card__form" id="registerForm">
                                    <input type="text" placeholder="Name" name="username" id='name'
                                           className="flip-card__input"/>
                                    <input type="email" placeholder="Email" name="email" id='email'
                                           className="flip-card__input"/>
                                    <input type="password" placeholder="Password" id='password' name="password"
                                           className="flip-card__input"/>
                                    <span>{registerStatus}</span>
                                    <button type="button" onClick={register} className="flip-card__btn">Confirm!
                                    </button>
                                </form>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}