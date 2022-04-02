import { ResponseModel } from '@/store/state';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface IFormService {
  api: AxiosInstance;
  getForm: ()=> Promise<AxiosResponse>;
}

class FormService implements IFormService {
  api = axios.create({
    baseURL: '/',
    headers: {
      'Content-Type': 'application/json',
    },
  })


  getForm() {
    return this.api.get('/api/form');
  }

  postForm(params : ResponseModel){
    return this.api.post('/api/form', params)
  }
}

export default new FormService();

