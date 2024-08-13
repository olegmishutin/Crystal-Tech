import './checkbox.css'

export default function Checkbox(props) {
    return (
        <>
            <div className="checkbox_box">
                <input type={props.radio ? 'radio' : 'checkbox'}
                       className={props.radio ? 'radio' : 'check'} id={props.id}
                       name={props.name} defaultChecked={props.checked}
                       onChange={props.onChange ? props.onChange : null}/>
                <label htmlFor={props.id}>{props.text}</label>
            </div>
        </>
    )
}