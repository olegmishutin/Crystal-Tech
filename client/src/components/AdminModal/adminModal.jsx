import './adminModal.css'

export default function AdminModal({children}){
    return (
        <div className='adminModal' id='adminModal'>
            <div className="adminModal__block">
                {children}
            </div>
        </div>
    )
}