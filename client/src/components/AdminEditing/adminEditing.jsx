import './adminEditing.css'

export default function AdminEditing(props) {
    return (
        <div className='adminEditing adminEditingFront'>
            {props.children}
            <div className="button__box">
                {props.editFunc ?
                    <button className='editButton' type='button' onClick={props.editFunc}>Edit</button> : ''}
                {props.createFunc ?
                    <button className='editButton' type='button' onClick={props.createFunc}>Create</button> : ''}
                {props.deleteFunc ?
                    <button className='deleteButton' type='button' onClick={props.deleteFunc}>Delete</button> : ''}
            </div>
            <p>{props.status}</p>
        </div>
    )
}