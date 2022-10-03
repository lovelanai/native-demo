import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useService } from "../Context/service.context";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../Style/Form.sass";

const AddServices = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();

  const { service, setService, createService, formDisabled } = useService();

  console.log(formDisabled);

  const handleSubmit = () => {
    createService();

    let timerInterval = Swal.fire({
      icon: "success",
      title: `${t("SWALDATA.ADD_SUCCESS")}`,
      html: `${t("SWALDATA.ADD_SUCCESS_SPAN")}`,
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
    console.log(service);
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
        status: "FORMDATA.STATUS_NOTSTARTED",
      });
    }
  };

  useEffect(() => {
    handleSwitch();
  }, []);

  return (
    <div className="form">
      <h1>{t("TITLE.ADD")}</h1>
      <Form
        className="form-content"
        layout="vertical"
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Item label={t("FORMDATA.TITLE")}>
          <Input
            disabled={formDisabled}
            className="input"
            name="title"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label={t("FORMDATA.TYPE")}>
          <Select
            disabled={formDisabled}
            className="select"
            type="select"
            name="type"
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
          <Form.Item label={t("FORMDATA.START")}>
            <DatePicker
              disabled={formDisabled}
              name="start"
              className="input"
              placeholder={t("FORMDATA.SELECT-DATE")}
              type="dateString"
              onChange={(date, dateString) =>
                handleInputChange({
                  target: { value: date && dateString, name: "start" },
                })
              }
            />
          </Form.Item>

          <Form.Item label={t("FORMDATA.END")}>
            <DatePicker
              disabled={formDisabled}
              name="done"
              placeholder={t("FORMDATA.SELECT-DATE")}
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
        <Form.Item label={t("FORMDATA.CUSTOMER")}>
          <Input
            disabled={formDisabled}
            className="input"
            onChange={handleInputChange}
            name="customer"
          />
        </Form.Item>

        <Form.Item label={t("FORMDATA.COUNTRY")}>
          <Select
            disabled={formDisabled}
            className="select"
            type="select"
            name="country"
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

        <Form.Item label={t("FORMDATA.CITY")}>
          <Select
            disabled={formDisabled}
            type="select"
            name="city"
            className="select"
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

        <Form.Item
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
              defaultChecked={false}
              onChange={handleSwitch}
            />
            <p style={{ margin: "0 0.5rem" }}>{t("FORMDATA.STATUS_ONGOING")}</p>
          </div>
        </Form.Item>
        <div className="add-form-button-div">
          <Button
            style={{
              color: "#153275",
              borderRadius: "1rem",
              border: "2px solid #153275",
              fontWeight: "bold",
              padding: ".5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={formDisabled}
            onClick={handleSubmit}
          >
            {t("BUTTON.SUBMIT")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddServices;
