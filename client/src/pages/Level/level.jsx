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
    const [task, setTask] = useState({})

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/task/${id}`
        }).then((response) => {
            if (response.status === 200){
                setTask(response.data)
            }
        }).catch((error) => {
            if (error.response.status === 403){
                history.back()
            }
        })
    }, []);

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
                <a onClick={() => {
                    history.back()
                }}><img className="back" src={back}/></a>
                <Link to={`/level/${task.level}/book`}><img className="back" src={reference}/></Link>
            </Header>
            <main className='level__main'>
                <form className="level__main__task">
                    <div className="level__main__task__block">
                        <p>{task.text}</p>
                    </div>
                    <textarea className='level__main__task__block' name='code'
                              placeholder='Пишите сюда свой код'></textarea>
                    <input className='level__main__task__block' type='button' value='Check the code'/>
                </form>
            </main>
            <Footer/>
        </>
    )
}