import {useState, useEffect} from "react";

import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Circles from "../../components/Background/Background.jsx"

import './book.css'
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Book() {
    let {id} = useParams()
    const [info, setInfo] = useState({tasks: [], material: {file: '', sites: []}})

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/level/${id}`
        }).then((response) => {
            if (response.status === 200) {
                setInfo(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <>
            <Circles>
                <div className="book__circle"></div>
                <div className="book__circle"></div>
                <div className="book__circle"></div>
                <div className="book__circle"></div>
                <div className="book__circle"></div>
                <div className="book__circle"></div>
            </Circles>
            <Header/>
            <main className='book__main'>
                <div className="book__main__materials">
                    <h2>Материалы для изучения:</h2>
                    <div className="book__main__materials__block">
                        <div className="book__main__materials__block__image">
                            {info.material ? <h4>{info.material.name}</h4> : ''}
                        </div>
                        <div className="book__main__materials__block__href">
                            <a href={info.material ? info.material.file : ''}>Изучить материал</a>
                            <a href={`/api/get-material/${info.material ? info.material.id: ''}`}>Скачать файл</a>
                        </div>
                    </div>
                    <h3>Сайты с полезной информацией:</h3>
                    <ul className='book__main__materials__sites'>
                        {info.material ? info.material.sites.map((value, index) => {
                            return (
                                <>
                                    <li>
                                        <a href={value.href}>{value.href}</a>
                                    </li>
                                </>
                            )
                        }) : ''}
                    </ul>
                </div>
                <div className="book__main__passed">
                    <h2>Level 1</h2>
                    <h3>Пройденное:</h3>
                    <ul className='book__main__passed__list'>
                        {info.tasks.map((value, index) => {
                            return (
                                <>
                                    {value.is_completed ? <li>
                                        <p>Задание {value.number}</p>
                                    </li> : ''}
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