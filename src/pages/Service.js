import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import concreteImg from "../Assets/concrete.png";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";
import "../Style/Service.sass";
import Swal from "sweetalert2";
import { resources } from "../resource";

const Service = () => {
  const { getServiceById, id, setId, service, deleteService } = useService();

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setId(e.target.value);
  };

  const showAll = () => {
    navigate("/");
  };

  const fetchServiceById = () => {
    getServiceById(id);
    setId("");
    navigate(`/service/${id}`);
  };

  const goToEdit = () => {
    navigate("/edit");
  };

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `${resources.SWALDATA.SWALDATA_DELETE_QUESTION_TITLE}`,
        text: `${resources.SWALDATA.SWALDATA_DELETE_QUESTION_TEXT}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `${resources.SWALDATA.SWALDATA_DELETE_CONFIRM_BUTTON}`,
        cancelButtonText: `${resources.SWALDATA.SWALDATA_DELETE_CANCEL_BUTTON}`,
        reverseButtons: true,
        timer: 2000,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let timerInterval;
          Swal.fire({
            icon: "success",
            title: `${resources.SWALDATA.SWALDATA_DELETE_SUCESS}`,
            html: `${resources.SWALDATA.SWALDATA_DELETE_SUCESS_SPAN}`,
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();

              timerInterval = setInterval(() => {}, 500);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then(() => {
            deleteService(service.id);
            navigate("/");
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "No changes has been made",
            "error"
          );
        }
      });
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
        <button onClick={showAll}>
          {resources.BUTTON.BUTTON_PLACEHOLDER_SHOW}
        </button>

        <button>{resources.BUTTON.BUTTON_PLACEHOLDER_ADD} </button>
      </Space>
      <br />
      <br />

      <div className="service-card-container">
        <div className="service-card">
          <div className="service-text">
            <h2>
              <b>{service.title}</b>
            </h2>
      
            <p>
              <b>{resources.SERVICES.SERVICE_PLACEHOLDER_ID}</b> {service.id}
            </p>
            <p><b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_SERVICE}</b> {service.type}
            </p>
            <p> <b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_START}</b> {service.start}
            </p>
            <p><b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_DONE} </b>{service.done}
            </p>
           
            <p>
              <b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_CUSTOMER}</b>{" "}
              {service.customer}
            </p>
            <p><b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_COUNTRY}</b> {service.country}
            </p>
            <p>
              <b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_CITY}</b> {service.city}
            </p>
            <p><b>
              {resources.SERVICES.SERVICE_PLACEHOLDER_STATUS}</b> {service.status}
            </p>
        

       <div className="button-group">
            <button type="primary" onClick={goToEdit}>
              {resources.BUTTON.BUTTON_PLACEHOLDER_EDIT}
            </button>
                        <button
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
              type="primary"
            >
              {resources.BUTTON.BUTTON_PLACEHOLDER_DELETE}
            </button>

        </div>
          </div>
          <div className="service-img">
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
