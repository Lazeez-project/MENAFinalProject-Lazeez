import { Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import OwnerHome from './Pages/OwnerHome'
import Register from './Pages/Register'

const ResturantPath = ()=>(
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path={`dashboard/:id/*`} element={<OwnerHome />} />
        <Route path={`register`} element={<Register />} />
    </Routes>
)

export default ResturantPath