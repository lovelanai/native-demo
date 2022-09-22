import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadServiceById, updateService } from "../redux/actions";

const UpdateService = () => {
  const navigate = useNavigate();
  const { service } = useSelector((state) => state.data);

  const [state, setState] = useState({
    title: service.title,
    type: service.type,
    start: service.start,
    done: service.done,
    customer: service.customer,
    country: service.country,
    city: service.city,
    status: service.status,
  });
  let dispatch = useDispatch();
  const id = service.id;

  useEffect(() => {
    dispatch(loadServiceById(id));
  }, [id, dispatch]);

  const handleInputChange = (e, checked) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateService(state, id));
    navigate("/");
  };

  const handleSwitch = (checked) => {
    if (checked) {
      setState({ ...state, status: "Ongoing" });
    } else {
      setState({ ...state, status: "Not started" });
    }
  };

  return (
    <div>
      <h1>Edit service</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Item label="Project Name">
          <Input
            name="title"
            defaultValue={service.title}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Select type of service">
          <Select
            type="select"
            name="type"
            defaultValue={service.type}
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "type" } })
            }
          >
            <Select.Option value="Pavement">Pavement</Select.Option>
            <Select.Option value="Concrete">Concrete</Select.Option>
            <Select.Option value="Foundation">Foundationing</Select.Option>
            <Select.Option value="Infra Service">Infra Service</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Start">
          <DatePicker
            name="start"
            type="dateString"
            defaultValue={moment(service.start)}
            onChange={(date, dateString) =>
              handleInputChange({
                target: { value: date && dateString, name: "start" },
              })
            }
            picker="month"
          />
        </Form.Item>

        <Form.Item label="End">
          <DatePicker
            name="done"
            type="dateString"
            defaultValue={moment(service.done)}
            onChange={(date, dateString) =>
              handleInputChange({
                target: { value: date && dateString, name: "done" },
              })
            }
            picker="month"
          />
        </Form.Item>
        <Form.Item label="Customer">
          <Input
            defaultValue={service.customer}
            onChange={handleInputChange}
            name="customer"
          />
        </Form.Item>

        <Form.Item label="Select Country">
          <Select
            type="select"
            name="country"
            defaultValue={service.country}
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "country" } })
            }
          >
            <Select.Option value="Sweden">Sweden</Select.Option>
            <Select.Option value="Denmark">Denmark</Select.Option>
            <Select.Option value="Norway">Norway</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Select City">
          <Select
            type="select"
            name="city"
            defaultValue={service.city}
            onChange={(select) =>
              handleInputChange({ target: { value: select, name: "city" } })
            }
          >
            <Select.Option value="Stockholm">Stockholm</Select.Option>
            <Select.Option value="Copenhagen">Copenhagen</Select.Option>
            <Select.Option value="Oslo">Oslo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Projectstatus" valuePropName="checked" name="status">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p style={{ margin: "0 0.5rem" }}>Not started</p>

            <Switch
              onChange={handleSwitch}
              defaultChecked={service.status === "Ongoing" ? true : false}
            />

            <p style={{ margin: "0 0.5rem" }}>Ongoing</p>
          </div>
        </Form.Item>
        <Form.Item label="Button">
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateService;
