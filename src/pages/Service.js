import { Space } from "antd";
//import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";
import concreteImg from "../Assets/concrete.jpg";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";
import "../Style/Service.sass";

const Service = () => {

  const { getServiceById, id, setId, service } = useService();

  const navigate = useNavigate();

  const storedServices = JSON.parse(localStorage.getItem("services"));

  const onChangeInput = (e) => {
    setId(e.target.value);
  };

  const showAll = () => {
    navigate("/");
  };

  const fetchServiceById = () => {
    console.log("i fetch", storedServices[id - 1].id);
    getServiceById(id);
    setId("");
    navigate(`/service/${id}`);
  };


  const goToEdit = () => {
    navigate("/edit")
  }

  return (
    <div className="container">
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

      <Space size="middle" style={{ margin: 10 }}>
        <button onClick={showAll}>Show all</button>

        <button>Add new </button>
      </Space>
      <br />
      <br />

      <div className="card-container">
        <div className="card">
          <div className="left">
            <h3>Project: {service.title}</h3>
            <p>Id: {service.id}</p>
            <p>Service: {service.type}</p>
            <p>Start:{service.start}</p>
            <p>Completed:{service.done}</p>
            <p>Customer: {service.customer}</p>
            <p>Country: {service.country}</p>
            <p>City: {service.city}</p>
            <p>Status: {service.status}</p>
          </div>
          <div className="right">
            {service.type === "Pavement" ? (
              <img className="type-img" src={pavementImg} alt="Pavement" />
            ) : service.type === "Concrete" ? (
              <img className="type-img" src={concreteImg} alt="Concrete" />
            ) : service.type === "Infra Service" ? (
              <img
                className="type-img"
                src={infraServiceImg}
                alt="Infra Service"
              />
            ) : service.type === "Foundation" ? (
              <img className="type-img" src={foundationImg} alt="Foundation" />
            ) : (
              <></>
            )}
            <button style={{ cursor: "pointer" }} type="primary">
              Delete
            </button>

            <button type="primary" onClick={goToEdit}>Edit </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
