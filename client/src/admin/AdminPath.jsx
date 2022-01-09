import { Routes,Route } from "react-router"

import Login from "./pages/Login"
import AdminHome from './pages/AdminHome'

const AdminPath = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard/:id/*" element={<AdminHome />} />
        </Routes>
    )
}

export default AdminPath
