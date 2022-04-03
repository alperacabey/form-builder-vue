import { Item, Type } from "@/store/state";

export const removeObjecFromArray = (nodes: Array<Item>, uuid: string) => {
  function findNode(nodes: Array<Item>, uuid: string) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].uuid === uuid) {
        nodes.splice(i, 1);
        break;
      }
      if (nodes[i].items) {
        findNode(nodes[i].items, uuid);
      }
    }
  }
  findNode(nodes, uuid);
  return nodes;
};

export const findTypeCount = (nodes: Array<Item>, type: Type) => {
  let count = 1;
  function findNode(nodes: Array<Item>, type: string) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].type === type) {
        count++;
      }
      if (nodes[i].items) {
        findNode(nodes[i].items, type);
      }
    }
  }
  findNode(nodes, type);
  return count;
};

export const isValidForm = (nodes: Array<Item>) => {
  let isValid = true;
  function findNode(nodes: Array<Item>) {
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i].responded && nodes[i].type == 'question') isValid = false;
      if (nodes[i].items) {
        findNode(nodes[i].items);
      }
    }
  }
  findNode(nodes);
  return isValid;
};
