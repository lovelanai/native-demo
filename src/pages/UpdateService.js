import { DatePicker, Form, Switch, Select, Input, Button } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../Context/service.context";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next"

import "../Style/Form.sass";

const UpdateService = () => {
  const { t, i18n } = useTranslation("translation");
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
      title: `${t("SWALDATA.EDIT_SUCCESS")}`,
      html: `${t("SWALDATA.EDIT_SUCCESS_SPAN")}`,
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
        status: "FORMDATA.STATUS_ONGOING",
      });
    } else {
      setService({
        ...service,
        status: "FORMDATA.STATUS_NOTSTARTED"
      });
    }
  };

  return (
    <div className="form">
      <h1>{t("TITLE.EDIT")}</h1>
      <Form
        className="form-content"
        layout="vertical"
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Item
        label={t("FORMDATA.TITLE")}
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
    label={t("FORMDATA.TYPE")}        >
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
            <Select.Option value="FORMDATA.TYPE_PAVEMENT">
                    {t("FORMDATA.TYPE_PAVEMENT")}
            </Select.Option>
            <Select.Option value="FORMDATA.TYPE_CONCRETE">
                     {t("FORMDATA.TYPE_CONCRETE")}
            </Select.Option>
            <Select.Option value="FORMDATA.TYPE_FOUNDATIONING">
        {t("FORMDATA.TYPE_FOUNDATIONING")}
            </Select.Option>
            <Select.Option value="FORMDATA.TYPE_INFRA_SERVICE">
               {t("FORMDATA.TYPE_INFRA_SERVICE")}
            </Select.Option>
          </Select>
        </Form.Item>
        <div className="date-container">
          <Form.Item
               label={t("FORMDATA.START")}
          >
            <DatePicker
            disabled={formDisabled}
            placeholder= {t("FORMDATA.SELECT-DATE")}
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
           label={t("FORMDATA.END")}
          >
            <DatePicker
            disabled={formDisabled}
            placeholder= {t("FORMDATA.SELECT-DATE")}
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
              t("FORMDATA.CUSTOMER")
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
        label={t("FORMDATA.COUNTRY")}
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
            <Select.Option value="FORMDATA.COUNTRIES_SWEDEN">
                  {t("FORMDATA.COUNTRIES_SWEDEN")}
            </Select.Option>
            <Select.Option value="FORMDATA.COUNTRIES_DENMARK">
                {t("FORMDATA.COUNTRIES_DENMARK")}
            </Select.Option>
            <Select.Option value="FORMDATA.COUNTRIES_NORWAY">
                {t("FORMDATA.COUNTRIES_NORWAY")}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
            label={t("FORMDATA.CITY")}
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
            <Select.Option value="FORMDATA.CITIES_STOCKHOLM">
               {t("FORMDATA.CITIES_STOCKHOLM")}
            </Select.Option>
            <Select.Option value="FORMDATA.CITIES_COPENHAGEN">
                       {t("FORMDATA.CITIES_COPENHAGEN")}
            </Select.Option>
            <Select.Option value="FORMDATA.CITIES_OSLO">
                          {t("FORMDATA.CITIES_OSLO")}
            </Select.Option>
          </Select>
        </Form.Item>

        <div
          label={t("FORMDATA.STATUS")}
          valuePropName="checked"
          name="status"
        >
          <div className="status-container">
            <p style={{ margin: "0 0.5rem" }}>
       {t("FORMDATA.STATUS_NOTSTARTED")}
            </p>

            <Switch
            disabled={formDisabled}
              onChange={handleSwitch}
              defaultChecked={service.status === "Ongoing" ? true : false}
            />

            <p style={{ margin: "0 0.5rem" }}>
            {t("FORMDATA.STATUS_ONGOING")}
            </p>
          </div>
        </div>
        <div className="edit-form-button-div">
          <Button
          style={{ color: "#153275", borderRadius: "1rem", border: "2px solid #153275", fontWeight: "bold", padding: ".5rem", display: "flex", justifyContent: "center", alignItems: "center"}}
          disabled={formDisabled}
            className="edit-form-buttons"
            onClick={() => {
              handleSubmit();
            }}
          >
            {t("BUTTON.SUBMIT")}
          </Button>
          <button
            className="edit-form-buttons cancel-button"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("BUTTON.CANCEL")}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateService;
