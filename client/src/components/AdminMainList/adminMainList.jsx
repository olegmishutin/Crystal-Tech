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
                                      to={`${props.nextPage}${value.id}`}>
                                    {value.image ?
                                        <div className="admin__main__list__element__image">
                                            <img src={value.image} alt='language image'/>
                                        </div> : ''}
                                    {value.number ? <h2>Уровень {value.number}</h2> : ''}
                                    {value.name ? <h2>{value.name}</h2> : ''}
                                </Link>
                            </li>
                        </>
                    )
                })}
                <li className='admin__main__list__element'>
                    <button className='admin__main__list__element__link' onClick={openModal}>+</button>
                </li>
            </ul>
        </>
    )
}