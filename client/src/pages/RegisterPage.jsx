import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const RegisterPage = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [redirect,setRedirect] = useState(false)
    

    async function registerUser(e){
        e.preventDefault()
        try{
            await axios.post("/register", {
                name,
                email,
                password
            })
            alert('Zarejestrowano użytkownika.')
            setRedirect(true)

        } catch (e) {
            alert('Rejestracja nie powiodła się.')
        }
    }

    if(redirect){
        return <Navigate to={'/login'}/>
      }

  return (
    <div className='container m-auto mt-4 grow flex items-center justify-around'>
    <div className='mb-48'>
        <h1 className='text-4xl text-center mb-4'>Rejestracja</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>

            <input type='text' placeholder={'Nazwa użytkownika'} 
                value={name} 
                onChange={e => setName(e.target.value)}
            />

            <input type='email' placeholder={'Adres email'}
                value={email} 
                onChange={e => setEmail(e.target.value)}
            />
            <input type='password' placeholder={'Utwórz hasło'}
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />

            <button className='primary'>Zarejestruj się</button>
            <div className='text-center py-2 text-gray-500'>
                Posiadasz już konto? 
                <Link className='px-2 underLine text-black' to={"/login"}>Zaloguj się</Link>
            </div>
        </form>
    </div>
</div>
  )
}

export default RegisterPage