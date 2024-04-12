import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Container from "./components/basic/Container.tsx";


import HomePage from "./components/pages/HomePage.tsx";
import PostsPage from "./components/pages/PostsPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import SignupPage from "./components/pages/SignupPage.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import SinglePostPage from "./components/pages/SinglePostPage.tsx";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/posts" element={<PostsPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/post/:postId" element={<SinglePostPage />} />
                    </Routes>
                </Container>
                <Footer/>
            </Router>
        </>
    )
}

export default App
