import {Link} from 'react-router-dom'

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";

import './index.css'

import forum from '../../images/Header/forum.png'
import sprav from '../../images/Header/sprav.png'

import plaid1 from '../../images/Index/plaid 1.png'
import plaid2 from '../../images/Index/plaid 2.png'
import plaid3 from '../../images/Index/plaid 3.png'

export default function Index() {
    return (
        <>
            <MainBackground/>
            <Header userProfile={true}>
                <a href=""><img className="forum" src={sprav}/></a>
                <a href=""><img className="forum" src={forum}/></a>
            </Header>
            <main>
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
                    <div className="top-images">
                        <Link to={'language/1'}><img className="js" id="js" src={plaid1}/></Link>
                        <div className="spacer"></div>
                        <Link to={'language/2'}><img className="c-sharp" id="c-sharp" src={plaid2}/></Link>
                    </div>
                    <Link to={'language/3'}><img className="pyt" id="pyt" src={plaid3}/></Link>
                </div>
            </main>
            <Footer/>
        </>
    )
}