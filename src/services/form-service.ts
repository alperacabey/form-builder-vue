import { ResponseModel } from "@/store/state";
import axios, { AxiosInstance } from "axios";

interface IFormService {
  api: AxiosInstance;
}

class FormService implements IFormService {
  api = axios.create({
    baseURL: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getInitialForm() {
    return this.api.get(`/api/form-builder`);
  }

  getForm(uuid: string) {
    return this.api.get(`/api/form?uuid=${uuid}`);
  }

  postForm(params: ResponseModel) {
    return this.api.post("/api/form", params);
  }
}

export default new FormService();
