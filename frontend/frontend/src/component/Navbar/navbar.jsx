import bun from '../../assets/Bun.png'
import './navbar.css'
import { PiNoteFill } from "react-icons/pi";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">

                <Link className="navbar-brand my-brand" href="/">
                <b><PiNoteFill/> &nbsp; ToDo</b>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item mx-2 ">
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link " aria-current="page" to="/about">About Me</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link " aria-current="page" to="/todo">Todo</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link  btn-nav" aria-current="page" to="/signup">sign up</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link  btn-nav" aria-current="page" to="signin">sign in</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link  btn-nav" aria-current="page" to="logout">Logout</Link>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link active"> 
                                <img className='img-fluid user-png' src={bun} alt="" />
                            </a>
                        </li> */}
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;


