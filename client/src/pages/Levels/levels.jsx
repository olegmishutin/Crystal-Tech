import {Link} from "react-router-dom";
import './levels.css'

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AuthModal from "../../components/Modal/Modal.jsx";

import user from '../../images/Header/user.png'
import back from '../../images/Header/back.png'

import levelImg1 from '../../images/Levels/first.png'
import levelImg2 from '../../images/Levels/house2.png'
import levelImg3 from '../../images/Levels/tri.png'
import levelImg4 from '../../images/Levels/four.png'

export default function Levels() {
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
                <svg className="vector-1" width="924" height="184" viewBox="0 0 924 184" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M919.5 177.5C734.5 59.1667 292.6 -114.7 5 136.5" stroke="url(#paint0_linear_234_289)"
                          stroke-width="14"/>
                    <defs>
                        <linearGradient id="paint0_linear_234_289" x1="146.5" y1="77" x2="311.15" y2="308.585"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0"/>
                            <stop offset="0.55902" stop-color="white"/>
                            <stop offset="1" stop-color="white"/>
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="vector-2" width="230" height="762" viewBox="0 0 230 762" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M58.9995 2C-5.00047 262.833 -60.7005 778.4 228.5 754" stroke="url(#paint0_linear_234_287)"
                          stroke-width="14"/>
                    <defs>
                        <linearGradient id="paint0_linear_234_287" x1="118.081" y1="2" x2="118.081" y2="754.836"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0"/>
                            <stop offset="0.185" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.425" stop-color="white"/>
                            <stop offset="1" stop-color="white"/>
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="vector-3" width="834" height="790" viewBox="0 0 834 790" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 119C173 27.6666 557.7 -93.6001 744.5 152C931.3 397.6 756.333 676 645.5 784.5"
                          stroke="url(#paint0_linear_234_288)" stroke-width="14"/>
                    <defs>
                        <linearGradient id="paint0_linear_234_288" x1="314.5" y1="-3.50003" x2="839.5" y2="785"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0.91"/>
                            <stop offset="0.149893" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.515" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.783702" stop-color="white"/>
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="vector-4" width="690" height="832" viewBox="0 0 690 832" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M687.648 67.6608C-114.062 -193.844 -44.2627 465.975 90.8507 828.573"
                          stroke="url(#paint0_linear_235_325)"
                          stroke-width="14"/>
                    <defs>
                        <linearGradient id="paint0_linear_235_325" x1="546" y1="-206" x2="-117.5" y2="482"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="0.117875" stop-color="white"/>
                            <stop offset="0.404097" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.648871" stop-color="white" stop-opacity="0"/>
                            <stop offset="1" stop-color="white"/>
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="vector-5" width="1230" height="463" viewBox="0 0 1230 463" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.07805 104.417C150.807 6.12358 506.252 -102.931 754.203 247.199C1002.15 597.328 1372.22 428.603 1526.27 300.474"
                        stroke="url(#paint0_linear_235_357)" stroke-width="14"/>
                    <defs>
                        <linearGradient id="paint0_linear_235_357" x1="143.932" y1="-15.8938" x2="1125.58" y2="623.008"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="0.117875" stop-color="white"/>
                            <stop offset="0.365" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.58" stop-color="white" stop-opacity="0"/>
                            <stop offset="0.935" stop-color="white"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
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
                <div className="first-lvl">
                    <a className="first_house" href="/game.html"><img className="first_house"
                                                                      src={levelImg1}/></a>
                    <div className="text-left-lvl">
                        <p>
                            <b>Level 1</b><br/>
                            Самое сложное-начать<br/>
                            но разобравшись<br/>
                            обучение становится<br/>
                            в разы веселее<br/>
                            и интереснее
                        </p>
                    </div>
                </div>
                <div className="second-lvl">
                    <a href="/game.html"><img className="second-house" src={levelImg2}/></a>
                    <div className="text-sprava-lvl">
                        <p>
                            <b>Level 2</b><br/>
                            Отлично, ты справился<br/>
                            с первым уровнем!<br/>
                            Второй уровень уже <br/>
                            сложнее,но от того он<br/>
                            и более увлекательный
                        </p>
                    </div>
                </div>
                <div className="third-lvl">
                    <a href="/game.html"><img className="thirst-house" src={levelImg3}/></a>
                    <div className="text-left-lvl">
                        <p>
                            <b>Level 3</b><br/>
                            Ты огромный молодец!<br/>
                            Уже пройдена половина<br/>
                            пути, продолжай игру и<br/>
                            развивай свои скилы!
                        </p>
                    </div>
                </div>
                <div className="fourth-lvl">
                    <a href="/game.html"><img className="fourth-house" src={levelImg4}/></a>
                    <div className="text-sprava-lvl">
                        <p>
                            <b>Level 4</b><br/>
                            Опыт и дисциплина<br/>
                            важны,ещё чуть-чуть и<br/>
                            ты достигнешь цели!<br/>
                            Я горжусь тобой!
                        </p>
                    </div>
                </div>
            </main>
            <Footer/>
            <AuthModal/>
        </>
    )
}