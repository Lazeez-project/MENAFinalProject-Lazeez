import { Routes,Route } from 'react-router-dom'

import Orders from '../Pages/Orders'
import MyMeals from '../Pages/MyMeals'
import AddMeal from '../Pages/AddMeal'
import UpdateData from '../Pages/UpdateData'
import ChangePassword from '../Pages/ChangePassword'

import EditMeal from '../Pages/EditMeal'
import ServicesPage from '../Pages/ServicesPage'

const Path = ()=>(
    <Routes>
        <Route path={`/`} element={<Orders/>} />
        <Route path={`/mymeals`} element={<MyMeals/>} />
        <Route path={`/addmeal`} element={<AddMeal/>} />
        <Route path={`/updatedata`} element={<UpdateData/>} />
        <Route path={`/services`} element={<ServicesPage/>} />
        <Route path={`/changepassword`} element={<ChangePassword/>} />

        <Route path="editmeal/:mealId" element={<EditMeal />} />
    </Routes>
)

export default Path
