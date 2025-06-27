import axios from "axios";
import React, { useState, useEffect } from "react";

function Addroom() {
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
      </div>

      <div className="col-md-6">
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Koszt za dzień"
          value={costperday}
          onChange={(e) => {
            setcostperday(e.target.value);
          }}
        />
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
            ADD ROOM
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addroom;
