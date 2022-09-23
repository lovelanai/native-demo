import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { useService } from "../Context/service.context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddServices = () => {
  const navigate = useNavigate();

  const { service, setService, createService } = useService();

  const handleSubmit = () => {
    createService(service);

    let timerInterval = Swal.fire({
      icon: "success",
      title: "New service added!",
      html: "Redirecting to homepage...",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {}, 500);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        navigate("/");
      }
    });
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSwitch = (checked) => {
    if (checked) {
      setService({ ...service, status: "Ongoing" });
    } else {
      setService({ ...service, status: "Not started" });
    }
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
            <Switch defaultChecked={false} onChange={handleSwitch} />
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
