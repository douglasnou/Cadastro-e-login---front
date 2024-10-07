import { Route, Routes } from "react-router-dom"
import { UserCadastro } from "./Users/UserCadastro"
import { UserLogin } from "./Users/UserLogin"
import { Home } from "./Home"
import { VisitorLogin } from "./Visitors/VisitorLogin"
import { VisitorCadastro } from "./Visitors/VisitorCadastro"
import { UserDashboard } from "./Users/UserDashboard"
import { VisitorDashboard } from "./Visitors/VisitorDashboard"

function App() {
  

  return (
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/user" element={<UserLogin/>}/>
        <Route path="/cadastro" element={<UserCadastro/>}/>

        <Route path="/visitor" element={<VisitorLogin/>} />
        <Route path="/cadastrar-visitor" element={<VisitorCadastro/>} />

        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/dashboard-visitor" element={<VisitorDashboard/>} />
      </Routes>
  )
}

export default App
