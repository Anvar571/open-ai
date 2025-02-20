import axios from 'axios';

const API_URL = 'https://open-ai-yns3.onrender.com/chat';

export async function sendRequest() {
  console.log('Cron job started.');
  try {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('API request error:', error);
  }
}
