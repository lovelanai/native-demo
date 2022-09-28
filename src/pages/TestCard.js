import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import concreteImg from "../Assets/concrete.jpg";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";
import "../Style/Service.sass";
import Swal from "sweetalert2";
import { resources } from "../resource";
import "./TestCard.sass";

export default function TestCard() {
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
    <div className="card-container">
      <div className="card">
        <div className="card-text">
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
            {resources.SERVICES.SERVICE_PLACEHOLDER_CUSTOMER} {service.customer}
          </p>
          <p>
            {resources.SERVICES.SERVICE_PLACEHOLDER_COUNTRY} {service.country}
          </p>
          <p>
            {resources.SERVICES.SERVICE_PLACEHOLDER_CITY} {service.city}
          </p>
          <p>
            {resources.SERVICES.SERVICE_PLACEHOLDER_STATUS} {service.status}
          </p>
        </div>
        <div className="card-image">
          <img className="type-img" src={pavementImg} alt="Pavement" />

          <button
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
            type="primary"
          >
            {resources.BUTTON.BUTTON_PLACEHOLDER_DELETE}
          </button>

          <button type="primary" onClick={goToEdit}>
            {resources.BUTTON.BUTTON_PLACEHOLDER_EDIT}
          </button>
        </div>
      </div>
    </div>
  );
}
