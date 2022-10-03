import { Space } from "antd";

import { useNavigate, Link } from "react-router-dom";
import concreteImg from "../Assets/concrete.png";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";

import "../Style/Frontpage.sass";
import {FaEllipsisH} from "react-icons/fa"
import { useTranslation } from "react-i18next";

const Frontpage = () => {

  const { t, i18n } = useTranslation("translation");




  const { getServiceById, id, setId, services} = useService();


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
        {t("TITLE.HEADER")}
      </h1>
      <div className="search">
        <input
          placeholder={t("INPUT.ENTERID")}
          type="number"
          onChange={onChangeInput}
          value={id}
          style={{ width: "300px" }}
        />
        <button onClick={fetchServiceById}>
          {t("BUTTON.SEARCH")}
        </button>
      </div>
      <br />
      <Space size="middle" style={{ margin: 10 }}>
        <button>{t("BUTTON.REFRESH")}</button>

        <button onClick={addNewService}>
          {t("BUTTON.ADD")}
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
                {t("SERVICES.ID")}</b>  {service.id}
              </p>
              <p><b>
                {t("SERVICES.SERVICE")}</b>  {t(`${service.type}`)}
              </p>
              <p><b>
                 {t("SERVICES.START")}</b>  {service.start}
              </p>
              <p><b>
                 {t("SERVICES.DONE")}</b>  {service.done}
              </p>
              <p><b>
                 {t("SERVICES.CUSTOMER")}</b> {" "}
                {service.customer}
              </p>
              <p><b>
                 {t("SERVICES.COUNTRY")}</b> {" "}
                 {t(`${service.country}`)}
              </p>
              <p><b>
                 {t("SERVICES.CITY")}</b>  {t(`${service.city}`)}
              </p>
              <p>
                <b> {t("SERVICES.STATUS")} </b> {t(`${service.status}`)}
              </p>
            </div>
            
            <div className="service-img">
           <Link to={`/edit/${service.id}`}> <FaEllipsisH className="edit-icon" /> </Link>
              {service.type === "FORMDATA.TYPE_PAVEMENT"  ? (
                
                
                <img className="type-img" src={pavementImg} alt="Pavement" />
                
              ) : service.type === "FORMDATA.TYPE_CONCRETE" ? (
               
                <img className="type-img" src={concreteImg} alt="Concrete" />
               
              ) : service.type === "FORMDATA.TYPE_INFRA_SERVICE" ? (
                
                <img
                  className="type-img"
                  src={infraServiceImg}
                  alt="Infra Service"
                />
                
              ) : service.type === "FORMDATA.TYPE_FOUNDATIONING" ? (
                
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
