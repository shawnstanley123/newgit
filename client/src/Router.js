import React from 'react'
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Loggedpage from './Loggedpage'
import Login from './Login'
import Confirm from './Confirm'
export default function Layout() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/logged/:id" element={<Loggedpage/>}/>
                <Route path="/confirm/:id" element={<Confirm/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    </div>
  )
}
