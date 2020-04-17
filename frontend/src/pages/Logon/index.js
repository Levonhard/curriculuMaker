import React, { useState } from 'react'
import { render } from "react-dom"
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import Alert from 'react-bootstrap/Alert'
import { CSSTransition } from 'react-transition-group'

import api from '../../services/api'

import './styles.css'

export default function Logon() {
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')
    const history = useHistory()

    const LoginErrorElement = function() {
        const [show, setShow] = useState(true);

        if (show) {
            return (
                <CSSTransition in={show} appear={show} timeout={300} classNames="alert">
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <p>
                            Email ou senha incorretos.<br></br>Tente novamente.
                        </p>
                    </Alert>
                </CSSTransition>
            )
        }
    }

    async function handleLogin(e) {
        e.preventDefault()

        const data = {
            email,
            pswd,
        }

        try {
            const response = await api.post('sessions', data)

            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('userName', response.data.name)
            localStorage.setItem('userUserName', response.data.username)

            history.push('/profile')
        } catch {
            render(<LoginErrorElement />, document.getElementById('login-error'))
        }
    }

    return (
        <div className="logon-container">
            <div id="login-error"></div>

            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={pswd}
                        onChange={e => setPswd(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    )
}