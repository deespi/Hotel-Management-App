import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { Tag, Divider } from "antd";

const { TabPane } = Tabs;
const user = JSON.parse(localStorage.getItem("currentUser"));
function Adminscreen() {
  return (
    <div className="ml-3">
      <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
        Panel administratora
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Rezerwacje" key="1">
          <div className="row">
            <Bookings />
          </div>
        </TabPane>
        <TabPane tab="Pokoje" key="2">
          <div className="row">
            <Rooms />
          </div>
        </TabPane>
        <TabPane tab="Dodaj pokój" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Użytkownicy" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  useEffect(async () => {
    try {
      setloading(true);
      const data = await (await axios.get("/api/bookings/getallbookings")).data;
      setbookings(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);
  return (
    <div className="col-md-11">
      <h1>Rezerwacje</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="box-s">
              <tr>
                <th>ID Rezerwacji</th>
                <th>ID Użytkownika</th>
                <th>Pokój</th>
                <th>Od</th>
                <th>Do</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  useEffect(async () => {
    try {
      setloading(true);
      const data = await (await axios.get("/api/rooms/getallrooms")).data;
      setrooms(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);
  return (
    <div className="col-md-11">
      <h1>Pokoje</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <table className="table table-bordered table-dark">
            <thead className="box-s">
              <tr>
                <th>ID Pokoju</th>
                <th>Nazwa pokoju</th>
                <th>Rodzaj</th>
                <th>Koszt za dzień</th>
                <th>Max ilość osób</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.costperday}</td>
                    <td>{room.capacity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState();
  const [loading, setloading] = useState(true);
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/users/getallusers")).data;
      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Użytkownicy</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="box-s">
            <tr>
              <th>Id</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Administrator</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "TAK" : "NIE"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Addroom() {
  const [room, setroom] = useState("");
  const [capacity, setcapacity] = useState();
  const [type, settype] = useState("");
  const [costperday, setcostperday] = useState();
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [description, setdescription] = useState("");
  async function addRoom() {
    const roomobj = {
      room,
      capacity,
      type,
      costperday,
      image1,
      image2,
      image3,
      description,
    };
    try {
      const result = await axios.post("/api/rooms/addroom", roomobj);
    } catch (error) {}
  }
  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Nazwa"
          value={room}
          onChange={(e) => {
            setroom(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Maksymalna ilość osób"
          value={capacity}
          onChange={(e) => {
            setcapacity(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Typ"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control mt-1"
          placeholder="Koszt za dzień"
          value={costperday}
          onChange={(e) => {
            setcostperday(e.target.value);
          }}
        />
      </div>

      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 1"
          value={image1}
          onChange={(e) => {
            setimage1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 2"
          value={image2}
          onChange={(e) => {
            setimage2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Image url 3"
          value={image3}
          onChange={(e) => {
            setimage3(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Opis"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <div className="mt-1 text-right">
          <button className="btn btn-primary" onClick={addRoom}>
            Dodaj pokój
          </button>
        </div>
      </div>
    </div>
  );
}
