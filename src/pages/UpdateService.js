import { DatePicker, Form, Switch, Select, Input, Button } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../Context/service.context";
import Swal from "sweetalert2";
import { resources } from "../resource";
import "../Style/Form.sass";

const UpdateService = () => {
  const navigate = useNavigate();
  const { service, setService, updateService, formDisabled } = useService();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = () => {
    updateService();

    let timerInterval = Swal.fire({
      icon: "success",
      title: `${resources.SWALDATA.SWALDATA_EDIT_SUCESS}`,
      html: `${resources.SWALDATA.SWALDATA_EDIT_SUCESS_SPAN}`,
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

  const handleSwitch = (checked) => {
    if (checked) {
      setService({
        ...service,
        status: resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_ONGOING,
      });
    } else {
      setService({
        ...service,
        status: resources.FORMDATA_PLACEHOLDER_STATUS_NOTSTARTED,
      });
    }
  };

  return (
    <div className="form">
      <h1>{resources.TITLES.TITLES_PLACEHOLDER_EDIT}</h1>
      <Form
        className="form-content"
        layout="vertical"
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_TITLE}
        >
          <Input
          disabled={formDisabled}
            className="input"
            name="title"
            defaultValue={service.title}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_TYPE}
        >
          <Select
          disabled={formDisabled}
            className="select"
            type="select"
            name="type"
            defaultValue={service.type}
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
            disabled={formDisabled}
              className="input"
              name="start"
              type="dateString"
              defaultValue={moment(service.start)}
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
            disabled={formDisabled}
              className="input"
              name="done"
              type="dateString"
              defaultValue={moment(service.done)}
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
          <Input
          disabled={formDisabled}
            className="input"
            defaultValue={service.customer}
            onChange={handleInputChange}
            name="customer"
          />
        </Form.Item>

        <Form.Item
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_COUNTRY}
        >
          <Select
          disabled={formDisabled}
            className="select"
            type="select"
            name="country"
            defaultValue={service.country}
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
          disabled={formDisabled}
            className="select"
            type="select"
            name="city"
            defaultValue={service.city}
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "city" } })
            }
          >
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

        <div
          label={resources.FORMDATA.FORMDATA_PLACEHOLDER_LABELS_PROJECT_STATUS}
          valuePropName="checked"
          name="status"
        >
          <div className="status-container">
            <p style={{ margin: "0 0.5rem" }}>
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_NOTSTARTED}
            </p>

            <Switch
            disabled={formDisabled}
              onChange={handleSwitch}
              defaultChecked={service.status === "Ongoing" ? true : false}
            />

            <p style={{ margin: "0 0.5rem" }}>
              {resources.FORMDATA.FORMDATA_PLACEHOLDER_STATUS_ONGOING}
            </p>
          </div>
        </div>
        <div className="edit-form-button-div">
          <Button
          disabled={formDisabled}
            className="edit-form-buttons"
            onClick={() => {
              handleSubmit();
            }}
          >
            {resources.BUTTON.BUTTON_PLACEHOLDER_SUBMIT}
          </Button>
          <button
            className="edit-form-buttons cancel-button"
            onClick={() => {
              navigate("/");
            }}
          >
            {resources.BUTTON.BUTTON_PLACEHOLDER_CANCEL}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateService;
