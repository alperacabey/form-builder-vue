import { MutationTree } from "vuex";
import { State, ResponseModel, Item, Type } from "@/store/state";
import { v4 as uuid } from "uuid";
import { removeObjecFromArray, findTypeCount } from "@/utils";

export enum MutationType {
  SetLoading = "SET_LOADING",
  SetForm = "SET_FORM",
  UpdateFormItems = "UPDATE_FORM_ITEMS",
  AddItem = "ADD_NEW_ITEM",
  DeleteItem = "DELETE_ITEM",
}

//mutations.ts
export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetForm](state: State, payload: ResponseModel): void;
  [MutationType.UpdateFormItems](state: State, payload: Array<Item>): void;
  [MutationType.AddItem](state: State, type: Type): void;
  [MutationType.DeleteItem](state: State, uuid: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.SetForm](state, payload) {
    state.responseModel = payload;
  },
  [MutationType.UpdateFormItems](state, payload) {
    state.responseModel.checklist.form.items[0].items = payload;
  },
  [MutationType.AddItem](state, type) {
    state.responseModel.checklist.form.items[0].items.push({
      title:
        type +
        " " +
        findTypeCount(state.responseModel.checklist.form.items, type),
      uuid: uuid(),
      type,
      items: [],
      params: { response_set: "1bf277e2-79fc-4d38-81b5-ca3c8ecbbb9d" },
      notes_allowed: Math.random() < 0.5,
      photos_allowed: Math.random() < 0.5,
      issues_allowed: Math.random() < 0.5,
      responded: false,
    });
  },
  [MutationType.DeleteItem](state, uuid) {
    state.responseModel.checklist.form.items = removeObjecFromArray(
      state.responseModel.checklist.form.items,
      uuid
    );
  },
};
