import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Logon() {
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        const data = {
            email,
            pswd,
        }

        const response = await api.post('sessions', data)

        console.log(response.data.name)
    }

    return (
        <div className="logon-container">
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

                    <Link>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    )
}