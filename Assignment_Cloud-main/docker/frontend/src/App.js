
import './App.css';
import {useState ,useEffect} from 'react';
import UserList from './components/UserList';
import Form from './components/Form';

function App() {

  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(()=> {
    fetch('http://127.0.0.1:4000/users',{
      method:'GET',
      headers:{
        'content-Type':'application/json'
      }
    })
    .then(resp =>resp.json())
    .then(data => {
      if (data && data.users) {
        setUsers(data.users);
      } else {
        console.error('Response is missing users property.');
      }
    })
    .catch(error => console.log(error))
  },[])

  const editUser =(user)=>{
    setEditedUser(user)
  }

  const updatedData = (user)=>{
      const new_user = users.map(my_user=>{
        if(my_user.id === user.id){
          return user
        }else{
          return my_user
        }
      })
      setUsers(new_user)
  }

  const openForm = ()=> {
    setEditedUser({username:'',age:'',gender:'',email:''})
  }

  const addeduser = (user) => {
    const new_users = [...users,user]
    setUsers(new_users)
  }

  const deleteUser = (user) => {
    const new_users = users.filter(myuser =>{
      if(myuser.id === user.id){
        return false
      }
        return true
    })
    setUsers(new_users)
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>RESTful API</h1>
        </div>

        <div className="col">
          <button
          className="btn btn-success"
          onClick={openForm}
          >Add User</button>
        </div>
      </div>
      
      <UserList users={users} editUser = {editUser} deleteUser ={deleteUser}/>

      {editedUser ? <Form user = {editedUser} updatedData = {updatedData} addeduser= {addeduser}/>:null}

      
  
    </div>
  );
}

export default App;
