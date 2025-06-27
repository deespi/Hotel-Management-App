import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
export default function Registerscreen() {
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [error2, seterror2] = useState(false);
  const [error3, seterror3] = useState(false);
  const [success, setsuccess] = useState(false);
  async function register() {
    if (phone.length !== 9) {
      seterror(false);
      seterror2(false);
      seterror3(false);
      seterror2(true);
      setloading(false);
      console.log(error2);
      setphone("");
      setcpassword("");
      setpassword("");
    } else {
      if (password !== cpassword) {
        seterror(false);
        seterror2(false);
        seterror3(false);
        seterror3(true);
        setloading(false);
        console.log(error3);
        setcpassword("");
        setpassword("");
      } else {
        const user = {
          name,
          surname,
          phone,
          email,
          password,
        };
        try {
          seterror(false);
          seterror2(false);
          seterror3(false);
          setloading(true);
          const result = await axios.post("/api/users/register", user);
          setloading(false);
          setsuccess(true);
          setemail("");
          setname("");
          setsurname("");
          setphone("");
          setcpassword("");
          setpassword("");
        } catch (error) {
          seterror(true);
          setloading(false);
          console.log(error);
        }
      }
    }
  }

  return (
    <div className="register">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loader />}
          {success && <Success success="Rejestracja przebiegła pomyślnie" />}
          {error && <Error error="Podany adres email już istnieje" />}
          {error2 && <Error error="Nieprawidłowy format numeru telefonu" />}
          {error3 && <Error error="Podane hasła nie są identyczne" />}

          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Rejestracja
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="Imię"
              className="form-control mt-1"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="Nazwisko"
              className="form-control mt-1"
              value={surname}
              onChange={(e) => {
                setsurname(e.target.value);
              }}
            />
            <input
              required
              type="number"
              placeholder="Telefon"
              className="form-control mt-1"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="Adres email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Hasło"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Powtórz hasło"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button
              onClick={register}
              className="btn btn-primary rounded-pill mt-3 mb-3"
            >
              Zarejestruj się
            </button>
            <br />
            <a style={{ color: "black" }} href="/login">
              Kliknij tutaj, aby przejść do logowania
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
