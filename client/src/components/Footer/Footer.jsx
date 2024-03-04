import './footer.css'

import logo from '../../images/Header/logo.png'
import telegram from '../../images/Contacts/telegram.png'
import vk from '../../images/Contacts/vk.png'
import whatsApp from '../../images/Contacts/whatsApp.png'
import youtube from '../../images/Contacts/youtube.png'
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="footer-logo">
                <Link to={'/'}><img className="icon_logo" src={logo}/></Link>
            </div>
            <div className="footer-information">
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <br/>Aenean commodo ligula eget dolor.
                    Aenean massa.
                    <br/>Cum sociis natoque penatibus et magnis dis parturient.
                </p>

            </div>
            <div className="footer-social">
                <div className="social-icons">
                    <a href=""><img className="forum" src={telegram}/></a>
                    <a href=""><img className="forum" src={vk}/></a>
                    <a href=""><img className="forum" src={whatsApp}/></a>
                    <a href=""><img className="forum" src={youtube}/></a>
                </div>
            </div>
        </footer>
    )
}