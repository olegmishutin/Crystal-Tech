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
    const [users, setUsers] = useState([])
    const [usersStatus, setUsersStatus] = useState('')
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
    }, []);

    function editLanguage(event) {
        setLanguageStatus('')
        const language = document.getElementById('name').value
        const image = document.getElementById('languageImage').files[0]
        const courseType = document.getElementById('courseType').value

        const formData = new FormData
        formData.append('name', language)
        formData.append('is_closed', courseType)

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
                window.location.href = '/admin/'
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

    function addAcceptedUser(userId) {
        axios({
            method: 'POST',
            url: '/api/admin/all-users',
            data: {
                userId: userId,
                languageId: id,
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setUsersStatus('Пользователь добавлен!')
                getLanguageLevels()
            } else {
                setUsersStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setUsersStatus('Что то пошло не так :(')
        })
    }

    function removeAcceptedUser(userId) {
        axios({
            method: 'DELETE',
            url: '/api/admin/remove-accepted-user',
            data: {
                userId: userId,
                languageId: id,
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                getLanguageLevels()
            } else {
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function searchUser(event){
        axios({
            method: 'POST',
            url: '/api/admin/all-users',
            data: {
                is_search: true,
                value: document.getElementById('userEmailOrGroup').value
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200){
                setUsers(response.data)
            } else {
                console.log(response)
            }
        }).catch((error) => {
            console.log(error)
        })

        event.preventDefault()
    }

    function closeModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal'
    }

    function OpenAddAcceptedUserModal() {
        document.getElementById('add-accepted-user-modal').className = 'adminModal adminModalActive'
    }

    function CloseAddAcceptedUserModal() {
        document.getElementById('add-accepted-user-modal').className = 'adminModal'
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
                        <select name='name' id='name' defaultValue={language.name}>
                            <option value='js' selected={language.name === 'js'}>js</option>
                            <option value='py' selected={language.name === 'py'}>python</option>
                        </select>
                    </div>
                    <div className="block">
                        <label htmlFor='courseType'>Текущий тип
                            курса: {language.is_closed ? 'закрытый' : 'открытый'}</label>
                        <select name='courseType' id='courseType'>
                            <option value={true} selected={language.is_closed === true}>Закрытый</option>
                            <option value={false} selected={language.is_closed === false}>Открытый</option>
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
                {language.is_closed ?
                    <AdminMainList data={language.accepted_users} deleteElement={removeAcceptedUser}
                                   openModal={OpenAddAcceptedUserModal}/> : ''}
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
            <AdminModal id='add-accepted-user-modal' status={usersStatus} closeModalFunc={CloseAddAcceptedUserModal}>
                <div className="block flexBlock">
                    <input type='text' name='userEmailOrGroup' id='userEmailOrGroup'
                           placeholder='Поиск по email, имени или группе'/>
                    <div className="button__box">
                        <button onClick={searchUser}>Поиск</button>
                    </div>
                </div>
                <ul className='big__list'>
                    {users.map((value, index) => {
                        return (<>
                            <li className='row__list__element'>
                                <h3>{value.email}</h3>
                                <p>{value.name}</p>
                                <p>{value.group}</p>
                                <button onClick={() => addAcceptedUser(value.id)}>Добавить</button>
                            </li>
                        </>)
                    })}
                </ul>
            </AdminModal>
        </>
    )
}