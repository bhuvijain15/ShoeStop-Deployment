
import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import api from '../../api';

const Signup = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')

  const changeNameHandler = (e) => {
    setName(e.target.value)
  }

  const changeMailHandler = (e) => {
    setMail(e.target.value)
  }

  const changePasswordHandler = (e) => {
    setPassword(e.target.value)
  }

  const submitHandler = async () => {
    try {
      const res = await api.post('/api/auth/signup', { name, email, password })

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('token', res.data.token)
        console.log(res.data)
        navigate('/')
      }
    } catch (error) {
      console.log('Signup failed:', error.response?.data || error.message)
    }
  }

  return (
    <div className='signup'>
      <input
        type="text"
        placeholder='username'
        onChange={changeNameHandler}
      />

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

      <button onClick={submitHandler}>SignUp</button>
    </div>
  )
}

export default Signup
