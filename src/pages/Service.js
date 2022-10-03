import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import concreteImg from "../Assets/concrete.png";
import foundationImg from "../Assets/foundationing.jpg";
import infraServiceImg from "../Assets/infra-service.jpg";
import pavementImg from "../Assets/pavement.jpg";
import { useService } from "../Context/service.context";
import "../Style/Service.sass";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";



const Service = () => {
    const { t, i18n } = useTranslation("translation");
   const { getServiceById, id, setId, service, deleteService } = useService();

   const navigate = useNavigate();

   const onChangeInput = (e) => {
     setId(e.target.value);
   };

   const showAll = () => {
     navigate("/");
   }
   const fetchServiceById = () => {
     getServiceById(id);
     setId("");
     navigate(`/service/${id}`);
   }
   const goToEdit = () => {
     navigate(`/edit/${service.id}`);
   }
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
         title:  `${t("SWALDATA.QUESTION")}`,
         text: `${t("SWALDATA.QUESTION_TEXT")}`,
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: `${t("SWALDATA.CONFIRM_BUTTON")}`,
         cancelButtonText: `${t("SWALDATA.CANCEL_BUTTON")}`,
         reverseButtons: true,
         timer: 2000,
       })
       .then((result) => {
         if (result.isConfirmed) {
           let timerInterval;
           Swal.fire({
             icon: "success",
             title: `${t("SWALDATA.DELETE_SUCCESS")}`,
             html: `${t("SWALDATA.DELETE_SUCCESS_SPAN")}`,
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
        <button onClick={showAll}>
                {t("BUTTON.SHOW")}
      
        </button>

        <button>{t("BUTTON.ADD")}</button>
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
              <b>     {t("SERVICES.ID")}</b> {service.id}
            </p>
            <p><b>
                   {t("SERVICES.SERVICE")}</b> {t(`${service.type}`)}
            </p>
            <p> <b>
             {t("SERVICES.START")}</b> {service.start}
            </p>
            <p><b>
             {t("SERVICES.DONE")} </b>{service.done}
            </p>
           
            <p>
              <b>
              {t("SERVICES.CUSTOMER")}</b>{" "}
              {service.customer}
            </p>
            <p><b>
             {t("SERVICES.COUNTRY")}</b>     {t(`${service.country}`)}
            </p>
            <p>
              <b>
              {t("SERVICES.CITY")}</b>     {t(`${service.city}`)}
            </p>
            <p><b>
             {t("SERVICES.STATUS")}</b> {t(`${service.status}`)}
            </p>
        

       <div className="button-group">
            <button type="primary" onClick={goToEdit}>
             {t("BUTTON.EDIT")}
            </button>
                        <button
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
              type="primary"
            >
              {t("BUTTON.DELETE")}
            </button>

        </div>
          </div>
          <div className="service-img">
            {service.type === "FORMDATA.TYPE_PAVEMENT" ? (
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
