import { RequestModel } from "@/store/state";
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

  postForm(params: RequestModel) {
    return this.api.post("/api/form", params);
  }

  postQuestionnaire(params: RequestModel) {
    return this.api.post("/api/questionnaire", params);
  }
}

export default new FormService();
