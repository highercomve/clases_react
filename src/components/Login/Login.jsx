import React, { Component } from 'react';
import './Login.css';
import amanda from '../../images/amanda.png';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }

    setUsername(username) {
        this.setState({ username: username })
    }

    setPassword(password) {
        this.setState({ password: password })
    }

    clickHandler() {
        // put your own code here
        alert(`Username: ${this.state.username} Password: ${this.state.password}`)
    }
    render() {
        const estilo = {
            //width:'45px'

        }
        return (<div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
                <h1 className="text-center login-title">Amanda Mantenedor de Textos</h1>
                <div className="account-wall">
                    <img className="rounded-circle" style={estilo} src={amanda} alt="" />
                    <form className="form-signin">
                        <input type="text" className="form-control" placeholder="Correo" required />
                        <input type="password" className="form-control" placeholder="Contraseña" required />
                        <button className="btn btn-lg btn-primary btn-block" onClick={this.clickHandler}>Entrar</button>
                    </form>
                </div>
            </div>
        </div>)
    }
}
export default Login;