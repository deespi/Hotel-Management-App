import React, { useState, useEffect } from "react";
import {useDispatch , useSelector} from 'react-redux'
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import Swal from 'sweetalert2'
export default function Loginscreen() {
  

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const[loading, setloading]=useState(false)
    const[error, seterror]=useState(false)
    const[success, setsuccess]=useState(false)    

    useEffect(() => {

          if(localStorage.getItem('currentUser'))
          {
              window.location.href='/'
          }
        
    }, [])

    async function login(){
      const user={

        email,
        password
    }
      try {
        setloading(true)
        const result = await (await axios.post('/api/users/login',user)).data
        localStorage.setItem('currentUser',JSON.stringify(result))
        window.location.href='/'
      } catch (error) {
        seterror(true)
        setloading(false)
        console.log(error);
      }
    }

    return (
        <div className='login'>
         <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Logowanie
          </h2>

          {loading && (<Loader/>)} 
          {error && (<Error error='Niepoprawne dane logowania'/>)}
          {success && (<Success success='Zalogowano pomyślnie'/>)}
          <div>
            <input required type="text" placeholder="Adres email" className="form-control mt-1" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input
              type="password"
              placeholder="Hasło"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setpassword(e.target.value)}}
            />
            
            <button onClick={login} className="btn btn-success mt-3 mb-3 rounded-pill">Zaloguj się</button>
            <br/>
            <a style={{color:'black'}} href="/register" className="mt-2">Kliknij tutaj, aby przejść do rejestracji</a>
          </div>
        </div>
      </div>
        </div>
    )
}