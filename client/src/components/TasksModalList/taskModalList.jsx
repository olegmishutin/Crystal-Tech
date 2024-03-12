import {Link} from "react-router-dom";
import {useEffect} from "react";
import './tasksModalList.css'

export default function TaskModalList(props) {
    useEffect(() => {
        const taskModal = document.getElementById('task__modal__list')
        taskModal.onclick = function () {
            taskModal.style.display = 'none'
        }
    }, []);

    return (
        <>
            <div className="task__modal__list" id='task__modal__list'>
                <div className="task__modal__list__window">
                    <h2>Level {props.data.number}</h2>
                    <ul>
                        {props.data.tasks.map((value, index) => {
                            return (
                                <>
                                    <li>
                                        <Link className='link' to={`/language/${props.data.language}/task/${value.id}`}>Задание
                                            №{value.number}</Link>
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}