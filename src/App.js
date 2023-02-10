import './App.scss';
import Login from "./components/Login";
import Signup from "./components/Signup";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Todos from "./components/Todos";
import axios from 'axios';



function App() {
    const myToken = localStorage.getItem('token')
    //handle logout
    const handleLogout = async () =>{
        try{
            await axios.get('/logout')
            localStorage.setItem('token', '');
            window.location.href="/signin"
        }catch(err){
            console.error(err)
        }
    }

    return (
        <>
            <Router>

                <div className="container">
                    {myToken &&
                        <span onClick={handleLogout} className="corner_button">Logout</span>
                    }

                    <div className="content">
                        <Routes>
                            <Route path="/signup" element={<Signup/>}/>
                        </Routes>
                        <Routes>
                            <Route path="/signin" element={<Login/>}/>
                        </Routes>
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                        </Routes>
                        <Routes>
                            <Route path="/todos/:id" element={<Todos/>}/>
                        </Routes>

                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;