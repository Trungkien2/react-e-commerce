import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const maxPrice = Math.max(...action.payload.map((p) => p.price));
    return {
      ...state,
      all_product: [...action.payload],
      filter_product: [...action.payload],
      filter: { ...state.filter, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_View: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_View: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filter_product, sort } = state;
    let tempProducts = [...filter_product];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filter_product: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filter: { ...state.filter, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_product } = state;
    const { text, category, color, price, shipping,company } = state.filter;
    let tempProducts = [...all_product];
    // filterring
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    if(company !=='all'){
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    if(color!=='all'){
      tempProducts = tempProducts.filter(
        (product) => product.colors.find((c)=>c===color)
      );
    }
    tempProducts = tempProducts.filter(product=> product.price <=price);
    if(shipping){
      tempProducts = tempProducts.filter(
        (product) => product.shipping===true
      );
    }

    return { ...state, filter_product: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filter: {
        ...state.filter,
        text: "",
        company: "all",
        color: "all",
        category: "all",
        price: state.filter.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
