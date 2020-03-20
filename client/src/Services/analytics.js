import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/analytics'
});

const transactions = async (data) => {
  try {
    
    const result = await instance.post('/all', data);
    const outcomes = result.data.outcomes;
    console.log(outcomes);
    return outcomes;
} catch (error) {
    throw error;
  }
};


export {
  transactions 
};
