import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import './levels.css'

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AuthModal from "../../components/AuthModal/authModal.jsx";
import TaskModalList from "../../components/TasksModalList/taskModalList.jsx";

import back from '../../images/Header/back.png'

import vector from '../../images/Levels/vector.svg'
import vectorEnd from '../../images/Levels/vector end.svg'
import axios from "axios";

export default function Levels() {
    let {id} = useParams()
    const [levels, setLevels] = useState([])
    const [level, setLevel] = useState({number: '', tasks: []})

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/language/${id}`
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.levels.length > 0) {
                    setLevels(response.data.levels)
                } else {
                    window.location.href = '/'
                }
            }
        }).catch((error) => {
            window.location.href = '/'
        })
    }, []);

    function toggleDropdown() {
        var dropdown = document.querySelector('.dropdown-content');
        dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
    }

    function tasksModalOpen() {
        const tasks = document.getElementById('task__modal__list')
        tasks.style.display = 'flex'
    }

    return (
        <>
            <div className="level-circle-container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <Header userProfile={true}>
                <Link to={'/'}><img className="back" src={back}/></Link>
                <div id="level-dropdown">
                    <button onClick={toggleDropdown}></button>
                    <div className="dropdown-content">
                        {levels.map((value, index) => {
                            return (
                                <>
                                    <a className="lvl-text" onClick={() => {
                                        setLevel(value);
                                        tasksModalOpen();
                                        toggleDropdown()
                                    }}>Level {value.number}</a>
                                </>
                            )
                        })}
                    </div>
                </div>
            </Header>
            <main className='levels__main'>
                <ul className='levels__main__list'>
                    {levels.map((value, index) => {
                        console.log(value)
                        return (
                            <>
                                <li className={`levels__main__list__element ${index % 2 === 0 ? 'levels__main__list__element__right' : 'levels__main__list__element__left'}`}>
                                    <button onClick={() => {
                                        setLevel(value);
                                        tasksModalOpen()
                                    }}>
                                        <img src={value.image} alt='level image'/>
                                    </button>
                                    {
                                        index === levels.length - 1 ?
                                            <img src={vectorEnd} alt='vector' className='vector'/> :
                                            <img src={vector} alt='vector' className='vector'/>
                                    }
                                    <div className="levels__main__list__element__text">
                                        <h2>Level {value.number}</h2>
                                        <p>{value.description}</p>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </main>
            <Footer/>
            <AuthModal/>
            <TaskModalList data={level}/>
        </>
    )
}