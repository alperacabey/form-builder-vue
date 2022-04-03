import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State, ResponseModel, Item } from "./state";
import formService from "@/services/form-service";
import { AxiosResponse } from "axios";
// import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { useToast } from "vue-toastification";
const toast = useToast();

export enum ActionTypes {
  FetchInitialForm = "FETCH_INITIAL_FORM",
  FetchForm = "FETCH_FORM",
  UpdateFormItems = "UPDATE_FORM_ITEMS",
  SubmitForm = "SUBMIT_FORM",
  SubmitQuestionnaire = "SUBMIT_QUESTIONNAIRE"
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};
export type Actions = {
  [ActionTypes.FetchInitialForm](context: ActionAugments): void;
  [ActionTypes.FetchForm](context: ActionAugments, uuid: string): void;
  [ActionTypes.UpdateFormItems](
    context: ActionAugments,
    payload: Array<Item>
  ): void;
  [ActionTypes.SubmitForm](
    context: ActionAugments,
    payload: ResponseModel
  ): void;
  [ActionTypes.SubmitQuestionnaire](
    context: ActionAugments,
    payload: ResponseModel
  ): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FetchInitialForm]({ commit }) {
    commit(MutationType.SetLoading, true);
    try {
      const response: AxiosResponse = await formService.getInitialForm();
      commit(MutationType.SetForm, response.data);
    } catch {
      toast.error("Unexpected error!");
    }
    commit(MutationType.SetLoading, false);
  },
  async [ActionTypes.FetchForm]({ commit }, uuid) {
    commit(MutationType.SetLoading, true);
    try {
      const response: AxiosResponse = await formService.getForm(uuid);
      if (response.status === 200) {
        commit(MutationType.SetForm, response.data);
        commit(MutationType.SetLoading, false);
      }
    } catch {
      toast.error("Form not found!");
    }
    commit(MutationType.SetLoading, false);
  },
  async [ActionTypes.SubmitForm]({ commit }, payload) {
    commit(MutationType.SetLoading, true);
    try {
      const response: AxiosResponse = await formService.postForm(payload);
      if (response.status === 200)
        toast.success("Form submitted successfully!");
    } catch {
      toast.error("Unexpected error!");
    }

    commit(MutationType.SetLoading, false);
  },
  async [ActionTypes.SubmitQuestionnaire]({ commit }, payload) {
    commit(MutationType.SetLoading, true);
    try {
      const response: AxiosResponse = await formService.postQuestionnaire(payload);
      if (response.status === 200)
        toast.success("Questionnaire submitted successfully!");
    } catch {
      toast.error("Unexpected error!");
    }

    commit(MutationType.SetLoading, false);
  },
  [ActionTypes.UpdateFormItems]({ commit }, payload) {
    commit(MutationType.UpdateFormItems, payload);
  },
};
