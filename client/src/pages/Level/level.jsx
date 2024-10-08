import './level.css'
import {useState, useEffect, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';

import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Circles from "../../components/Background/Background.jsx"

import back from '../../images/Header/back.png'
import reference from '../../images/Levels/reference.png'
import axios from "axios";
import Countdown from "react-countdown";


export default function Level() {
    let {id} = useParams()
    let {languageId} = useParams()
    const [task, setTask] = useState({testCases: [], time: 1000})
    const [status, setStatus] = useState('')

    const [timerDate, setTimerDate] = useState(Date.now() + task.time * 1000)
    const timerRef = useRef();
    const [codeTextbox, setCodeTextbox] = useState('')

    const handleStart = (e) => {
        setTimerDate(Date.now() + task.time * 1000)
        setStatus('')
        document.getElementById('textboxCode').readOnly = false
        timerRef.current.start();
        document.getElementById('checkCodeButton').style.display = 'block'
        document.getElementById('startCountdownButton').style.display = 'none'
    }

    const handleStop = (e) => {
        timerRef.current.stop();
        document.getElementById('textboxCode').readOnly = true
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/task/${id}`
        }).then((response) => {
            if (response.status === 200) {
                setTask(response.data)
                setTimerDate(Date.now() + response.data.time * 1000)
            } else {
                window.location.href = `/language/${languageId}`
            }
        }).catch((error) => {
            window.location.href = `/language/${languageId}`
        })

        const inputField = document.getElementById('textboxCode'); // get textarea object
        inputField.onkeydown = function (e) {
            if (e.keyCode === 9) {
                this.setRangeText('\t', this.selectionStart, this.selectionStart, 'end')
                return false;
            }
        };
    }, []);

    function checkCode(event) {
        axios({
            method: 'POST',
            url: '/api/check-code',
            data: {
                language: languageId,
                code: document.getElementById('textboxCode').value,
                task: id
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                setTask(response.data)
                setStatus('')
                if (response.data.task_is_passed) {
                    setStatus('Задание пройдено, возвращайтесь в меню и преступайте к другому!')

                    if (response.data.level_is_passed) {
                        setStatus('Поздравляю, вы закончили этот уровень, двигайся к другому!')

                        if (response.data.language_is_passed) {
                            setStatus('Вы прошли весь курс по этому ЯП-у!')
                        }
                    }
                }
                handleStop()
            } else {
                setStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                if (error.response.data.message === 'Bad code data') {
                    setStatus('Обнаружены ошибки в коде, проверьте что названия функций и классов совпадают с теми, которые в задании!')
                }
                if (error.response.data.message === 'Bad code result') {
                    setTask(error.response.data)
                    setStatus('Результаты кода оказались неправильными')
                }
            } else {
                setStatus('Что то пошло не так :(')
            }
        })

        event.preventDefault()
    }

    return (
        <>
            <Circles>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </Circles>
            <Header userProfile={true}>
                <Link to={`/language/${languageId}`}><img className="back" src={back} alt='back'/></Link>
                <Link to={`/language/${languageId}/task/${id}/level/${task.level}/book`}><img className="back"
                                                                                              src={reference}
                                                                                              alt='reference'/></Link>
            </Header>
            <main className='level__main'>
                <form className="level__main__task">
                    <div className="level__main__task__block">
                        <p>{task.text}</p>
                    </div>
                    <CodeEditor className='level__main__task__block textarea' style={{overflow: "auto"}}
                                name='textboxCode' id='textboxCode' readOnly={true} language={task.language_name}
                                value={codeTextbox} data-color-mode='dark' placeholder='Пишите сюда свой код'
                                padding={15} onChange={(evn) => setCodeTextbox(evn.target.value)}/>
                    <input className='level__main__task__block level__main__button level__submit__button' type='button'
                           onClick={checkCode} value='Check the code' id='checkCodeButton'/>
                    <button type='button' className='level__main__task__block level__main__button'
                            id='startCountdownButton'
                            onClick={handleStart}>Start!
                    </button>
                </form>
                <div className="level__main__right">
                    <div className="level__main__right__game">
                        <Countdown
                            date={timerDate}
                            ref={timerRef}
                            autoStart={false}
                            renderer={({hours, minutes, seconds, completed}) => {
                                if (completed) {
                                    setCodeTextbox('')
                                    document.getElementById('checkCodeButton').style.display = 'none'
                                    document.getElementById('startCountdownButton').style.display = 'block'
                                    document.getElementById('textboxCode').readOnly = true
                                    // Render a completed state
                                    return <h1 className='countdown__text'>Время вышло!</h1>;
                                } else {
                                    // Render a countdown
                                    return <h1
                                        className="countdown__text m-0 font-weight-bold">{hours}:{minutes}:{seconds}</h1>;
                                }
                            }}
                        />
                        <h2>{status}</h2>
                    </div>
                    <ul className='level__main__right__testcases'>
                        {task.testCases.map((value, index) => {
                            return (
                                <>
                                    <li className={value.is_passed ? 'passeTestCase' : 'notPasseTestCase'}>
                                        <p>{value.text}</p>
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </div>
            </main>
            <Footer/>
        </>
    )
}