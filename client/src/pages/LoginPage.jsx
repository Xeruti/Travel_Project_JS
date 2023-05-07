import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {LoginContext} from '../LoginContex'

const LoginPage = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)

  const {setUser} = useContext(LoginContext) //używanie "kontekstu" zawrtego w innym pliku jsx - w tym przypadku informacji o loginie/użytkowniku
  
  async function loginUser(e){
    e.preventDefault()
    try{
    const response = await axios.post('/login', {email,password}) //wysłanie komendy post do /login z emailem i hasłem w "body"
    setUser(response.data)  //setUser do pliku LoginContext dostępne dla nas dzięki useContext()
    setRedirect(true) //ustawiamy przekierowanie
    } 
    catch(e){
      alert('Logowanie nie powiodło się')
    }
  }

  if(redirect){
    return <Navigate to={'/'}/> //przekierowanie
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-48'>
            <h1 className='text-4xl text-center mb-4'>Logowanie</h1>
            <form className='max-w-md mx-auto' onSubmit={loginUser}>
                <input type='email' 
                  placeholder={'Podaj email'} 
                  value={email} 
                  onChange={e=> setEmail(e.target.value)}
                />
                <input type='password' 
                  placeholder={'Wprowadź hasło'} 
                  value={password} 
                  onChange={e=> setPassword(e.target.value)}
                />
                <button className='primary'>Login</button>
                <div className='text-center py-2 text-gray-500'>
                    Nie posiadasz jeszcze konta? 
                    <Link className='px-2 underLine text-black' to={"/register"}>Zarejestruj się</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage