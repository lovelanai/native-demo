import { DatePicker, Form, Switch, Input, Button, Select } from "antd";
import { useService } from "../Context/service.context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../Style/Form.sass";
import { useEffect} from "react";
import { useTranslation } from "react-i18next";



const AddServices = () => {
  const { t, i18n } = useTranslation("translation");
  const navigate = useNavigate();

  const { service, setService, createService, formDisabled} = useService();

  console.log(formDisabled)

  const handleSubmit = () => {
    createService();

    let timerInterval = Swal.fire({
      icon: "success",
      title: `${t("SWALDATA.DELETE_SUCESS")}`,
      html: `${t("SWALDATA.DELETE_SUCESS_SPAN")}`,
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
        status: `${t("FORMDATA.STATUS_ONGOING")}`,
      });
    } else {
      setService({
        ...service,
        status: `${t("FORMDATA.PLACEHOLDER_STATUS_NOTSTARTED")}`,
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
        <Form.Item
          label={t("FORMDATA.TITLE")}
        >
          <Input disabled={formDisabled} className="input" name="title" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          label={t("FORMDATA.TYPE")}
        >
          <Select
            disabled={formDisabled}
            className="select"
            type="select"
            name="type"
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "type" } })
            }
          >
            <Select.Option value="Pavement">
              {t("FORMDATA.TYPE_PAVEMENT")}
            </Select.Option>
            <Select.Option value="Concrete">
              {t("FORMDATA.TYPE_CONCRETE")}
            </Select.Option>
            <Select.Option value="Foundation">
              {t("FORMDATA.TYPE_FOUNDATIONING")}
            </Select.Option>
            <Select.Option value="Infra Service">
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
            label={t("FORMDATA.END")}
          >
            <DatePicker
            disabled={formDisabled}
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
            t("FORMDATA.CUSTOMER")
          }
        >
          <Input
          disabled={formDisabled}
            className="input"
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
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "country" } })
            }
          >
            <Select.Option value="Sweden">
              {t("FORMDATA.SWEDEN")}
            </Select.Option>
            <Select.Option value="Denmark">
              {t("FORMDATA.DENMARK")}
            </Select.Option>
            <Select.Option value="Norway">
              {t("FORMDATA.NORWAY")}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t("FORMDATA.CITY")}
        >
          <Select
          disabled={formDisabled}
            type="select"
            name="city"
            className="select"
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "city" } })
            }
          >
            <Select.Option value=""></Select.Option>
            <Select.Option value="Stockholm">
              {t("FORMDATA.STOCKHOLM")}
            </Select.Option>
            <Select.Option value="Copenhagen">
              {t("FORMDATA.COPENHAGEN")}
            </Select.Option>
            <Select.Option value="Oslo">
              {t("FORMDATA.OSLO")}
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
            <Switch disabled={formDisabled} defaultChecked={false} onChange={handleSwitch} />
            <p style={{ margin: "0 0.5rem" }}>
              {t("FORMDATA.STATUS_ONGOING")}
            </p>
          </div>
        </Form.Item>
        <div className="add-form-button-div">
          <Button style={{ color: "#153275", borderRadius: "1rem", border: "2px solid #153275", fontWeight: "bold", padding: ".5rem", display: "flex", justifyContent: "center", alignItems: "center"}} disabled={formDisabled} onClick={handleSubmit}>
            {t("BUTTON.SUBMIT")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddServices;
