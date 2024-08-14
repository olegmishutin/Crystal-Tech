import './test.css'
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import back from "../../images/Header/back.png";
import {Link, useParams} from "react-router-dom";
import {openViewPictures} from "../../components/ViewPictures/viewPictures.jsx";
import Checkbox from "../../components/Checkbox/checkbox.jsx";
import axios from "axios";
import ViewPictures from "../../components/ViewPictures/viewPictures.jsx";

export default function Test() {
    const {id} = useParams();
    const [testData, setTestData] = useState({questions: []})
    const [status, setStatus] = useState('')

    function getTest() {
        axios({
            method: 'GET',
            url: `/api/tests/${id}/`
        }).then((response) => {
            if (response.status === 200) {
                setTestData(response.data)
            } else {
                window.location.href = '/'
            }
        }).catch((error) => {
            window.location.href = '/'
        })
    }

    useEffect(() => {
        getTest()
    }, []);

    function checkTest(event) {
        const finalData = {
            answers: []
        }

        testData.questions.forEach((question) => {
            let data = {
                question: question.id,
                answer: []
            }
            question.answers.forEach((answer) => {
                if (document.getElementById(`answer-${answer.id}`).checked) {
                    data['answer'].push(answer.id)
                }
            })
            finalData['answers'].push(data)
        })

        axios({
            method: 'POST',
            url: `/api/tests/${id}/check/`,
            data: finalData,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setStatus(`Ваша оценка: ${response.data.mark}`)
            } else {
                setStatus('Что-то пошло не так')
            }
        }).catch((error) => {
            if (error.response.data.messages) {
                setStatus(error.response.data.messages)
            } else {
                setStatus('Что-то пошло не так')
            }
        })

        event.preventDefault()
    }

    return (
        <>
            <MainBackground/>
            <Header userProfile={true}>
                <Link to='/tests/'><img src={back} alt='back'/></Link>
            </Header>
            <main className='test_main'>
                <div className="questions">
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
                                                                <img src={image.file} alt='test_image' onClick={() => {
                                                                    openViewPictures(image.file)
                                                                }}/>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                            <div className="questions__list__element_flex">
                                                <h1>{question.text}</h1>
                                            </div>
                                            <ul className='questions__list__element__answers'>
                                                {
                                                    question.have_multiple_choices ?
                                                        question.answers.map((answer, index) => {
                                                            return (
                                                                <>
                                                                    <li className='questions__list__element__answers__answer'>
                                                                        <Checkbox id={`answer-${answer.id}`}
                                                                                  name={`question-${question.id}`}
                                                                                  text={answer.text}/>
                                                                    </li>
                                                                </>
                                                            )
                                                        }) :
                                                        question.answers.map((answer, index) => {
                                                            return (
                                                                <>
                                                                    <li className='questions__list__element__answers__answer'>
                                                                        <Checkbox id={`answer-${answer.id}`}
                                                                                  name={`question-${question.id}`}
                                                                                  radio={true}
                                                                                  text={answer.text}/>
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
                    <button className='questions__check' onClick={checkTest}>Проверить</button>
                    <p>{status}</p>
                </div>
            </main>
            <Footer/>
            <ViewPictures/>
        </>
    )
}