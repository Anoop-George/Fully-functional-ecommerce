const initialState = {
  items: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOCART": {
      return { items: [...state.items, action.payload] };
    }
    case "DELETE": {
      return {
        items: [...state.items.filter((item) => item.uuid != action.payload)]
      };
    }
    case "REMOVEALLITEMS": {
      return { items: [] };
    }
    default:
      return state;
  }
};

export default cart;
