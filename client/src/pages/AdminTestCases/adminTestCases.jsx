import './adminTestCases.css'
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import AdminModal from "../../components/AdminModal/adminModal.jsx";
import AdminMainList from "../../components/AdminMainList/adminMainList.jsx";
import back from "../../images/Header/back.png";
import CodeEditor from "@uiw/react-textarea-code-editor";


export default function AdminTestCases() {
    let {id} = useParams()
    const [task, setTask] = useState({testCases: []})
    const [taskStatus, setTaskStatus] = useState('')
    const [testCaseStatus, setTestCaseStatus] = useState('')

    useEffect(() => {
        getTask()

        const inputField = document.getElementById('code'); // get textarea object
        inputField.onkeydown = function (e) {
            if (e.keyCode === 9) {
                this.setRangeText('\t', this.selectionStart, this.selectionStart, 'end')
                return false;
            }
        };
    }, []);

    function getTask() {
        axios({
            method: 'GET',
            url: `/api/admin/tasks/${id}/`
        }).then((response) => {
            setTask(response.data)
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/'
            }
        })
    }

    function editTask(event) {
        const data = {
            number: document.getElementById('taskNumber').value,
            text: document.getElementById('taskText').value,
            time: document.getElementById('taskTime').value
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/tasks/${id}/`,
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setTask(response.data)
                setTaskStatus('Изменения применены!')
            } else {
                setTaskStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setTaskStatus('Введены недействительные данные, проверьте все ли поля заполнены, также номера задач не должны повторяться!')
            } else {
                setTaskStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteTask(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/tasks/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = `/admin/level/${task.level}`
            } else {
                setTaskStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setTaskStatus('Что то пошло не так :(')
        })

        event.preventDefault()
    }

    function createTestCase(event) {
        const data = {
            code: document.getElementById('code').value,
            text: document.getElementById('text').value,
            task: id
        }

        axios({
            method: 'POST',
            url: '/api/admin/test-cases/',
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getTask()
                closeModal()
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

    function closeModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal'
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={`/admin/level/${task.level}`}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__testCases__main'>
                <AdminEditing status={taskStatus} editFunc={editTask} deleteFunc={deleteTask}>
                    <input type='number' placeholder='Номер задачи' name='taskNumber' id='taskNumber'
                           defaultValue={task.number}/>
                    <input type='number' placeholder='Время на выполнение (в милисекундах)' name='taskTime'
                           id='taskTime'
                           defaultValue={task.time}/>
                    <textarea placeholder='Опишите задачу' name='taskText' id='taskText'
                              defaultValue={task.text}></textarea>
                </AdminEditing>
                <AdminMainList data={task.testCases} nextPage={'/admin/test-case/'} name='Тест кейсы'></AdminMainList>
            </main>
            <Footer/>
            <AdminModal createFunc={createTestCase} closeModalFunc={closeModal} status={testCaseStatus}>
                <CodeEditor style={{overflow: "auto"}} className='code__textarea' data-color-mode='light'
                            language={task.language_name} padding={10} placeholder='Код тест кейса' name='code'
                            id='code'/>
                <input type='text' name='text' id='text' placeholder='Краткое содержание (getSum(1, 2))'/>
            </AdminModal>
        </>
    )
}