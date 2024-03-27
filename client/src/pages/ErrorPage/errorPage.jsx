import './errorPage.css'
import {useRouteError} from "react-router-dom"
import MainBackground from "../../components/MainBackgound/mainBackground.jsx";

export default function ErrorPage() {
    const error = useRouteError()

    return (<>
        <MainBackground/>
        <main className='error__page'>
            <div className="error__page__block">
                <h1>{error.status}</h1>
                <p>Тут такая ошибочка, так что давай назад</p>
                <button onClick={() => history.back()}>Назад</button>
            </div>
        </main>
    </>)
}