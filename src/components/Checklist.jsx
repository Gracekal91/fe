import axios from "axios";
import {config} from '../util/config'

const Checklist = ({item}) =>{

    const toggleTask = async () => {
        if (myToken) {
            try {
                await axios.patch(`/todo/${item.id}`);
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
    }

    const deleteTask = async () =>{
        try{
            await axios.delete(`/delete/${item.id}`, config);
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }

//grab the token
    const myToken = localStorage.getItem('token')
    if(!item) <p>Loading ... </p>
    return(
        <>
            <label style={{display: 'flex', marginBottom:'-.5rem', fontSize: '14px'}} >
                <input  type="checkbox" checked={item.isCompleted}
                      onChange={toggleTask}/> {item.title}
                <span style={{display: 'inlineBlock', position:'absolute', right: '1.2rem', cursor: 'pointer'}}
                onClick={deleteTask}>x</span>
            </label>
        </>
    )
}

export default Checklist