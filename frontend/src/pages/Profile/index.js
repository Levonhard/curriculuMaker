import React from 'react'
import { FiPower } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import './styles.css'
import logoImg from '../../assets/logo.png'
import logoIcon from '../../assets/icon.png'

export default function Profile() {
    const userData = JSON.parse(localStorage.getItem('sessionUser'))

    const history = useHistory()

    function handelLogout() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <section className="header-container">
                <div className="header-top">
                    <img src={logoIcon} alt="" id="logoIcon" />
                    <img src={logoImg} alt="" id="logoImg" />
                </div>
                <div className="header-bottom">
                    <p>Olá {userData.username}</p>
                    <button onClick={handelLogout} type="button">
                        <p>Logout</p>
                        <span>
                            <FiPower size={18} color="#E02041" />
                        </span>
                    </button>
                </div>
            </section>
            <section className="main-container">
                <div className="basic-info">

                    <h1 className="subtitle">INFORMAÇÕES BÁSICAS</h1>

                    <form>
                        <input
                            placeholder="Nome completo"
                            value={userData.name}
                        />
                        <input
                            placeholder="Endereço"
                        />
                        <input
                            placeholder="Número de celular"
                        />
                        <input
                            placeholder="Número de telefone fixo"
                        />
                        <input
                            placeholder="Data de nascimento"
                            type="date"
                        />
                        <input
                            placeholder="Estado civil"
                        />
                    </form>
                </div>
            </section>
        </div>
    );
}