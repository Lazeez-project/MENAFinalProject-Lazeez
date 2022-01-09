import { Routes,Route } from 'react-router-dom'

import Resturants from '../pages/Resturants'
import Pending from '../pages/Pending'
import AddAdmin from '../pages/AddAdmin'
import ChangePassword from '../pages/ChangePassword'
import Massages from '../pages/Massages'
import UpdateResturant from '../pages/UpdateResturant'

const Path = (props)=>(
    <>
        <Routes>
            <Route path="/" exact element={<Resturants/>} />
            <Route path="/pending" element={<Pending/>} />
            <Route path="/massages" element={<Massages/>} />
            <Route path="/addadmin" element={<AddAdmin/>} />
            <Route path="/changepassword" element={<ChangePassword/>} />

            <Route path="/updateRes/:resId" element={<UpdateResturant/>} />
        </Routes>
    </>
)

export default Path
