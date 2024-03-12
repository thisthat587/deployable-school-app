import LoginPage from './components/LoginPage/LoginPage'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'

import { Outlet } from 'react-router-dom'
import NewUser from './components/Newuser/NewUser'
import StudentsList from './components/StudentList/StudentsList'
import CreateNewUser from './components/CreateNewUser/CreateNewUser'

function App () {
    return (
        <>
            <Outlet />
            {/* <Dashboard /> */}
            {/* <LoginPage /> */}
            {/* <Profile /> */}
            {/* <NewUser/> */}
            {/* <StudentsList /> */}
            {/* <CreateNewUser /> */}
        </>
    )

}

export default App
