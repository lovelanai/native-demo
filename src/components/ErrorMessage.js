import {Alert, Space, Button} from 'antd'
import { useService } from "../Context/service.context";
import { resources } from "../resource";


export default function ErrorMessage () {
   
    const { errorMessage } = useService();

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <>
{errorMessage === true ? (
    <>
    <Alert
    style={{width: '15rem'}}
    className="error-message"
    message="You're offline"
    type="warning"
    action={
      <Space>
        <Button size="small" type="ghost" onClick={refreshPage}>
          Reconnect
        </Button>
      </Space>
    }
    closable
    />
</>) 
: 
(<></>)}
</>

)}
