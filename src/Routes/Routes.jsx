import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'

function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/projetos' element={<Projects/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes