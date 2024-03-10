import {Link} from "react-router-dom";
import {useState} from "react";
import './levels.css'

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AuthModal from "../../components/AuthModal/authModal.jsx";

import back from '../../images/Header/back.png'

import levelImg1 from '../../images/Levels/first.png'
import vector from '../../images/Levels/vector.svg'
import vectorEnd from '../../images/Levels/vector end.svg'

export default function Levels() {
    const [levels, setLevels] = useState([
        {
            id: 1,
            text: 'Самое сложное-начать но разобравшись обучение становиться в разы веселее и интереснее '
        },
        {
            id: 2,
            text: 'Отлично, ты справился с первым уровнем! Второй уровень уже сложнее, но от того он и более увлекательный '
        },
        {
            id: 3,
            text: 'Отлично, ты справился с первым уровнем! Второй уровень уже сложнее, но от того он и более увлекательный '
        },
        {
            id: 4,
            text: 'Отлично, ты справился с первым уровнем! Второй уровень уже сложнее, но от того он и более увлекательный '
        }
    ])

    function toggleDropdown() {
        var dropdown = document.querySelector('.dropdown-content');
        dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
    }

    window.onclick = function (event) {
        var dropdown = document.querySelector('.dropdown-content');
        if (!event.target.matches('.dropdown-content') && !event.target.matches('button')) {
            dropdown.style.display = 'none';
        }
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
                        <div className="circle_drop"></div>
                        <Link className="lvl-text" to={'/level/1'}>Level 1</Link>
                    </div>
                </div>
            </Header>
            <main className='levels__main'>
                <ul className='levels__main__list'>
                    {levels.map((value, index) => {
                        return (
                            <>
                                <li className={`levels__main__list__element ${index % 2 === 0 ? 'levels__main__list__element__right' : 'levels__main__list__element__left'}`}>
                                    <button>
                                        <img src={levelImg1} alt='level image'/>
                                    </button>
                                    {
                                        index === levels.length - 1 ?
                                            <img src={vectorEnd} alt='vector' className='vector'/> :
                                            <img src={vector} alt='vector' className='vector'/>
                                    }
                                    <div className="levels__main__list__element__text">
                                        <h2>Level {value.id}</h2>
                                        <p>{value.text}</p>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </main>
            <Footer/>
            <AuthModal/>
        </>
    )
}