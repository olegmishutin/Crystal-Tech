import {Link} from "react-router-dom";
import './adminMainList.css'

export default function AdminMainList(props) {
    function openModal() {
        const modal = document.getElementById('adminModal')
        modal.className = 'adminModal adminModalActive'
    }

    return (
        <>
            <ul className='admin__main__list adminEditingFront'>
                {props.data.map((value, index) => {
                    return (
                        <>
                            <li className='admin__main__list__element'>
                                <Link className='admin__main__list__element__link'
                                      to={props.nextPage ? `${props.nextPage}${value.id}` : ''}>
                                    {value.image ?
                                        <div className="admin__main__list__element__image">
                                            <img src={value.image} alt='language image'/>
                                        </div> : ''}
                                    {value.number && !value.text ? <h2>Уровень {value.number}</h2> : ''}
                                    {value.name ? <h2>{value.name}</h2> : ''}
                                    {value.number && value.text ? <h2>Задача {value.number}</h2> : ''}
                                    {value.text && value.code ? <h2>{value.text}</h2> : ''}
                                    {value.href ? <h2>{value.href}</h2> : ''}
                                    {value.email ? <h2>{value.email}</h2> : ''}
                                </Link>
                                {props.deleteElement ?
                                    <button className='deleteButton'
                                            onClick={() => props.deleteElement(value.id)}>Удалить</button> : ''}
                            </li>
                        </>
                    )
                })}
                <li className='admin__main__list__element'>
                    <button className='admin__main__list__element__link'
                            onClick={!props.openModal ? openModal : props.openModal}>+
                    </button>
                </li>
            </ul>
        </>
    )
}