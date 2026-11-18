
import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import { productContext } from '../contextAPI/Context'
import api from '../../api';

const Login = () => {
    const navigate = useNavigate()
    const { setToken } = useContext(productContext)

    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')

    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = async () => {
        try {
            const res = await api.post('/api/auth/login', { email, password })

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem('token', res.data.token)
                setToken(res.data.token)
                navigate('/home')
            }
        } catch (error) {
            console.log('Login failed:', error.response?.data || error.message)
        }
    }

    return (
        <div className='signup'>
            <input
                type="text"
                placeholder='email'
                onChange={changeMailHandler}
            />

            <input
                type="password"
                placeholder='password'
                onChange={changePasswordHandler}
            />

            <button onClick={submitHandler}>Login</button>
        </div>
    )
}

export default Login
