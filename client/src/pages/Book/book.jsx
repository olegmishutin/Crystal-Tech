import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Circles from "../../components/Background/Background.jsx"

import './book.css'
import bookMaterial from '../../images/Book/material image.png'
import {Link} from "react-router-dom";

export default function Book() {
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
                            <img src={bookMaterial} alt='material image'></img>
                        </div>
                        <div className="book__main__materials__block__href">
                            <a href=''>Изучить материал</a>
                            <a href=''>Скачать файл</a>
                        </div>
                    </div>
                    <h3>Сайты с полезной информацией:</h3>
                    <ul className='book__main__materials__sites'>
                        <li>
                            <a href='https://web-valley.ru/articles/adminka-sajta'>https://web-valley.ru/articles/adminka-sajta</a>
                        </li>
                        <li>
                            <a href='https://ru.legacy.reactjs.org/'>https://ru.legacy.reactjs.org/</a>
                        </li>
                        <li>
                            <a href='https://ru.legacy.reactjs.org/'>https://ru.legacy.reactjs.org/</a>
                        </li>
                    </ul>
                </div>
                <div className="book__main__passed">
                    <h2>Level 1</h2>
                    <h3>Пройденное:</h3>
                    <ul className='book__main__passed__list'>
                        <li>
                            <p>Задание №1</p>
                        </li>
                        <li>
                            <p>Задание №2</p>
                        </li>
                        <li>
                            <p>Задание №3</p>
                        </li>
                        <li>
                            <p>Задание №4</p>
                        </li>
                        <li>
                            <p>Задание №5</p>
                        </li>
                    </ul>
                </div>
            </main>
            <Footer/>
        </>
    )
}