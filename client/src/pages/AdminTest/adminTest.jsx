import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import AdminMainList from "../../components/AdminMainList/adminMainList.jsx";

import './adminTest.css'
import back from "../../images/Header/back.png";
import axios from "axios";

export default function AdminTest() {
    const {id} = useParams();
    const [testData, setTestData] = useState({questions: []})
    const [testStatus, setTestStatus] = useState('')

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/admin/tests/${id}/`
        }).then((response) => {
            if (response.status === 200) {
                setTestData(response.data)
            }
        }).catch((error) => {
            window.location.href = '/'
        })
    }, []);

    function editTest(event) {
        const data = {
            name: document.getElementById('testName').value,
            highest_score_percentage: document.getElementById('testHighestScorePercentage').value
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/tests/${id}/`,
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setTestData(response.data)
                setTestStatus('Изменения применены!')
            } else {
                setTestStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setTestStatus('Введены недействительные данные, проверьте все ли поля заполнены')
            } else {
                setTestStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteTest(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/tests/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = '/admin/'
            } else {
                setTestStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setTestStatus('Что то пошло не так :(')
        })
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={'/admin/'}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__test__main'>
                <AdminEditing editFunc={editTest} deleteFunc={deleteTest} status={testStatus}>
                    <div className="block">
                        <input type='text' className='textbox' name='testName' id='testName'
                               placeholder='Название теста' defaultValue={testData.name}/>
                        <input type='number' className='textbox' min={0} max={100} name='testHighestScorePercentage'
                               id='testHighestScorePercentage' placeholder='Процент выполнения для получения 5'
                               defaultValue={testData.highest_score_percentage}/>
                    </div>
                </AdminEditing>
                <AdminMainList data={testData.questions} forceInput={true}/>
            </main>
            <Footer/>
        </>
    )
}