import {Link} from 'react-router-dom'
import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";

import './index.css'
import axios from "axios";
import test from "../../images/Header/sprav.png";

export default function Index() {
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/languages'
        }).then((response) => {
            if (response.status === 200) {
                setLanguages(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <MainBackground/>
            <Header userProfile={true}>
                <Link to='/tests/'><img className="back" src={test} alt='test'/></Link>
            </Header>
            <main className='index__main'>
                <div className="main-text">
                    <div className="text-zagolovok">
                        <p>
                            <b>Дорогой друг, мы рады </b><br/>
                            видеть тебя здесь!
                        </p>
                    </div>
                    <div className="text-information">
                        <p>
                            Наша команда разработчиков<br/>
                            создала данный сайт для того,<br/>
                            чтобы тебе было легче учить<br/>
                            языки программирования.
                        </p>
                    </div>
                    <div className="text-information">
                        <p>
                            Обучение будет проходить в<br/>
                            игровом формате, для того<br/>
                            чтобы начать игру:
                        </p>
                    </div>
                    <div className="text-information">
                        <p>
                            Скорее жми на любой<br/>
                            язык программирования<br/>
                            который привлек тебя<br/>
                            больше всего.
                        </p>
                    </div>
                </div>
                <div className="side-images">
                    {languages.map((value, index) => {
                        return (
                            <>
                                <Link to={`language/${value.id}`}><img className={value.name} src={value.image}/></Link>
                            </>
                        )
                    })}
                </div>
            </main>
            <Footer/>
        </>
    )
}