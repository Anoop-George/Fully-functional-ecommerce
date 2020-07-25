import { v4 as uuidv4 } from "uuid";

const add = (item, quantity) => {
  return {
    type: "ADDTOCART",
    payload: {
      uuid: uuidv4(),
      id: item.id,
      image: item.photo,
      name: item.name,
      price: item.price,
      quantity: quantity,
    },
  };
};

const remove = (item) => {
  return {
    type: "DELETE",
    payload: item,
  };
};

const removeall = () => {
  return {
    type: "REMOVEALLITEMS",
  };
};

export default { add, remove, removeall };
