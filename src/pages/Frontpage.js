import { Space } from "antd";

import { useNavigate } from "react-router-dom";
import concreteImg from "../Assets/concrete.jpg";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";
import { resources } from "../resource";
import "../Style/Frontpage.sass";

const Frontpage = () => {
  const { getServiceById, id, setId, services } = useService();

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
        <button>{resources.BUTTON.BUTTON_PLACEHOLDER_SHOW}</button>

        <button onClick={addNewService}>
          {resources.BUTTON.BUTTON_PLACEHOLDER_ADD}
        </button>
      </Space>
      <br />
      <br />
      <div className="card-container">
        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="left">
              <h3>
                {resources.SERVICES.SERVICE_PLACEHOLDER_TITLE} {service.title}
              </h3>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_ID} {service.id}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_SERVICE} {service.type}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_START} {service.start}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_DONE} {service.done}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_TITLE}{" "}
                {service.customer}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_COUNTRY}{" "}
                {service.country}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_CITY} {service.city}
              </p>
              <p>
                {resources.SERVICES.SERVICE_PLACEHOLDER_STATUS} {service.status}
              </p>
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
