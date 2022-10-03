import { Alert, Space, Button } from "antd";
import { useService } from "../Context/service.context";
//import { resources } from "../resource";
import { useTranslation } from "react-i18next";

export default function ErrorMessage() {
  const { t } = useTranslation("translation");

  const { errorMessage } = useService();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {errorMessage === true ? (
        <>
          <Alert
            style={{ width: "15rem" }}
            className="error-message"
            message={`${t("ERRORMESSAGE.MESSAGE")}`}
            type="warning"
            action={
              <Space>
                <Button size="small" type="ghost" onClick={refreshPage}>
                  {t("ERRORMESSAGE.ERRORBTN")}
                </Button>
              </Space>
            }
            closable
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
