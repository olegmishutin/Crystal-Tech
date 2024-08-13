import './tests.css'
import {Link} from "react-router-dom";

import Header from "../../components/Header/Header.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import back from '../../images/Header/back.png'

export default function Tests() {
    return (
        <>
            <MainBackground/>
            <Header userProfile={true}>
                <Link to='/'><img src={back} alt='back'/></Link>
            </Header>
            <main className='tests_main'></main>
            <Footer/>
        </>
    )
}