import './adminSite.css'
import {Link, useParams} from "react-router-dom";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import {useState, useEffect} from "react";
import axios from "axios";
import back from "../../images/Header/back.png";

export default function AdminSite() {
    let {id} = useParams()
    let {levelId} = useParams()
    const [info, setInfo] = useState({})
    const [status, setStatus] = useState('')

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/admin/site/${id}`
        }).then((response) => {
            if (response.status === 200) {
                setInfo(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    function editSite(event) {
        axios({
            method: 'PATCH',
            url: `/api/admin/site/${id}`,
            data: {
                href: document.getElementById('siteHref').value
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setStatus('Изменения успешно применены!')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setStatus('Введены недействительные данные, проверьте все ли поля заполнены!')
            } else {
                setStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteSite(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/site/${id}`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = `/admin/level/${levelId}`
            }
        }).catch((error) => {
            console.log(error.response.status)
        })

        event.preventDefault()
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={`/admin/level/${levelId}`}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__site__main'>
                <AdminEditing editFunc={editSite} deleteFunc={deleteSite} status={status}>
                    <input type='text' name='siteHref' id='siteHref' placeholder='Ссылка на источник'
                           defaultValue={info.href}/>
                </AdminEditing>
            </main>
            <Footer/>
        </>
    )
}