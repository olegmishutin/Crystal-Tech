import './tests.css'
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header.jsx";
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import back from '../../images/Header/back.png'

export default function Tests() {
    const [tests, setTests] = useState([])

    function getTests() {
        axios({
            method: 'GET',
            url: '/api/tests/'
        }).then((response) => {
            if (response.status === 200) {
                setTests(response.data)
            } else {
                window.location.href = '/'
            }
        }).catch((error) => {
            window.location.href = '/'
        })
    }

    useEffect(() => {
        getTests()
    }, []);

    return (
        <>
            <MainBackground/>
            <Header userProfile={true}>
                <Link to='/'><img src={back} alt='back'/></Link>
            </Header>
            <main className='tests_main'>
                <ul className='tests_main__list'>
                    {
                        tests.map((test, index) => {
                            return (
                                <>
                                    <li className='tests_main__list__element'>
                                        <Link to={`/tests/${test.id}`} className='tests_main__list__element__box'>
                                            <h1>{test.name}</h1>
                                            <p>Оценка: {test.mark}</p>
                                        </Link>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </main>
            <Footer/>
        </>
    )
}