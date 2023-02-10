import logo from '../assets/images/logo.svg';
import {useState} from 'react'
import axios from 'axios'

const Signup = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //handle sign up data submission
    const handleDataSubmission = async (e) =>{

        e.preventDefault();

        const data = {
            name: name,
            email: email,
            password: password
        }

        axios.post('/signup', data, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response =>{
                window.location.href = '/signin'
                console.log(response.data);
            }).catch(error =>{
                console.log(error)
        });

        setEmail('');
        setPassword('');
    }

    return(
        <>
            <div className="login_container">
               <div className="logo">
                   <img src={logo} alt=""/>
               </div>
                <div className="login_content">
                    <p className="login_title">Sign in</p>
                    <form onSubmit={handleDataSubmission}>
                    <div className="input_group">
                        <input type="text" placeholder="enter your name"
                        value={name}
                               onChange={(e) =>{setName(e.target.value)}}
                        />
                    </div>
                        <div className="input_group">
                            <input type="email" placeholder="email address"
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
                        <button className="btn" type="submit">SIGN UP</button>
                    </div>
                    </form>
                </div>
                <p className="small_text">Already have an account? <a href="/signin">Sign in</a></p>
            </div>
        </>
    )
}

export default Signup