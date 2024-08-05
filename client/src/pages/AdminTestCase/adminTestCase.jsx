import './adminTestCase.css'
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import back from "../../images/Header/back.png";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function AdminTestCase() {
    let {id} = useParams()
    const [testCase, setTestCase] = useState({})
    const [testCaseStatus, setTestCaseStatus] = useState('')

    useEffect(() => {
        getTestCase()

        const inputField = document.getElementById('code'); // get textarea object
        inputField.onkeydown = function (e) {
            if (e.keyCode === 9) {
                this.setRangeText('\t', this.selectionStart, this.selectionStart, 'end')
                return false;
            }
        };
    }, []);

    function getTestCase() {
        axios({
            method: 'GET',
            url: `/api/admin/test-cases/${id}/`
        }).then((response) => {
            setTestCase(response.data)
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/'
            }
        })
    }

    function editTestCase(event) {
        const data = {
            code: document.getElementById('code').value,
            text: document.getElementById('text').value
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/test-cases/${id}/`,
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setTestCase(response.data)
                setTestCaseStatus('Изменения применены!')
            } else {
                setTestCaseStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setTestCaseStatus('Введены недействительные данные, проверьте все ли поля заполнены!')
            } else {
                setTestCaseStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteTestCase(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/test-cases/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = `/admin/task/${testCase.task}`
            } else {
                setTestCaseStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setTestCaseStatus('Что то пошло не так :(')
        })

        event.preventDefault()
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={`/admin/task/${testCase.task}`}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__testCase__main'>
                <AdminEditing status={testCaseStatus} editFunc={editTestCase} deleteFunc={deleteTestCase}>
                    <CodeEditor style={{overflow: "auto"}} className='code__textarea' data-color-mode='light'
                                language={testCase.language_name} padding={10} laceholder='Код тест кейса' name='code'
                                id='code' value={testCase.code}/>
                    <input type='text' name='text' id='text' placeholder='Краткое содержание (getSum(1, 2))'
                           defaultValue={testCase.text}/>
                </AdminEditing>
            </main>
            <Footer/>
        </>
    )
}