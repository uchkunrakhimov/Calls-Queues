import { FC, useEffect, useState } from "react";
import { Select, Form, Checkbox, Button, Space, Upload } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { FaTrash, FaUpload } from "react-icons/fa6";
import type { UploadProps } from "antd";
import { storedActiveTabKey } from "../../hooks";
import { PerformRequests } from "../../utils";
import { useFetchGreeting } from "../../hooks";

const Disaster: FC = () => {
  const [selectedGreeting, setSelectedGreeting] = useState<string | undefined>(
    "noselect"
  );
  const [disasterChecked, setDisasterChecked] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const { greetingFiles, greetingSettings } = useFetchGreeting();

  const {
    performGreeting,
    performRemoveGreeting,
    uploadRequest,
    contextHolder,
  } = PerformRequests();

  const handleChange = (value: string) => {
    setSelectedGreeting(value);
  };

  const checkDisaster = (e: CheckboxChangeEvent) => {
    setDisasterChecked(e.target.checked);
  };

  const fetchGreetingSettings = () => {
    if (greetingSettings && greetingSettings.disaster) {
      setDisasterChecked(true);
    } else {
      setDisasterChecked(false);
    }

    if (greetingSettings && greetingSettings.file) {
      setSelectedGreeting(greetingSettings.file.id);
    } else {
      setSelectedGreeting("noselect");
    }
  };

  const props: UploadProps = {
    name: "file",
    showUploadList: false,
    customRequest: ({ file }) => {
      uploadRequest(file, setLoader);
    },
  };

  useEffect(() => {
    fetchGreetingSettings();
  }, [storedActiveTabKey]);

  return (
    <Form>
      {contextHolder}
      <Form.Item style={{ marginBottom: "0" }}>
        <text>Приветственное аудио</text>
      </Form.Item>
      <Form.Item style={{ marginBottom: "0" }}>
        <Space wrap>
          <Select
            defaultValue="noselect"
            value={selectedGreeting}
            onChange={handleChange}
            loading={loader}
            style={{ width: 200 }}
          >
            <Select.Option
              key="noselect"
              value="noselect"
              style={{ marginBottom: "5px" }}
            >
              -- Не выбрано --
            </Select.Option>
            <Select.Option key="upload" value="upload">
              <Upload {...props}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaUpload style={{ height: "16px" }} />
                  <span style={{ marginLeft: "5px" }}>Загрузить новый</span>
                </span>
              </Upload>
            </Select.Option>
            {greetingFiles?.map((file: any) => (
              <Select.Option key={file.id} value={file.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#111",
                    padding: "5px",
                    marginTop: "5px",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    {file.name}
                  </span>
                  <span
                    onClick={() => {
                      performRemoveGreeting(
                        file.id,
                        setSelectedGreeting,
                        setLoader
                      );
                    }}
                  >
                    <FaTrash />
                  </span>
                </div>
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            htmlType="submit"
            onClick={() => {
              performGreeting({
                action: "select",
                queue: storedActiveTabKey,
                disaster: disasterChecked,
                ...(selectedGreeting !== "noselect" && {
                  fileId: Number(selectedGreeting),
                }),
              });
            }}
          >
            Сохранить
          </Button>
        </Space>
      </Form.Item>
      <Form.Item style={{ margin: "0 0 1rem 0" }}>
        <Checkbox
          onChange={checkDisaster}
          checked={disasterChecked}
          style={{ fontWeight: "400" }}
        >
          Disaster
        </Checkbox>
      </Form.Item>
    </Form>
  );
};

export { Disaster };
