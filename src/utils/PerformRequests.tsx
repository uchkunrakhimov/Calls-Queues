import axios from "axios";
import { message } from "antd";
import { storedActiveTabKey } from "../hooks";

type PerformRequestsType = {
  performMemberAction: (actionPayload: any, successMessage: any) => void;
  performChannelAction: (actionPayload: any, successMessage: any) => void;
  performGreeting: (data: any) => void;
  performRemoveGreeting: (
    id: any,
    setSelectedGreeting: any,
    setLoader: any
  ) => void;
  uploadRequest: (file: any, setLoader: any) => void;
  contextHolder: any;
};

const PerformRequests: () => PerformRequestsType = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const performMemberAction = (actionPayload: any, successMessage: any) => {
    axios
      .post(import.meta.env.VITE_MEMBER_API_URL, actionPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        messageApi.success(successMessage);
      })
      .catch((error: any) => {
        messageApi.error(`${error.message}`);
      });
  };

  const performChannelAction = (actionPayload: any, successMessage: any) => {
    axios
      .post(import.meta.env.VITE_CHANNEL_API_URL, actionPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        messageApi.success(successMessage);
      })
      .catch(() => {
        messageApi.error("Запрос не удалось отправить, произошла ошибка");
      });
  };

  const performGreeting = (data: any) => {
    axios
      .post(import.meta.env.VITE_MANAGE_GREETING_API_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        messageApi.success(
          "Настройки сохранены и будут применены через несколько секунд"
        );
      })
      .catch(() => {
        messageApi.error("Произошла ошибка при удалении файла");
      });
  };

  const performRemoveGreeting = (
    id: any,
    setSelectedGreeting: any,
    setLoader: any
  ) => {
    setLoader(true);

    const data = {
      action: "remove",
      queue: storedActiveTabKey,
      fileId: Number(id),
    };

    axios
      .post(import.meta.env.VITE_MANAGE_GREETING_API_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        setSelectedGreeting("noselect");
        setLoader(false);
        messageApi.success("Файл удален");
      })
      .catch(() => {
        messageApi.error("Произошла ошибка при удалении файла");
      });
  };

  const uploadRequest = async (file: any, setLoader: any) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("action", "add");
    formData.append("file", file);
    formData.append("queue", storedActiveTabKey as string);

    await axios
      .post(import.meta.env.VITE_MANAGE_GREETING_API_URL, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        setLoader(false);
        messageApi.success(
          `Файл загружен и будет доступен через несколько секунд`
        );
      })
      .catch(() => {
        setLoader(false);
        messageApi.error(`Ошибка загрузки файла`);
      });
  };

  return {
    performMemberAction,
    performChannelAction,
    performGreeting,
    performRemoveGreeting,
    uploadRequest,
    contextHolder,
  };
};

export { PerformRequests };
