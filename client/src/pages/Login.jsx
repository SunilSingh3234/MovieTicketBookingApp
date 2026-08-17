import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [state, setState] = useState('Login') 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { backendUrl, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          toast.success('Account created successfully!')
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          toast.success('Logged in successfully!')
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4'>
      <form onSubmit={onSubmitHandler} className='bg-zinc-900 border border-zinc-800 text-white p-8 rounded-2xl w-full max-w-md shadow-2xl flex flex-col gap-5'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold'>{state === 'Login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className='text-sm text-zinc-400 mt-1'>Please {state === 'Login' ? 'sign in to continue' : 'sign up to book movie tickets'}</p>
        </div>

        {state === 'Sign Up' && (
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-zinc-400 font-medium'>Full Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder='John Doe'
              className='bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:border-primary text-sm'
            />
          </div>
        )}

        <div className='flex flex-col gap-1'>
          <label className='text-xs text-zinc-400 font-medium'>Email Address</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='johndoe@example.com'
            className='bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:border-primary text-sm'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-xs text-zinc-400 font-medium'>Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='••••••••'
            className='bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 outline-none focus:border-primary text-sm'
          />
        </div>

        <button type='submit' className='mt-2 bg-primary hover:bg-primary-dull transition py-2.5 rounded-lg font-medium text-sm cursor-pointer'>
          {state === 'Login' ? 'Login' : 'Sign Up'}
        </button>

        {state === 'Login' ? (
          <p className='text-center text-sm text-zinc-400'>
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer hover:underline'>Sign up</span>
          </p>
        ) : (
          <p className='text-center text-sm text-zinc-400'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary cursor-pointer hover:underline'>Login</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Login