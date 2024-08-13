import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import AdminEditing from "../../components/AdminEditing/adminEditing.jsx";
import Checkbox from "../../components/Checkbox/checkbox.jsx";

import './adminTest.css'
import back from "../../images/Header/back.png";
import axios from "axios";
import AdminModal from "../../components/AdminModal/adminModal.jsx";

export default function AdminTest() {
    const {id} = useParams();
    const [testData, setTestData] = useState({questions: []})
    const [testStatus, setTestStatus] = useState('')
    const [questionStatus, setQuestionStatus] = useState('')
    const [currentQuestionId, setCurrentQuestionId] = useState()
    const [answerStatus, setAnswerStatus] = useState('')
    const [globalEditinStatus, setGlobalEditinStatus] = useState('')

    function getTest() {
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
    }

    useEffect(() => {
        getTest()
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

        event.preventDefault()
    }

    function createQuestion(event) {
        const data = {
            text: document.getElementById('questionText').value,
            test: id
        }

        axios({
            method: 'POST',
            url: '/api/admin/questions/',
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getTest()
            } else {
                setQuestionStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setQuestionStatus('Введены недействительные данные, проверьте все ли поля заполнены')
            } else {
                setQuestionStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteQuestion(id) {
        axios({
            method: 'DELETE',
            url: `/api/admin/questions/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                getTest()
            }
        }).catch((error) => {
            console.log(error)
        })

        id.preventDefault()
    }

    function changeQuestion(id) {
        const data = {
            text: document.getElementById(`question_${id}_text`).value
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/questions/${id}/`,
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setGlobalEditinStatus('Вопрос успешно изменен')
            } else {
                setGlobalEditinStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setAnswerStatus('Введены недействительные данные, проверьте все ли поля заполнены')
            } else {
                setAnswerStatus('Что то пошло не так :(')
            }
        })

        id.preventDefault()
    }

    function loadQuestionImage(id) {
        const data = {
            question: id,
            file: document.getElementById(`question_${id}_file`).files[0]
        }

        if (data["file"]) {
            const formData = new FormData()

            formData.append('question', data['question'])
            formData.append('file', data['file'])

            axios({
                method: 'POST',
                url: '/api/admin/question_images/',
                data: formData,
                xsrfCookieName: 'csrftoken',
                xsrfHeaderName: 'X-CSRFTOKEN',
                withCredentials: true
            }).then((response) => {
                if (response.status === 201) {
                    getTest()
                }
            }).catch((error) => {
                console.log(error)
            })

            id.preventDefault()
        }
    }

    function deleteQuestionImage(id) {
        axios({
            method: 'DELETE',
            url: `/api/admin/question_images/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                getTest()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function createAnswer(event) {
        const data = {
            text: document.getElementById('asnwerText').value,
            is_correct: false,
            question: currentQuestionId
        }

        axios({
            method: 'POST',
            url: '/api/admin/answers/',
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                getTest()
            } else {
                setAnswerStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setAnswerStatus('Введены недействительные данные, проверьте все ли поля заполнены')
            } else {
                setAnswerStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    function deleteAnswer(id) {
        axios({
            method: 'DELETE',
            url: `/api/admin/answers/${id}/`,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 204) {
                getTest()
            }
        }).catch((error) => {
            console.log(error)
        })

        id.preventDefault()
    }

    function changeAnswer(id) {
        const data = {
            is_correct: document.getElementById(`answer-${id}`).checked,
            text: document.getElementById(`answer_${id}_text`).value
        }

        axios({
            method: 'PATCH',
            url: `/api/admin/answers/${id}/`,
            data: data,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setGlobalEditinStatus('Ответ успешно изменен')
            } else {
                setGlobalEditinStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                setAnswerStatus('Введены недействительные данные, проверьте все ли поля заполнены')
            } else {
                setAnswerStatus('Что то пошло не так :(')
            }
        })

        id.preventDefault()
    }

    function openQuestionModal() {
        const modal = document.getElementById('createQuestion')
        modal.className = 'adminModal adminModalActive'
    }

    function closeQuestionModal() {
        const modal = document.getElementById('createQuestion')
        modal.className = 'adminModal'
    }

    function openAnswerModal(question_id) {
        const modal = document.getElementById('createAnswer')
        modal.className = 'adminModal adminModalActive'
        setCurrentQuestionId(question_id)
    }

    function closeAnswerModal() {
        const modal = document.getElementById('createAnswer')
        modal.className = 'adminModal'
        setCurrentQuestionId(undefined)
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
                <div className="questions">
                    <div className="questions__list__element_flex">
                        <button className='questions__add' onClick={openQuestionModal}>Добавить</button>
                        <p className='questions__list__element__text'>{globalEditinStatus}</p>
                    </div>
                    <ul className='questions__list'>
                        {
                            testData.questions.map((question, index) => {
                                return (
                                    <>
                                        <li className='questions__list__element'>
                                            {
                                                question.images.map((image, index) => {
                                                    return (
                                                        <>
                                                            <div className="questions__list__element__image">
                                                                <img src={image.file} alt='test_image'/>
                                                                <button className='delete_image_button' onClick={() => {
                                                                    deleteQuestionImage(image.id)
                                                                }}>Удалить
                                                                </button>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                            <div className="questions__list__element_flex">
                                                <input type='text' defaultValue={question.text}
                                                       className='question_text_input text_input'
                                                       id={`question_${question.id}_text`}/>
                                                <input type='file' id={`question_${question.id}_file`}
                                                       className='question_file' accept='image/*' onChange={() => {
                                                    loadQuestionImage(question.id)
                                                }}/>
                                                <label htmlFor={`question_${question.id}_file`}
                                                       className='question_file_label'>Изображение</label>
                                                <button className='answer__add' onClick={() => {
                                                    openAnswerModal(question.id)
                                                }}>+
                                                </button>
                                                <button className='change_button' onClick={() => {
                                                    changeQuestion(question.id)
                                                }}>+/-
                                                </button>
                                                <button className='questions__remove' onClick={() => {
                                                    deleteQuestion(question.id)
                                                }}>-
                                                </button>
                                            </div>
                                            <ul className='questions__list__element__answers'>
                                                {
                                                    question.answers.map((answer, index) => {
                                                        return (
                                                            <>
                                                                <li className='questions__list__element__answers__answer'>
                                                                    <Checkbox id={`answer-${answer.id}`}
                                                                              name='answer-1'
                                                                              checked={answer.is_correct}
                                                                              onChange={() => {
                                                                                  changeAnswer(answer.id)
                                                                              }}/>
                                                                    <input type='text' defaultValue={answer.text}
                                                                           className='answer_text_input text_input'
                                                                           id={`answer_${answer.id}_text`}/>
                                                                    <button className='change_button' onClick={() => {
                                                                        changeAnswer(answer.id)
                                                                    }}>+/-
                                                                    </button>
                                                                    <button className='questions__remove'
                                                                            onClick={() => {
                                                                                deleteAnswer(answer.id)
                                                                            }}>-
                                                                    </button>
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </main>
            <Footer/>
            <AdminModal id='createQuestion' createFunc={createQuestion} closeModalFunc={closeQuestionModal}
                        status={questionStatus}>
                <div className="block">
                    <input type='text' className='textbox' name='questionText' id='questionText' placeholder='Вопрос'/>
                </div>
            </AdminModal>
            <AdminModal id='createAnswer' createFunc={createAnswer} closeModalFunc={closeAnswerModal}
                        status={answerStatus}>
                <div className="block">
                    <input type='text' className='textbox' name='answerText' id='asnwerText' placeholder='Ответ'/>
                </div>
            </AdminModal>
        </>
    )
}