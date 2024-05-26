import axios from 'axios';

export const GreenAPI = () => {
  const API_URL = 'https://1103.api.green-api.com';

  return {
    getSettings: async (idInstance, apiTokenInstance) => {
      try {
        return await axios.get(`${API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`);
      } catch (e) {
        console.log(e);
      }
    },
    getStateInstance: async (idInstance, apiTokenInstance) => {
      try {
        return await axios.get(`${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
      } catch (e) {
        console.log(e);
      }
    },
    sendMessage: async (idInstance, apiTokenInstance, body) => {
      try {
        return await axios.post(`${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, body);
      } catch (e) {
        console.log(e);
      }
    },
    sendFileByUrl: async (idInstance, apiTokenInstance, body) => {
      try {
        return await axios.post(`${API_URL}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, body);
      } catch (e) {
        console.log(e);
      }
    },
  };
};
