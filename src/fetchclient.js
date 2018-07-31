import axios from 'axios';
import { config as serverConfig } from './config';

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
        let url = '';
        serverConfig.https? url +='https://' : url +='http://';
        url += serverConfig.serverHost + ':' + serverConfig.port+'/';
        config.baseURL = url;
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();