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
    const [languages, setLanguages] = useState([{levels: []}])
    const [profileError, setProfileError] = useState('')

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/me'
        }).then((response) => {
            setInfo(response.data.user)
            setLanguages(response.data.languages)
        }).catch((error) => {
            if (error.response.status === 403) {
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

    function EditProfile(event) {
        const photo = document.getElementById('profilePhotoFile').files[0]
        const email = document.getElementById('profileEmail').value
        const name = document.getElementById('profileName').value
        const age = document.getElementById('profileAge').value
        const group = document.getElementById('group').value

        const formData = new FormData
        if (photo) {
            formData.append('photo', photo)
        }
        formData.append('email', email)
        formData.append('name', name)
        formData.append('age', age)
        formData.append('group', group)

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
            } else {
                setProfileError('Не удалось изменить данные профиля')
            }
        }).catch((error) => {
            setProfileError('Не удалось изменить данные профиля')
        })

        event.preventDefault()
    }

    function Logout(event){
        axios({
            method: 'GET',
            url: '/api/logout'
        }).then((response) => {
            if (response.status === 200){
                window.location.href = '/'
            } else {
                setProfileError('Не удалось выйти')
            }
        }).catch((error) => {
            setProfileError('Не удалось выйти')
        })

        event.preventDefault()
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
                            <p>Group: <span>{info.group}</span></p>
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
                            <p>Group <input type='text' name='group' id='group' defaultValue={info.group}/></p>
                        </div>
                        <div className="profile__info__email profile__info__email__settings">
                            <p>Email: <input type='email' name='email' id='profileEmail' defaultValue={info.email}/></p>
                        </div>
                        <button className='profile__settings__button' onClick={EditProfile}>Изменить профиль</button>
                        <button className='profile__settings__button' onClick={Logout}>Выйти</button>
                        <p className='serverErrorsText' id='serverErrorsText'>{profileError}</p>
                    </div>
                    <ul className="awards" id='awards'>
                        {languages.map((value, index) => {
                            return (<>
                                <li className={value.is_completed ? 'awards__award active-award' : 'awards__award'}>
                                    <img src={awards} alt='awards icon'/>
                                    <h2>{value.name}</h2>
                                </li>
                            </>)
                        })}
                    </ul>
                </div>
                <div className="progress" id='progress'>
                    {languages.map((value, index) => {
                        return (<>
                                <div className="language">
                                    <h2>{value.name}</h2>
                                    <ul className='language__levels'>
                                        {value.levels.map((value, indexLevel) => {
                                            return (<>
                                                    <li className={value.is_current ? 'language__levels__level active' : 'language__levels__level'}>
                                                        <span>{value.is_completed ? '🗸' : value.number}</span>
                                                    </li>
                                                    {indexLevel !== 0 && indexLevel % 3 === 0 ? '' : <hr/>}
                                                </>
                                            )
                                        })}
                                    </ul>
                                    {value.levels.map((value, index) => {
                                        return (<>
                                            {value.is_current ?
                                                <CircularProgressbar
                                                    value={value.completedPercentage}
                                                    text={`${value.completedPercentage}%`}
                                                    strokeWidth={15}
                                                    styles={buildStyles({
                                                        textColor: "white",
                                                        pathColor: "#D9D9D9",
                                                        trailColor: "#7A28E2",
                                                    })}
                                                /> : ''}
                                        </>)
                                    })}
                                </div>
                            </>
                        )
                    })}
                </div>
            </main>
            <Footer/>
        </>
    )
}