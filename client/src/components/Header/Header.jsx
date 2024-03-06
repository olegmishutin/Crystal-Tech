import {Link} from "react-router-dom";
import './header.css'
import logo from '../../images/Header/logo.png'
import AuthModal from "../AuthModal/authModal.jsx";
import user from "../../images/Header/user.png";
import axios from "axios";

export default function Header(props) {

    function getProfile() {
        axios({
            method: 'GET',
            url: '/api/me'
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '/me/'
            }
        }).catch((error) => {
            const authModalWindow = document.getElementById('modal')
            authModalWindow.style.display = 'block'
        })
    }

    return (
        <header>
            <div className="head-content">
                <Link to={'/'}><img className="forum" src={logo}/></Link>
                <p>Crystal Tech</p>
            </div>
            {props.children || props.userProfile ?
                <>
                    <div className="infoGuide">
                        {props.children}
                        {props.userProfile ?
                            <>
                                <a href="#modal" id="openModal" onClick={getProfile}><img className="log_in"
                                                                                          src={user}
                                                                                          alt="Login"/></a>
                                <AuthModal/>
                            </> : <></>}
                    </div>
                </> : <></>
            }
        </header>
    )
}
