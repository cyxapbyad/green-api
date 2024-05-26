import axios from 'axios';
import { notification } from 'antd';

export const GreenAPI = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (error, description, placement) => {
    api.error({
      message: `Error ${error}`,
      description: description + ' (see the console for details)',
      placement,
    });
  };

  const API_URL = 'https://1103.api.green-api.com';

  return {
    contextHolder: contextHolder,
    getSettings: async (idInstance, apiTokenInstance) => {
      try {
        return await axios.get(`${API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`);
      } catch (e) {
        console.log(e);
        openNotification(e.code, e.message, 'bottomRight');
      }
    },
    getStateInstance: async (idInstance, apiTokenInstance) => {
      try {
        return await axios.get(`${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
      } catch (e) {
        console.log(e);
        openNotification(e.code, e.message, 'bottomRight');
      }
    },
    sendMessage: async (idInstance, apiTokenInstance, body) => {
      try {
        return await axios.post(`${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, body);
      } catch (e) {
        console.log(e);
        openNotification(e.code, e.message, 'bottomRight');
      }
    },
    sendFileByUrl: async (idInstance, apiTokenInstance, body) => {
      try {
        return await axios.post(`${API_URL}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, body);
      } catch (e) {
        console.log(e);
        openNotification(e.code, e.message, 'bottomRight');
      }
    },
  };
};
