import React from 'react'

function Register() {
  return (
    <>
        <form action="">
            Name : <input type="text" name="name"/>
            Email : <input type="email" />
            password : <input type="password" />
            Designation : <input type="text" />
            Department : <input type="text" />
            <button type="submit">Submit</button>
        </form>

    </>
  )
}

export default Register