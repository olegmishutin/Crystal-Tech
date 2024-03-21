import './adminModal.css'

export default function AdminModal(props) {
    return (
        <div className='adminModal' id={!props.id ? 'adminModal' : props.id}>
            <div className="adminModal__block">
                {props.children}
                <div className="button__box">
                    {props.createFunc ?
                        <button className='createButton' type='button' onClick={props.createFunc}>Create</button> : ''}
                    <button className='cancelButton' type='button' onClick={props.closeModalFunc}>Cancel</button>
                </div>
                <p className='status'>{props.status}</p>
            </div>
        </div>
    )
}