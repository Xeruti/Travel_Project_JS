import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { LoginContextProvider } from './LoginContex'
import AccountPage from './pages/AccountPage'
import MyTripsPage from './pages/MyTripsPage'
import TripsForm from './pages/TripsForm'
import TripPage from './pages/TripPage'
import MyBookingsPage from './pages/MyBookingsPage'
import ContactPage from './pages/ContactPage'

axios.defaults.baseURL = 'http://localhost:4000'

axios.defaults.withCredentials = true

function App() {
  return (
    <LoginContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/account" element={<AccountPage/>}></Route>
        <Route path="/account/myBookings/:id" element={<MyBookingsPage/>}></Route>
        <Route path="/account/trips" element={<MyTripsPage/>}></Route>
        <Route path="/account/trips/new" element={<TripsForm/>}></Route>
        <Route path="/account/trips/:id" element={<TripsForm/>}></Route>
        <Route path="/trip/:id" element={<TripPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
      </Route>
    </Routes>
    </LoginContextProvider>
  )
}

export default App
