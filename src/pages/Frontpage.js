import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import concreteImg from "../Assets/concrete.jpg";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";

import "../Style/Frontpage.sass";
import Swal from "sweetalert2";

const Frontpage = () => {
  //const [id, setId] = useState("");
  const { getAllServices, services, getServiceById, id, setId, service } =
    useService();

  //console.log(services);
  const navigate = useNavigate();

  const fetchServiceById = () => {
    getServiceById(id);
    navigate(`/service/${id}`);
  };

  const onChangeInput = (e) => {
    setId(e.target.value);
    console.log(id);
    // console.log(id);
    // getServiceById(id);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="container">
      <button onClick={getAllServices}>Lick me</button>
      <h1 style={{ textAlign: "center" }}>Services</h1>
      <div className="search">
        <input
          placeholder="Enter Service Id"
          type="number"
          onChange={onChangeInput}
          value={id}
          style={{ width: "300px" }}
        />
        <button onClick={fetchServiceById}>Search</button>
      </div>
      <br />
      {/* <br /> */}
      <Space size="middle" style={{ margin: 10 }}>
        <button /* type="primary"*/>Show all</button>

        <button>Add new </button>
      </Space>
      <br />
      <br />
      <div className="card-container">
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="left">
              <h3>{"Project: " + service.title}</h3>
              <p>Id: {service.id}</p>
              <p>Service : {service.type}</p>
              <p>Start: {service.start}</p>
              <p>Completed: {service.done}</p>
              <p>Customer: {service.customer}</p>
              <p>Country: {service.country}</p>
              <p>City: {service.city}</p>
              <p>Status: {service.status}</p>
            </div>
            <div className="right">
              {service.type === "Pavement" ? (
                <img
                  className="type-img"
                  src={pavementImg}
                  alt="Pavement image"
                />
              ) : service.type === "Concrete" ? (
                <img
                  className="type-img"
                  src={concreteImg}
                  alt="Concrete image"
                />
              ) : service.type === "Infra Service" ? (
                <img
                  className="type-img"
                  src={infraServiceImg}
                  alt="Infra Service image"
                />
              ) : service.type === "Foundation" ? (
                <img
                  className="type-img"
                  src={foundationImg}
                  alt="Foundation image"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontpage;
