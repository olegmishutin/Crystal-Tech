import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminModal from "../../components/AdminModal/adminModal.jsx";

import './adminLanguages.css'
import axios from "axios";

export default function AdminLanguages() {
    const [languages, setLanguages] = useState([])
    const [status, setStatus] = useState('')

    function getLanguages() {
        axios({
            method: 'GET',
            url: '/api/admin/languages'
        }).then((response) => {
            setLanguages(response.data)
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/'
            }
        })
    }

    useEffect(() => {
        getLanguages()
    }, []);

    function createLanguage(event) {
        const language = document.getElementById('name').value
        const icon = document.getElementById('icon').files[0]

        const formData = new FormData
        formData.append('name', language)
        formData.append('icon', icon)

        axios({
            method: 'POST',
            url: '/api/admin/languages',
            data: formData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                closeModal()
                getLanguages()
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setStatus('Введены недействительные данные, заполните все поля и не создавайте языки, которые уже существуют!')
            }
        })

        event.preventDefault()
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
            <Header/>
            <main className='admin__language__main'>
                <ul className='admin__language__main__list'>
                    {languages.map((value, index) => {
                        return (
                            <>
                                <li className='admin__language__main__list__element'>
                                    <Link className='admin__language__main__list__element__link'
                                          to={`/admin/language/${value.id}`}>
                                        <div className="admin__language__main__list__element_image">
                                            <img src={value.icon} alt='language image'/>
                                        </div>
                                        <h2>{value.name}</h2>
                                    </Link>
                                </li>
                            </>
                        )
                    })}
                    <li className='admin__language__main__list__element'>
                        <button className='admin__language__main__list__element__link' onClick={openModal}>+</button>
                    </li>
                </ul>
            </main>
            <Footer/>
            <AdminModal>
                <div className="block">
                    <label htmlFor='name'>Выберите язык программирования:</label>
                    <select name='name' id='name'>
                        <option value='python'>python</option>
                        <option value='js'>js</option>
                    </select>
                </div>
                <input type='file' name='icon' id='icon'/>
                <div className="button__box">
                    <button className='createButton' type='button' onClick={createLanguage}>Create</button>
                    <button className='cancelButton' type='button' onClick={closeModal}>Cancel</button>
                </div>
                <p className='status'>{status}</p>
            </AdminModal>
        </>
    )
}