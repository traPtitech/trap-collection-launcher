import axios from '@aspida/axios';
import api from '@api/$api';
import { baseUrl } from '@/config';

export const client = api(axios(undefined, { baseURL: baseUrl }));
