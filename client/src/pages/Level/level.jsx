import './level.css'
import {Link} from "react-router-dom";

import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Circles from "../../components/Background/Background.jsx"

import back from '../../images/Header/back.png'
import reference from '../../images/Levels/reference.png'


export default function Level() {
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
                <Link to={'/language/1'}><img className="back" src={back}/></Link>
                <Link to={'/book/'}><img className="back" src={reference}/></Link>
            </Header>
            <main className='level__main'>
                <form className="level__main__task">
                    <div className="level__main__task__block">
                        <p>Вам необходимо создать функцию, которая будет работать с объектами. Назовите ее
                            handleObject.</p>
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