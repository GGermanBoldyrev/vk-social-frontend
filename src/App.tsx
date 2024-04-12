import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Container from "./components/molecules/Container.tsx";


import Home from "./components/pages/Home.tsx";
import Posts from "./components/pages/Posts.tsx";
import Login from "./components/pages/Login.tsx";
import Signup from "./components/pages/Signup.tsx";
import Navbar from "./components/organisms/Navbar.tsx";
import Footer from "./components/molecules/Footer.tsx";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/posts" element={<Posts/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </Router>
        </>
    )
}

export default App
