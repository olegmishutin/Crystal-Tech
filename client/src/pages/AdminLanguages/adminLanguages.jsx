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
    const [tests, setTests] = useState([])
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState('')
    const [testStatus, setTestStatus] = useState('')

    function getLanguages() {
        axios({
            method: 'GET',
            url: '/api/admin/languages/'
        }).then((response) => {
            setLanguages(response.data)
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/'
            }
        })
    }

    function getTests() {
        axios({
            method: 'GET',
            url: '/api/admin/tests/'
        }).then((response) => {
            if (response.status === 200) {
                setTests(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function getUsers() {
        axios({
            method: 'GET',
            url: '/api/admin/all-users'
        }).then((response) => {
            if (response.status === 200) {
                setUsers(response.data)
            } else {
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getLanguages()
        getTests()
        getUsers()
    }, []);

    function createLanguage(event) {
        const language = document.getElementById('name').value
        const image = document.getElementById('image').files[0]
        const courseType = document.getElementById('courseType').value

        const formData = new FormData
        formData.append('name', language)
        formData.append('image', image)
        formData.append('is_closed', courseType)

        axios({
            method: 'POST',
            url: '/api/admin/languages/',
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

    function createTest(event) {
        const data = {
            name: document.getElementById('testName').value,
            highest_score_percentage: document.getElementById('testHighestScorePercentage').value
        }

        axios({
            method: 'POST',
            url: '/api/admin/tests/',
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                closeTestModal()
                getTests()
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

    function deleteUser(userId) {
        axios({
            method: 'DELETE',
            url: `/api/admin/delete-user/${userId}`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                if (document.getElementById('search').value) {
                    searchUser()
                } else {
                    getUsers()
                }
            } else {
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function searchUser(event) {
        const searchField = document.getElementById('search').value
        const href = searchField ? `/api/admin/all-users?search=${searchField}` : '/api/admin/all-users'

        axios({
            method: 'GET',
            url: href,
        }).then((response) => {
            if (response.status === 200) {
                setUsers(response.data)
            } else {
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })

        event.preventDefault()
    }

    function openTestModal() {
        const modal = document.getElementById('testModal')
        modal.className = 'adminModal adminModalActive'
    }

    function closeTestModal() {
        const modal = document.getElementById('testModal')
        modal.className = 'adminModal'
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
                <AdminMainList data={languages} nextPage='/admin/language/' name='Языки программирования'/>
                <AdminMainList data={tests} nextPage='/admin/test/' name='Тесты' openModal={openTestModal}/>
                <div className="admin__users">
                    <h2 className='admin__main_list__header'>Пользователи</h2>
                    <div className="row-block">
                        <input type='text' name='search' id='search' placeholder='Поиск по email, имени или группе'/>
                        <button onClick={searchUser}>Поиск</button>
                    </div>
                    <ul className='admin__users__list'>
                        {users.map((value, index) => {
                            return (<>
                                <li className='admin__users__list__element' id={`listElement_${value.id}`}>
                                    <div className="admin__users__list__element__info">
                                        <h3>{value.email}</h3>
                                        <p>{value.name}</p>
                                        <p>{value.group}</p>
                                    </div>
                                    <p>Количество пройденых ЯП-ов: {value.completed_languages_count}</p>
                                    <p>Количество пройденых уровней: {value.completed_levels_count}</p>
                                    <p>Количество пройденых заданий: {value.completed_tasks_count}</p>
                                    <button className='deleteButton' onClick={() => deleteUser(value.id)}>
                                        Удалить
                                    </button>
                                </li>
                            </>)
                        })}
                    </ul>
                </div>
            </main>
            <Footer/>
            <AdminModal createFunc={createLanguage} closeModalFunc={closeModal} status={status}>
                <div className="block">
                    <div className="block row">
                        <label htmlFor='name'>Выберите язык программирования:</label>
                        <select name='name' id='name'>
                            <option value='js'>js</option>
                            <option value='py'>python</option>
                        </select>
                    </div>
                    <div className="block row">
                        <label htmlFor='courseType'>Выберите тип курса:</label>
                        <select name='courseType' id='courseType'>
                            <option value={true}>Закрытый</option>
                            <option value={false}>Открытый</option>
                        </select>
                    </div>
                    <div className="block row">
                        <label htmlFor='image'>Изображение для курса:</label>
                        <input type='file' name='image' id='image'/>
                    </div>
                </div>
            </AdminModal>
            <AdminModal id='testModal' closeModalFunc={closeTestModal} createFunc={createTest} status={testStatus}>
                <input type='text' name='testName' id='testName' placeholder='Название теста'/>
                <input type='number' min={0} max={100} name='testHighestScorePercentage'
                       id='testHighestScorePercentage' placeholder='Процент выполнения для получения 5'/>
            </AdminModal>
        </>
    )
}