import {Routes, Route} from 'react-router-dom'
import Login from "./components/Login/Login.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import AppShell from "./components/AppShell/AppShell.jsx"

function App()
{
    return(
        <Routes>
            <Route path="/"          element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/app"       element={<AppShell/>}/>
        </Routes>
    )
}

export default App