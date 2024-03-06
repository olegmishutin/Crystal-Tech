import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AdminModal from "../../components/AdminModal/adminModal.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import axios from "axios";

import './adminLevels.css'
import back from "../../images/Header/back.png";

export default function AdminLevels() {
    let {id} = useParams();
    const [levelStatus, setLevelStatus] = useState('')
    const [languageStatus, setLanguageStatus] = useState('')
    const [language, setLanguage] = useState({})
    const [levels, setLevels] = useState([])

    function getLanguageLevels() {
        axios({
            method: 'GET',
            url: `/api/admin/language/${id}`
        }).then((response) => {
            setLevels(response.data.levels)
            setLanguage(response.data)
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/'
            }
        })
    }

    useEffect(() => {
        getLanguageLevels()
    }, []);

    function editLanguage(event) {
        setLanguageStatus('')
        const language = document.getElementById('name').value
        const icon = document.getElementById('icon').files[0]

        const formData = new FormData
        formData.append('name', language)

        if (icon) {
            formData.append('icon', icon)
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/language/${id}`,
            data: formData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setLanguage(response.data)
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setLanguageStatus('Введены недействительные данные, такой язык уже существует!')
            }
        })

        event.preventDefault()
    }

    function deleteLanguage() {
        axios({
            method: 'DELETE',
            url: `/api/admin/language/${id}`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = '/admin/languages/'
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    function createLevel(event) {
        const number = document.getElementById('number').value
        const decription = document.getElementById('description').value
        const image = document.getElementById('image').files[0]

        const formData = new FormData
        formData.append('number', number)
        formData.append('description', decription)
        formData.append('image', image)
        formData.append('language', id)

        axios({
            method: 'POST',
            url: '/api/admin/levels',
            data: formData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getLanguageLevels()
                closeModal()
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setLevelStatus('Введены недействительные данные, заполните все поля и не создавайте уровни с одинаковыми номерами!')
            }
        })
    }

    function openModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal adminModalActive'
    }

    function closeModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal'
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={'/admin/languages/'}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__levels__main'>
                <AdminEditing>
                    <div className="block">
                        <label htmlFor='name'>Текущий язык программирования: {language.name}</label>
                        <select name='name' id='name'>
                            <option value='python'>python</option>
                            <option value='js'>js</option>
                        </select>
                    </div>
                    <div className="block">
                        <div className="image">
                            <img src={language.icon} alt='language icon'/>
                        </div>
                        <input type='file' name='icon' id='icon'/>
                    </div>
                    <div className="button__box">
                        <button className='editButton' type='button' onClick={editLanguage}>Edit</button>
                        <button className='deleteButton' type='button' onClick={deleteLanguage}>Delete</button>
                    </div>
                    <p>{languageStatus}</p>
                </AdminEditing>
                <ul className='admin__levels__main__list adminEditingFront'>
                    {levels.map((value, index) => {
                        return (
                            <>
                                <li className='admin__levels__main__list__element'>
                                    <Link className='admin__levels__main__list__element__link'
                                          to={`/admin/level/${value.id}`}>
                                        <div className="admin__levels__main__list__element__image">
                                            <img src={value.image} alt='language image'/>
                                        </div>
                                        <h2>Уровень {value.number}</h2>
                                    </Link>
                                </li>
                            </>
                        )
                    })}
                    <li className='admin__levels__main__list__element'>
                        <button className='admin__levels__main__list__element__link' onClick={openModal}>+</button>
                    </li>
                </ul>
            </main>
            <Footer/>
            <AdminModal>
                <input type='number' name='number' id='number' placeholder='Номер уровня' min='0'/>
                <textarea placeholder='Краткое описание' name='description' id='description'></textarea>
                <div className="block">
                    <label htmlFor='image'>Картинка уровня</label>
                    <input type='file' name='image' id='image'/>
                </div>
                <div className="button__box">
                    <button className='createButton' type='button' onClick={createLevel}>Create</button>
                    <button className='cancelButton' type='button' onClick={closeModal}>Cancel</button>
                </div>
                <p className='status'>{levelStatus}</p>
            </AdminModal>
        </>
    )
}