import { GetterTree } from "vuex";
import { State, ResponseModel, Item } from "./state";

export type Getters = {
  loading(state: State): boolean;
  getResponseModel(state: State): ResponseModel;
  getFormItems(state: State): Array<Item>;
};

export const getters: GetterTree<State, State> & Getters = {
  loading(state) {
    return state.loading;
  },
  getResponseModel(state) {
    return state.responseModel;
  },
  getFormItems(state) {
    return state.responseModel.checklist.form?.items[0]?.items || [];
  },
};
