import { useNavigate, NavLink } from "react-router-dom"
import { LoginSignup } from "./login-signup"
import { userService } from "../services/user.service"
import { useState } from 'react'

export function AppHeader() {
    const navigate = useNavigate()
    const [user, setUser] = useState(userService.getLoggedinUser())


    function onLogo() {
        navigate('/')
    }

    function onChangeLoginStatus(user) {
        setUser(user)
    }

    function onLogout() {
        userService
            .logout()
            .then(() => { setUser(null) })
    }

    return (
        <header className="app-header full" >
            <h1 className="main-logo" onClick={onLogo}>Toys'R Bugs</h1>


            {user ? (
                < section >
                    <h2>Hello {user.fullname}</h2>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                </section>
            )}

            <nav className="main-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}

