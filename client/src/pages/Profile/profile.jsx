import {useState, useEffect} from "react";
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Circles from "../../components/Background/Background.jsx"

import profileIcon from '../../images/Profile/photo.png'
import settingsIcon from '../../images/Profile/settings.png'
import awards from '../../images/Profile/awards.png'

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './profile.css'
import axios from "axios";

export default function Profile() {
    let profileSettingsState = false
    const [info, setInfo] = useState({})

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/me'
        }).then((response) => {
            setInfo(response.data)
        }).catch((error) => {
            if (error.response.status === 403){
                window.location.href = '/'
            }
        })
    }, []);

    function ProfileSettings() {
        const awards = document.getElementById('awards')
        const progress = document.getElementById('progress')
        const profileHeader = document.getElementById('profileHeader')
        const profileInfo = document.getElementById('profileInfo')
        const profileSettingsHeader = document.getElementById('profileSettingsHeader')
        const profileSettingsInfo = document.getElementById('profileSettingsInfo')

        function setProfileSettingsState(opacity, profileDisplay, profileSettingsDisplay, state) {
            awards.style.opacity = opacity
            progress.style.opacity = opacity
            profileHeader.style.display = profileDisplay
            profileInfo.style.display = profileDisplay === 'flex' ? 'block' : profileDisplay
            profileSettingsHeader.style.display = profileSettingsDisplay
            profileSettingsInfo.style.display = profileSettingsDisplay === 'flex' ? 'block' : profileSettingsDisplay
            profileSettingsState = state
        }

        if (profileSettingsState === false) {
            setProfileSettingsState('0.5', 'none', 'flex', true)
        } else {
            setProfileSettingsState('1', 'flex', 'none', false)
        }
    }

    function EditProfile() {
        const photo = document.getElementById('profilePhotoFile').files[0]
        const email = document.getElementById('profileEmail').value
        const name = document.getElementById('profileName').value
        const age = document.getElementById('profileAge').value

        const formData = new FormData
        if (photo) {
            formData.append('photo', photo)
        }
        formData.append('email', email)
        formData.append('name', name)
        formData.append('age', age)

        axios({
            method: 'PATCH',
            url: '/api/me',
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true,
            data: formData
        }).then((response) => {
            if (response.status === 200) {
                window.location.reload()
            }
        }).catch((error) => {
            document.getElementById('serverErrorsText').innerText = 'Не удалось изменить данные профиля'
        })
    }

    return (
        <>
            <Circles>
                <div className='profile-circle profile-circle-dark-purple'></div>
                <div className='profile-circle profile-circle-orange'></div>
                <div className='profile-circle profile-circle-blue'></div>
                <div className='profile-circle profile-circle-blue'></div>
                <div className='profile-circle profile-circle-pink'></div>
            </Circles>
            <Header/>
            <main className='profile__main'>
                <div className="profile">
                    <div className="profile__header" id='profileHeader'>
                        <div className="profile__header__photo">
                            {info.photo ? <img src={info.photo} alt='user proho'/> :
                                <img src={profileIcon} alt='user proho'/>}
                        </div>
                        <button onClick={ProfileSettings} className='profile__header__settings'>
                            <img src={settingsIcon} alt='settnigs icon'/>
                        </button>
                    </div>
                    <div className="profile__info" id='profileInfo'>
                        <div className="profile__info__user">
                            <p>Name: <span>{info.name}</span></p>
                            <p>Age: <span>{info.age}</span></p>
                        </div>
                        <div className="profile__info__email">
                            <p>Email: <span>{info.email}</span></p>
                        </div>
                    </div>
                    <div className="profile__header profile__settings" id='profileSettingsHeader'>
                        <div className="profile__header__photo">
                            {info.photo ? <img src={info.photo} alt='user proho'/> :
                                <img src={profileIcon} alt='user proho'/>}
                            <label className="profile__header__photo__file">
                                <input type="file" name='file' id='profilePhotoFile' className='file'/>
                                Choose image
                            </label>
                        </div>
                        <button onClick={ProfileSettings} className='profile__header__settings'>
                            <img src={settingsIcon} alt='settnigs icon'/>
                        </button>
                    </div>
                    <div className="profile__info profile__settings" id='profileSettingsInfo'>
                        <div className="profile__info__user profile__info__user__settings">
                            <p>Name: <input type='text' name='name' id='profileName' defaultValue={info.name}/></p>
                            <p>Age: <input type='number' name='age' min='0' max='100' id='profileAge'
                                           defaultValue={info.age}/></p>
                        </div>
                        <div className="profile__info__email profile__info__email__settings">
                            <p>Email: <input type='email' name='email' id='profileEmail' defaultValue={info.email}/></p>
                        </div>
                        <button className='profile__settings__button' onClick={EditProfile}>Изменить профиль</button>
                        <p className='serverErrorsText' id='serverErrorsText'></p>
                    </div>
                    <ul className="awards" id='awards'>
                        <li className='awards__award active-award'>
                            <img src={awards} alt='awards icon'/>
                            <h2>Java Script</h2>
                        </li>
                        <li className='awards__award'>
                            <img src={awards} alt='awards icon'/>
                            <h2>C Sharp</h2>
                        </li>
                        <li className='awards__award'>
                            <img src={awards} alt='awards icon'/>
                            <h2>Python</h2>
                        </li>
                    </ul>
                </div>
                <div className="progress" id='progress'>
                    <div className="language">
                        <h2>Java Script</h2>
                        <ul className='language__levels'>
                            <li className='language__levels__level'>
                                <span>🗸</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>🗸</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>🗸</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level active'>
                                <span>🗸</span>
                            </li>
                        </ul>
                        <CircularProgressbar
                            value={10}
                            text={`${10}%`}
                            strokeWidth={15}
                            styles={buildStyles({
                                textColor: "white",
                                pathColor: "#D9D9D9",
                                trailColor: "#7A28E2",
                            })}
                        />
                    </div>
                    <div className="language">
                        <h2>C Sharp</h2>
                        <ul className='language__levels'>
                            <li className='language__levels__level active'>
                                <span>1</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>2</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>3</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>4</span>
                            </li>
                        </ul>
                        <CircularProgressbar
                            value={1}
                            text={`${1}%`}
                            strokeWidth={15}
                            styles={buildStyles({
                                textColor: "white",
                                pathColor: "#D9D9D9",
                                trailColor: "#7A28E2",
                            })}
                        />
                    </div>
                    <div className="language">
                        <h2>Python</h2>
                        <ul className='language__levels'>
                            <li className='language__levels__level active'>
                                <span>1</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>2</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>3</span>
                            </li>
                            <hr/>
                            <li className='language__levels__level'>
                                <span>4</span>
                            </li>
                        </ul>
                        <CircularProgressbar
                            value={80}
                            text={`${80}%`}
                            strokeWidth={15}
                            styles={buildStyles({
                                textColor: "white",
                                pathColor: "#D9D9D9",
                                trailColor: "#7A28E2",
                            })}
                        />
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}