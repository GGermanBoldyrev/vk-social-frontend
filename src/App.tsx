import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Container from "./components/basic/Container.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import PostsPage from "./components/pages/PostsPage.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import SinglePostPage from "./components/pages/SinglePostPage.tsx";
import AuthPage from "./components/pages/AuthPage.tsx";
import ProfilePage from "./components/pages/ProfilePage.tsx";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/posts" element={<PostsPage/>}/>
                        <Route path="/login" element={<AuthPage type="login"/>}/>
                        <Route path="/register" element={<AuthPage type="register"/>}/>
                        <Route path="/post/:postId" element={<SinglePostPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </Router>
        </>
    )
}

export default App
