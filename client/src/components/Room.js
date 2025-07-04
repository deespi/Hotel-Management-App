import React, { useState , useEffect } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row m-3 p-3 bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="img-fluid" />
      </div>
      <div className="col-md-8">
        <h1>{room.name}</h1>
        <p>Darmowe Wi-Fi , Parking , Restauracja w hotelu</p>
        <p>
          <b>Maksymalna ilość osób : {room.capacity}</b>
        </p>
        <p>
          <b>Rodzaj : {room.type}</b>
        </p>

        <div style={{ float: "right" }}>
          
          {(fromdate && todate) && (<Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn btn-dark m-2">Zarezerwuj teraz</button>
          </Link>)}

          <button className="btn btn-danger m-2"  onClick={handleShow}>
            Szczegóły
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" data--aos='zoom-in'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel nextLabel="" prevLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    src={url}
                    className="img-fluid"
                    style={{ height: "400px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Zamknij
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
