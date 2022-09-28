import { DatePicker, Form, Switch, Select } from "antd";
import { useService } from "../Context/service.context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resources } from "../resource";
import "../Style/Form.sass";
import { useEffect } from "react";

const AddServices = () => {
  const navigate = useNavigate();

  const { service, setService, createService } = useService();

  const handleSubmit = () => {
    createService(service);

    let timerInterval = Swal.fire({
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
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate("/");
      }
    });
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setService({ ...service, [name]: value });
    console.log(service)
  };

  const handleSwitch = (checked) => {
    if (checked) {
      setService({
        ...service,
        status: resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_ONGOING
      });
    } else {
      setService({
        ...service,
        status: resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_NOTSTARTED
      });
    }
  };

  useEffect(() => {
    handleSwitch()
  console.log("hej")
  }, []);

  return (
    <div className="form">
      <h1>{resources.TITLES.TITLES_PLACEHOLDER_ADD}</h1>
      <Form
        className="form-content"
        layout="vertical"
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_TITLE}
        >
          <input className="input" name="title" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_TYPE}
        >
          <Select
            className="select"
            type="select"
            name="type"
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "type" } })
            }
          >
  
            <Select.Option value="Pavement">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_TYPE_PAVEMENT}
            </Select.Option>
            <Select.Option value="Concrete">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_TYPE_CONCRETE}
            </Select.Option>
            <Select.Option value="Foundation">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_TYPE_FOUNDATIONING}
            </Select.Option>
            <Select.Option value="Infra Service">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_TYPE_INFRA_SERVICE}
            </Select.Option>
          </Select>
        </Form.Item>
        <div className="date-container">
          <Form.Item
            label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_START}
          >
            <DatePicker
              name="start"
              className="input"
              type="dateString"
              onChange={(date, dateString) =>
                handleInputChange({
                  target: { value: date && dateString, name: "start" },
                })
              }
            />
          </Form.Item>

          <Form.Item
            label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_END}
          >
            <DatePicker
              name="done"
              className="input"
              type="dateString"
              onChange={(date, dateString) =>
                handleInputChange({
                  target: { value: date && dateString, name: "done" },
                })
              }
            />
          </Form.Item>
        </div>
        <Form.Item
          label={
            resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_CUSTOMER
          }
        >
          <input
            className="input"
            onChange={handleInputChange}
            name="customer"
          />
        </Form.Item>

        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_COUNTRY}
        >
          <Select
            className="select"
            type="select"
            name="country"
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "country" } })
            }
          >
            <Select.Option value="Sweden">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_COUNTRIES_SWEDEN}
            </Select.Option>
            <Select.Option value="Denmark">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_COUNTRIES_DENMARK}
            </Select.Option>
            <Select.Option value="Norway">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_COUNTRIES_NORWAY}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_CITY}
        >
          <Select
            type="select"
            name="city"
            className="select"
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "city" } })
            }
          >
            <Select.Option value=""></Select.Option>
            <Select.Option value="Stockholm">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_CITIES_STOCKHOLM}
            </Select.Option>
            <Select.Option value="Copenhagen">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_CITIES_COPENHAGEN}
            </Select.Option>
            <Select.Option value="Oslo">
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_CITIES_OSLO}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_STATUS}
          valuePropName="checked"
          name="status"
        >
          <div className="status-container">
            <p style={{ margin: "0 0.5rem" }}>
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_NOTSTARTED}
            </p>
            <Switch defaultChecked={false} onChange={handleSwitch}/>
            <p style={{ margin: "0 0.5rem" }}>
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_ONGOING}
            </p>
          </div>
        </Form.Item>
        <div className="add-form-button-div">
          <button onClick={handleSubmit}>
            {resources.BUTTON.BUTTON_PLACEHOLDER_SUBMIT}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddServices;
