import React from 'react';
import { Link } from "react-router-dom";
import amanda from '../../images/amanda.png';

const estilo = {
    width:'45px'
}

export default function Menu() {
    return (
        <section className="todo-list">
            <br />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <img className="rounded-circle" style={estilo} src={amanda} alt="" />
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">

                            <span className="sr-only">
                                Inicio {/* <Link to="/" >Inicio</Link> */}
                            </span>

                        </li>
                        <li className="nav-item">
                            <Link to="/mantenedor/" className="nav-link">Listado de Textos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>

                    </ul>
                </div>
            </nav>
            <br />
        </section>
    )
}