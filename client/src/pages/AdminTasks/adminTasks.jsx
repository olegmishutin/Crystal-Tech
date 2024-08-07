import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import './adminTasks.css'

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import AdminModal from "../../components/AdminModal/adminModal.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminMainList from "../../components/AdminMainList/adminMainList.jsx";
import axios from "axios";
import back from "../../images/Header/back.png";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function AdminTasks() {
    let {id} = useParams();
    const [testCasesSet, setTestCasesSet] = useState([1])
    const [levelStatus, setLevelStatus] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [level, setLevel] = useState({})
    const [tasks, setTasks] = useState([])
    const [materialStatus, setMaterialStatus] = useState('')
    const [siteStatus, setSiteStatus] = useState('')

    useEffect(() => {
        getLevelAndTasks()
    }, []);

    function getLevelAndTasks() {
        axios({
            method: 'GET',
            url: `/api/admin/levels/${id}/`
        }).then((response) => {
            setTasks(response.data.tasks)
            setLevel(response.data)
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/'
            }
        })
    }

    function editLevel(event) {
        setLevelStatus('')
        const number = document.getElementById('levelNumber').value
        const description = document.getElementById('description').value
        const image = document.getElementById('image').files[0]

        const formData = new FormData
        formData.append('number', number)
        formData.append('description', description)

        if (image) {
            formData.append('image', image)
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/levels/${id}/`,
            data: formData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setLevel(response.data)
                setLevelStatus('Изменения применены!')
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

    function deleteLevel(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/levels/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                window.location.href = `/admin/language/${level.language}`
            } else {
                setLevelStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setLevelStatus('Что то пошло не так :(')
        })

        event.preventDefault()
    }

    function createTask(event) {
        const data = {
            number: document.getElementById('taskNumber').value,
            text: document.getElementById('taskText').value,
            time: document.getElementById('taskTime').value,
            level: id,
            testCases: []
        }

        testCasesSet.forEach((value) => {
            data.testCases.push({
                code: document.getElementById(`code-${value}`).value,
                text: document.getElementById(`text-${value}`).value
            })
        })

        axios({
            method: 'POST',
            url: '/api/admin/tasks/',
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getLevelAndTasks()
                closeModal()
                setTestCasesSet([1])
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

    function getMaterialFormData() {
        const material = {
            name: document.getElementById('materialName').value,
            file: document.getElementById('materialFile').files[0],
            level: id,
        }

        const formData = new FormData
        formData.append('name', material.name)
        if (material.file) {
            formData.append('file', material.file)
        }
        formData.append('level', material.level)
        return formData
    }

    function createMaterial(event) {
        const formData = getMaterialFormData()

        axios({
            method: 'POST',
            url: '/api/admin/materials/',
            data: formData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getLevelAndTasks()
            } else {
                setMaterialStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setMaterialStatus('Введены недействительные данные, проверьте все ли поля заполнены!')
            } else {
                setMaterialStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function editMaterial(event) {
        const formData = getMaterialFormData()

        axios({
            method: 'PATCH',
            url: `/api/admin/materials/${level.material.id}/`,
            data: formData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                getLevelAndTasks()
                document.getElementById('materialFileHref').setAttribute('href', response.data.file)
                setMaterialStatus('Изменения применены!')
            } else {
                setMaterialStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setMaterialStatus('Введены недействительные данные, проверьте все ли поля заполнены!')
            } else {
                setMaterialStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteMaterial(event) {
        axios({
            method: 'DELETE',
            url: `/api/admin/materials/${level.material.id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                getLevelAndTasks()
            } else {
                setMaterialStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            setMaterialStatus('Что то пошло не так :(')
        })

        event.preventDefault()
    }

    function createMaterialSite(event) {
        axios({
            method: 'POST',
            url: '/api/admin/sites/',
            data: {
                href: document.getElementById('siteHref').value,
                material: level.material.id
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getLevelAndTasks()
                closeSitesModal()
            } else {
                setSiteStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setSiteStatus('Введены недействительные данные, проверьте все ли поля заполнены!')
            } else {
                setSiteStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function closeModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal'
        setTestCasesSet([1])
    }

    function openSitesModal() {
        document.getElementById('sitesModal').className = 'adminModal adminModalActive'
    }

    function closeSitesModal() {
        document.getElementById('sitesModal').className = 'adminModal'
    }

    function addTestCase() {
        const value = testCasesSet.length + 1
        setTestCasesSet([...testCasesSet, value])
    }

    return (
        <>
            <MainBackground/>
            <Header>
                <Link to={`/admin/language/${level.language}`}><img className="back" src={back}/></Link>
            </Header>
            <main className='admin__tasks__main'>
                <div className="admin__tasks__main__editing">
                    <AdminEditing editFunc={editLevel} deleteFunc={deleteLevel} status={levelStatus}>
                        <input type='number' name='levelNumber' id='levelNumber' placeholder='Номер уровня' min='0'
                               defaultValue={level.number}/>
                        <textarea placeholder='Краткое описание' name='description' id='description'
                                  defaultValue={level.description}></textarea>
                        <div className="block">
                            <div className="image">
                                <img src={level.image} alt='language icon'/>
                            </div>
                            <input type='file' name='image' id='image'/>
                        </div>
                    </AdminEditing>
                    <AdminEditing createFunc={!level.material ? createMaterial : ''}
                                  editFunc={level.material ? editMaterial : ''}
                                  deleteFunc={level.material ? deleteMaterial : ''}
                                  status={materialStatus}>
                        <input type='text' name='materialName' id='materialName' placeholder='Имя материлала'
                               defaultValue={level.material ? level.material.name : ''}/>
                        {level.material ? <a href={level.material.file} id='materialFileHref'>Файл</a> : ''}
                        <div className="block">
                            <input type='file' name='materialFile' id='materialFile'/>
                        </div>
                    </AdminEditing>
                </div>
                <AdminMainList data={tasks} nextPage={`/admin/task/`} name='Задачи'></AdminMainList>
                {level.material ?
                    <AdminMainList data={level.material.sites} nextPage={`/admin/level/${id}/site/`}
                                   openModal={openSitesModal} name='Сайты с материалами'></AdminMainList> : ''}
            </main>
            <Footer/>
            <AdminModal createFunc={createTask} closeModalFunc={closeModal} status={taskStatus}>
                <input type='number' name='taskNumber' id='taskNumber' placeholder='Номер задания' min='0'/>
                <input type='number' name='taskTime' id='taskTime' placeholder='Время на выполнение (в секундах)'
                       min='0'/>
                <textarea placeholder='Опишите задачу' name='taskText' id='taskText'></textarea>
                <h2>Тест кейсы</h2>
                <ul>
                    {
                        testCasesSet.map((value, index) => {
                            return (
                                <>
                                    <li>
                                        <CodeEditor style={{overflow: "auto"}} className='code__textarea'
                                                    data-color-mode='light' language={level.language_name} padding={10}
                                                    placeholder='Код тест кейса' name={`code-${value}`}
                                                    id={`code-${value}`} onKeyDown={(e) => {
                                            if (e.keyCode === 9) {
                                                e.preventDefault();
                                                e.target.setRangeText('\t', e.target.selectionStart, e.target.selectionStart, 'end')
                                                return false;
                                            }
                                        }}/>
                                        <input type='text' name={`text-${value}`} id={`text-${value}`}
                                               placeholder='Краткое содержание (getSum(1, 2))'/>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
                <div className="button__box">
                    <button onClick={addTestCase}>Добавить тест-кейс</button>
                </div>
            </AdminModal>
            <AdminModal createFunc={createMaterialSite} closeModalFunc={closeSitesModal} status={siteStatus}
                        id='sitesModal'>
                <input type='text' name='siteHref' id='siteHref' placeholder='Ссылка на источник'/>
            </AdminModal>
        </>
    )
}