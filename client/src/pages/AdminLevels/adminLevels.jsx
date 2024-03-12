import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AdminModal from "../../components/AdminModal/adminModal.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import AdminMainList from "../../components/AdminMainList/adminMainList.jsx";
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
        const image = document.getElementById('languageImage').files[0]

        const formData = new FormData
        formData.append('name', language)

        if (image) {
            formData.append('image', image)
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
                setLanguageStatus('Изменения применены!')
            } else {
                setLanguageStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setLanguageStatus('Введены недействительные данные, проверьте все ли поля заполнены, также названия языков не должны повторяться!')
            } else {
                setLanguageStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteLanguage(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/language/${id}`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = '/admin/languages/'
            } else {
                setLanguageStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setLanguageStatus('Что то пошло не так :(')
        })

        event.preventDefault()
    }

    function createLevel(event) {
        const number = document.getElementById('number').value
        const description = document.getElementById('description').value
        const image = document.getElementById('image').files[0]

        const formData = new FormData
        formData.append('number', number)
        formData.append('description', description)
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
            } else {
                setLevelStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setLevelStatus('Введены недействительные данные, проверьте все ли поля заполнены, также номера уровней не должны повторяться!')
            } else {
                setLevelStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function closeModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal'
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={'/admin/'}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__levels__main'>
                <AdminEditing editFunc={editLanguage} deleteFunc={deleteLanguage} status={languageStatus}>
                    <div className="block">
                        <label htmlFor='name'>Текущий язык программирования: {language.name}</label>
                        <select name='name' id='name'>
                            <option value='python'>python</option>
                            <option value='js'>js</option>
                        </select>
                    </div>
                    <div className="block">
                        <div className="image">
                            <img src={language.image} alt='language icon'/>
                        </div>
                        <input type='file' name='languageImage' id='languageImage'/>
                    </div>
                </AdminEditing>
                <AdminMainList data={levels} nextPage={'/admin/level/'}/>
            </main>
            <Footer/>
            <AdminModal createFunc={createLevel} closeModalFunc={closeModal} status={levelStatus}>
                <input type='number' name='number' id='number' placeholder='Номер уровня' min='0'/>
                <textarea placeholder='Краткое описание' name='description' id='description'></textarea>
                <div className="block">
                    <label htmlFor='image'>Картинка уровня</label>
                    <input type='file' name='image' id='image'/>
                </div>
            </AdminModal>
        </>
    )
}