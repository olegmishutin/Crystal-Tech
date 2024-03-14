import './level.css'
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Circles from "../../components/Background/Background.jsx"

import back from '../../images/Header/back.png'
import reference from '../../images/Levels/reference.png'
import axios from "axios";


export default function Level() {
    let {id} = useParams()
    let {languageId} = useParams()
    const [task, setTask] = useState({testCases: []})
    const [status, setStatus] = useState('')

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/task/${id}`
        }).then((response) => {
            if (response.status === 200) {
                setTask(response.data)
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

                    if (response.data.level_is_passed){
                        setStatus('Поздравляю, вы закончили этот уровень, двигайся к другому!')

                        if (response.data.language_is_passed){
                            setStatus('Вы прошли весь курс по этому ЯП-у!')
                        }
                    }
                }
            } else {
                setStatus('Что то пошло не так :(')
            }
        }).catch((error) => {
            if (error.response.status === 400){
                setStatus('Обнаружены ошибки в коде, проверьте что названия функций и классов совпадают с теми, которые в задании!')
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
                <Link to={`/language/${languageId}`}><img className="back" src={back}/></Link>
                <Link to={`/language/${languageId}/task/${id}/level/${task.level}/book`}><img className="back"
                                                                                              src={reference}/></Link>
            </Header>
            <main className='level__main'>
                <form className="level__main__task">
                    <div className="level__main__task__block">
                        <p>{task.text}</p>
                    </div>
                    <textarea className='level__main__task__block' name='code' id='textboxCode'
                              placeholder='Пишите сюда свой код'></textarea>
                    <input className='level__main__task__block level__main__button' type='button' onClick={checkCode}
                           value='Check the code'/>
                </form>
                <div className="level__main__right">
                    <div className="level__main__right__game">
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