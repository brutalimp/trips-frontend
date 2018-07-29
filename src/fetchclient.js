import axios from 'axios';

const fetchClient = () => {
    const defaultOptions = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);
    // Set the AUTH token for any request
    instance.interceptors.request.use(config => {
        config.baseURL = 'http://localhost:8091';
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();