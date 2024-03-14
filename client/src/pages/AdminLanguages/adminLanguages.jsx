import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminModal from "../../components/AdminModal/adminModal.jsx";
import AdminMainList from "../../components/AdminMainList/adminMainList.jsx";

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
        const image = document.getElementById('image').files[0]

        const formData = new FormData
        formData.append('name', language)
        formData.append('image', image)

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
                setStatus('Введены недействительные данные, проверьте все ли поля заполнены, также названия языков не должны повторяться!')
            } else {
                setStatus('Что то пошло не так :(')
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
            <Header/>
            <main className='admin__language__main'>
                <AdminMainList data={languages} nextPage={'/admin/language/'}/>
            </main>
            <Footer/>
            <AdminModal createFunc={createLanguage} closeModalFunc={closeModal} status={status}>
                <div className="block">
                    <label htmlFor='name'>Выберите язык программирования:</label>
                    <select name='name' id='name'>
                        <option value='js'>js</option>
                        <option value='py'>python</option>
                    </select>
                </div>
                <input type='file' name='image' id='image'/>
            </AdminModal>
        </>
    )
}