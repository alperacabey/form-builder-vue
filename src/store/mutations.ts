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
  UpdateAnswer = "UPDATE_ANSWER",
}

//mutations.ts
export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetForm](state: State, payload: ResponseModel): void;
  [MutationType.UpdateFormItems](state: State, payload: Array<Item>): void;
  [MutationType.AddItem](state: State, type: Type): void;
  [MutationType.DeleteItem](state: State, uuid: string): void;
  [MutationType.UpdateAnswer](state: State, obj: { uuid: string }): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.SetForm](state, payload) {
    state.model = payload;
  },
  [MutationType.UpdateFormItems](state, payload) {
    state.model.checklist.form.items[0].items = payload;
  },
  [MutationType.AddItem](state, type) {
    state.model.checklist.form.items[0].items.push({
      title:
        type +
        " " +
        findTypeCount(state.model.checklist.form.items, type),
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
    state.model.checklist.form.items = removeObjecFromArray(
      state.model.checklist.form.items,
      uuid
    );
  },
  [MutationType.UpdateAnswer](state, obj) {
    const nodes = state.model.checklist.form.items;
    const findNode = (nodes: Array<Item>, uuid: string) =>{
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].uuid === uuid) {
          nodes[i] = { ...nodes[i], ...obj };
          break;
        }
        if (nodes[i].items) {
          findNode(nodes[i].items, uuid);
        }
      }
    }

    findNode(nodes, obj.uuid);

    state.model.checklist.form.items = nodes;
  },
};
