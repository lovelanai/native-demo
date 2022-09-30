import { Space } from "antd";

import { useNavigate } from "react-router-dom";
import concreteImg from "../Assets/concrete.png";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";
import { resources } from "../resource";
import "../Style/Frontpage.sass";
import {FaEllipsisH} from "react-icons/fa"

const Frontpage = () => {


  const { getServiceById, id, setId, services, service} = useService();


  const navigate = useNavigate();

  const fetchServiceById = () => {
    getServiceById(id);
    navigate(`/service/${id}`);
    setId("");
  };

  const addNewService = () => {
    navigate("/add");
  };

  const onChangeInput = (e) => {
    setId(e.target.value);
    console.log(id);
  };


  /* const goToEdit = (e) => {
    setId(e.target.value);
    console.log(service.id)
    navigate("/edit") 
  };*/

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        {resources.TITLES.TITLES_PLACEHOLDER_HEADER}
      </h1>
      <div className="search">
        <input
          placeholder={resources.INPUT.INPUT_PLACEHOLDER_ENTERID}
          type="number"
          onChange={onChangeInput}
          value={id}
          style={{ width: "300px" }}
        />
        <button onClick={fetchServiceById}>
          {resources.BUTTON.BUTTON_PLACEHOLDER_SEARCH}
        </button>
      </div>
      <br />
      <Space size="middle" style={{ margin: 10 }}>
        <button>{resources.BUTTON.BUTTON_PLACEHOLDER_REFRESH}</button>

        <button onClick={addNewService}>
          {resources.BUTTON.BUTTON_PLACEHOLDER_ADD}
        </button>
      </Space>
      <br />
      <br />
       <div className="card-container"> 
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="service-text">
              <h3>
                <b>{service.title}</b> 
              </h3>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_ID}</b>  {service.id}
              </p>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_SERVICE}</b>  {service.type}
              </p>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_START}</b>  {service.start}
              </p>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_DONE}</b>  {service.done}
              </p>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_CUSTOMER}</b> {" "}
                {service.customer}
              </p>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_COUNTRY}</b> {" "}
                {service.country}
              </p>
              <p><b>
                {resources.SERVICES.SERVICE_PLACEHOLDER_CITY}</b>  {service.city}
              </p>
              <p>
                <b>{resources.SERVICES.SERVICE_PLACEHOLDER_STATUS} </b> {service.status}
              </p>
            </div>
            
            <div className="service-img">
            <FaEllipsisH className="edit-icon"/>
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
                
                <img
                  className="type-img"
                  src={foundationImg}
                  alt="Foundation"
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
