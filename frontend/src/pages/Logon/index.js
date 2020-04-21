import React, { useState } from 'react'
import { render } from "react-dom"
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { FaGithubSquare } from 'react-icons/fa'
import Alert from 'react-bootstrap/Alert'

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
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <p>
                        Email ou senha incorretos.<br></br>Tente novamente.
                    </p>
                </Alert>
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
            <section className="header-container">
                <h1>&#123; CurriculuMaker &#125;</h1>
            </section>

            <section className="notifications-container">
                <div id="login-error"></div>
            </section>

            <section className="form-container">
                <div className="form">
                    <form onSubmit={handleLogin}>
                        <h1 className="subtitle">LOGIN</h1>

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
                        <button className="button" type="submit">ENTRAR</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </div>
            </section>

            <section className="footer-container">
                <div>
                    <a href="https://github.com/Levonhard" target="_blank" rel="noopener noreferrer">
                        <FaGithubSquare size={32} />&#009;github.com/Levonhard
                    </a>
                </div>
            </section>
        </div>
    )
}