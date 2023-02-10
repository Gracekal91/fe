import logo from '../assets/images/logo.svg';
import {useState} from 'react'
import axios from 'axios'

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Handle login data
    const handleLogin = async (e) =>{
        e.preventDefault();
//post data and save the secret token for protected routes, grab the logged-in user id
        try{
            const {data} = await axios.post('/login', {email, password});
            const {accessToken, foundUser} = data;
            localStorage.setItem('token', accessToken);
            window.location.href = `/todos/${foundUser.id}`

        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <div className="login_container">
               <div className="logo">
                   <img src={logo} alt=""/>
               </div>
                <div className="login_content">
                    <p className="login_title">Sign in</p>
                    <form onSubmit={handleLogin}>
                    <div className="input_group">
                        <input type="text" placeholder="email address"
                        value={email}
                               onChange={(e) =>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="input_group">
                        <input type="password" placeholder="password"
                               value={password}
                               onChange={(e) =>{setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="input_group">
                        <button className="btn" type="submit">SIGN IN</button>
                    </div>
                    </form>
                </div>
                <p className="small_text">Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </>
    )
}

export default Login