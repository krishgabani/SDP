import React from 'react'

function Register() {
  return (
    <>
        <form action="">
            Name : <input type="text" name="name"/><br/>
            Email : <input type="email" /><br/>
            password : <input type="password" /><br/>
            Designation : <input type="text" /><br/>
            Department : <input type="text" /><br/>
            <button type="submit">Submit</button>
        </form>

    </>
  )
}

export default Register