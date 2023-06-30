export default class APIService{
    static UpdateUser(id, username,age ,gender, email){
        return fetch(`http://127.0.0.1:4000/users/${id}`,{
            method:'PUT',
            headers:{
            'content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                age:age,
                gender:gender,
                email:email
            })
        })
        .then(resp => resp.json())
    }


    static addUser(username,age ,gender, email){
        return fetch(`http://127.0.0.1:4000/users`,{
            method:'POST',
            headers:{
            'content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                age:age,
                gender:gender,
                email:email
            })
        })
        .then(resp => resp.json())
    }


    static deleteUser(id){
        return fetch(`http://127.0.0.1:4000/users/${id}`,{
            method:'DELETE',
            headers:{
            'content-Type':'application/json'
            },
            
        })
        
    }

}