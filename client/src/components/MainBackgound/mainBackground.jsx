import Circles from "../Background/Background.jsx";
import './mainBackground.css'

export default function MainBackground(){
    return (
        <Circles>
            <div className="index-circle"></div>
            <div className="index-circle"></div>
            <div className="index-circle"></div>
            <div className="index-circle"></div>
        </Circles>
    )
}