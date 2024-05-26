import axios from 'axios';
import { notification } from 'antd';

export const GreenAPI = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description, placement) => {
    api[type]({
      message,
      description: type === 'error' ? description + ' (see the console for details)' : description,
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
        openNotification('error', e.code, e.message, 'bottomRight');
      }
    },
    getStateInstance: async (idInstance, apiTokenInstance) => {
      try {
        return await axios.get(`${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
      } catch (e) {
        console.log(e);
        openNotification('error', e.code, e.message, 'bottomRight');
      }
    },
    sendMessage: async (idInstance, apiTokenInstance, body) => {
      try {
        const result = await axios.post(`${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, body);
        openNotification('success', 'Info', 'The message was sent successfully', 'bottomRight');
        return result;
      } catch (e) {
        console.log(e);
        openNotification('error', e.code, e.message, 'bottomRight');
      }
    },
    sendFileByUrl: async (idInstance, apiTokenInstance, body) => {
      try {
        const result = await axios.post(`${API_URL}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, body);
        openNotification('success', 'Info', 'The message was sent successfully', 'bottomRight');
        return result;
      } catch (e) {
        console.log(e);
        openNotification('error', e.code, e.message, 'bottomRight');
      }
    },
  };
};
