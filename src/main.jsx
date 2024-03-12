import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Profile from './components/Profile/Profile.jsx'
import FeeStatus from './components/FeeStatus/FeeStatus.jsx'
import Notice from './components/Notice/Notice.jsx'
import ExamReport from './components/ExamReport/ExamReport.jsx'
import NewUser from './components/Newuser/NewUser.jsx'
import StudentsList from './components/StudentList/StudentsList.jsx'
import CreateNewUser from './components/CreateNewUser/CreateNewUser.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<LoginPage />}></Route>
      <Route path='dashboard' element={<Dashboard />}></Route>
      <Route path='profile' element={<Profile />}></Route>
      <Route path='feeStatus' element={<FeeStatus />}></Route>
      <Route path='notice' element={<Notice />}></Route>
      <Route path='examReport' element={<ExamReport />}></Route>
      <Route path='newUser' element={<NewUser />}></Route>
      <Route path='studentList' element={<StudentsList />}></Route>
      <Route path='studentList' element={<StudentsList />}></Route>
      <Route path='createNewUser' element={<CreateNewUser />}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
)
