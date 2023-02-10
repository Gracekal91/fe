import logo from "../assets/images/logo.svg";
import {useState, useEffect} from 'react'
import axios from "axios";
import Checklist from "./Checklist";
import {config} from '../util/config';


const Todos = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [incomplete, setIncomplete] = useState(false)
    const [complete, setComplete] = useState(false)
    const [all, setAll] = useState(true);

    const HandleFilterAll = () =>{
        setAll(true)
        setComplete(false)
        setIncomplete(false)
    }

    const HandleFilterIncomplete = () =>{
        setAll(false)
        setComplete(false)
        setIncomplete(true)
    }
    const HandleFilterComplete = () =>{
        setAll(false)
        setComplete(true)
        setIncomplete(false)
    }

    //grab the token
    const myToken = localStorage.getItem('token')

    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await axios.get('/todos', config);
                const data = response.data;
                setTodos(data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [])

    //Send the token along with request, in the header to access protected routes

    const HandleTaskCreation = async () => {

            try {
                const body = {
                    title: task
                }
                const response = await axios.post('/createTodo', body, config);
                return response.data;
            } catch (err) {
                console.error(err)
            }
    }

    return (
        <>
            <div className="login_container">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <div className="login_content">
                    <h4 className="title">Todo List</h4>
                    <form onSubmit={HandleTaskCreation}>
                        <div className="input_group_todo" >
                            <input type="text" placeholder="Add a new Todo"
                                   value={task}
                                   onChange={(e) =>{setTask(e.target.value)}}
                            />
                        </div>
                        <div className="todos_content">
                            { !incomplete && !complete && all &&
                                todos.map((item) =>{
                                    return(
                                        <Checklist item={item} key={item.id}/>
                                    )
                                })
                            }
                            {
                                !all && !complete && incomplete &&
                                todos.filter(item => item.isCompleted === false).map((item) =>{
                                    return(
                                        <Checklist item={item} key={item.id}/>
                                    )
                                })
                            }
                            {
                                !all && complete && !incomplete &&
                                todos.filter(item => item.isCompleted === true).map((item) =>{
                                    return(
                                        <Checklist item={item} key={item.id}/>
                                    )
                                })
                            }


                        </div>
                    </form>
                </div>
                {myToken ?
                <div className="filter">
                    <p>
                        <span>Show:</span>
                        <span className={all ? 'selected' : ''} onClick={HandleFilterAll}>
                            all
                        </span>
                        <span className={complete ? 'selected': ''} onClick={HandleFilterComplete}>completed</span>
                        <span className={incomplete ? 'selected' : ''} onClick={HandleFilterIncomplete}>incomplete</span>
                    </p>
                </div>
                    :
                    <p style={{marginLeft: '1rem', fontSize:'14px'}}>You are not logged-in, please <a href="/signin">Login</a></p>
                }
            </div>

        </>
    )
}

export default Todos