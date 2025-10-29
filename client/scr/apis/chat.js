import axios from 'axios';
const API = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { Authorization: token },
  });
export const acessCreate = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const data = await API(token).post('/api/chat', body);
    return data;
  } catch (error) {
    console.log('error in access create api');
  }
};
export const fetchAllChats = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).get('/api/chat');
    return data;
  } catch (error) {
    console.log('error in fetch all chats api');
  }
};
