import { useState, useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import paths from './data/paths.json'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import axios from 'axios'
import { Draw } from './pages/Draw'
import { Save } from './interfaces/save'

function App() {
  const navigate = useNavigate()
  const [loggedInAccount, setLoggedInAccount] = useState<any>();
  const [userData, setUserData] = useState<any>({})
  const [save, setSave] = useState<Save | null>(null);



  const getUserData = () => {
    axios.post('http://localhost:5000/accountInfo', {
      id: loggedInAccount
  }).then(
      res => {
          setUserData({username: res.data.username, projects: res.data.projects})
      }
  )
  }


  
  useEffect(() => {

    if(window.location.pathname === '/'){
      navigate('/login')
    }

    axios.get('http://localhost:5000/loggedInUser').then(
      res => {
        setLoggedInAccount(res.data.account)
      }
    )

    axios.get('http://localhost:5000/save').then(
      res => {
        setSave(res.data.save)
      }
    )

  }, [])


  useEffect(() => {
    if(save !== null){

      axios.post('http://localhost:5000/save', {
        save: save
      })

    }
  }, [save])

  useEffect(() => {
    getUserData()
  }, [loggedInAccount])


  return (
    <div>
      <Routes>
          <Route path='/login' element={<Login  setAccount={setLoggedInAccount} getUserData={getUserData}/>}/>
          <Route path='/register' element={<Register/>}/>
          {(loggedInAccount !== null) ? (<Route path={'/user'} element={<Profile  userData={userData} setAccount={setLoggedInAccount} setSave={setSave}/>}/>) : null}
          <Route path='/draw' element={<Draw account={loggedInAccount} save={save}/>}/>
      </Routes>
    </div>
  )
}

export default App
