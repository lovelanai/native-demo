import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { useService } from "../Context/service.context";

const AddServices = () => {
  /* const navigate = useNavigate(); */

  const { service, setService, createService } = useService();

  const handleSubmit = () => {
    createService(service);
  };

  const handleInputChange = (e, checked) => {
    let { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  return (
    <div>
      <h1>Add new service</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Item label="Project Name">
          <Input name="title" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Select type of service">
          <Select
            type="select"
            name="type"
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
            onChange={(date, dateString) =>
              handleInputChange({
                target: { value: date && dateString, name: "done" },
              })
            }
            picker="month"
          />
        </Form.Item>
        <Form.Item label="Customer">
          <Input onChange={handleInputChange} name="customer" />
        </Form.Item>

        <Form.Item label="Select Country">
          <Select
            type="select"
            name="country"
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
            <Switch defaultChecked={false} />
            <p style={{ margin: "0 0.5rem" }}>Ongoing</p>
          </div>
        </Form.Item>
        <Form.Item label="Button">
          <Button onClick={handleSubmit}>Add</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddServices;
