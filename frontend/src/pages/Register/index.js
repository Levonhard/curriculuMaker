import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [pswd, setPswd] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            username,
            pswd,
        }

        try {
            const response = await api.post('users', data)

            alert(`Seu ID de acesso: ${response.data.id}`)

            history.push('/')
        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="new-register-container">
            <div className="content">
                <section>
                    {/*<img src={logoImg} alt="Be The Hero"/>*/}
    
                    <h1 className="subtitle">CADASTRO</h1>                

                    <form onSubmit={handleRegister}>
                        <input
                            placeholder="Nome completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Nome de usuário"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={pswd}
                            onChange={e => setPswd(e.target.value)}
                            minLength={5}
                            required
                        />

                        <button type="submit" className="button">CADASTRAR</button>
                    </form>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o logon
                    </ Link>
                </section>
            </div>
        </div>
    )
}