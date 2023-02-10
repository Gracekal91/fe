const config = {
    headers:{
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

const myToken = () =>{
    return localStorage.getItem('token');
}

module.exports = {config, myToken}