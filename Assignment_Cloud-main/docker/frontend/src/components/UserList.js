

import React from 'react'
import APIService from './APIService'

function UserList(props) {

  const editUser = (user) => {
    props.editUser(user)
  }

  const deleteUser=(user)=>{
    APIService.deleteUser(user.id)
    .then(()=> props.deleteUser(user))
  }

  return (
    <div>
        {props.users && props.users.map(user =>{
        return(
        <div key = {user.id}>
            <h2>User Information:</h2>
            <h2>"name": {user.username}</h2>
            <h2>"age": {user.age}</h2>
            <h2>"gender": {user.gender} </h2>
            <h2>"email": {user.email} </h2>

            <div className = "row">
              <div className = "col-md-1">
                <button className="btn btn-primary"
                onClick = {()=> editUser(user)}
                >Update</button>
              </div>

              <div className = "col">
                  <button className="btn btn-danger"
                  onClick={()=> deleteUser(user)}
                  >Delete</button>
              </div>

            </div>

            <hr/>
            
        </div>
        )
      })}
    </div>
  )
}

export default UserList
