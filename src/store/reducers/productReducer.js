import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  images: [],
  price: 0,
  categoryOptions: [],
  category: "",
  subCategories: [],
  subCategoryOptions: [],
  selectedSubCategories: [],
  showSubCategories: false,
  shipping: [],
  quantity: 0,
  color: "",
  sold: 0,
};

export const productSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    CHANGE_INPUT: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
    CHANGE_IMAGE: (state, action) => {
      const { public_id, secure_url, thumbnail_url } = action.payload;
      return {
        ...state,
        images: [...state.images, { public_id, secure_url, thumbnail_url }],
      };
    },
    DELETE_IMAGE: (state, action) => {
      console.log(state.images);
      return {
        ...state,
        images: state.images.filter((i) => i.public_id !== action.payload),
      };
    },
    SET_CATEGORY_OPTIONS: (state, action) => {
      let categories = action.payload.map((i) => ({
        _id: i._id,
        name: i.name,
      }));
      return { ...state, categoryOptions: categories };
    },
    SHOW_SUBCATEGORIES: (state, action) => {
      return { ...state, showSubCategories: true };
    },
    SET_SUBCATEGORIES_OPTIONS: (state, action) => {
      let subCategoryOptions = action.payload.map((i) => ({
        label: i.name,
        value: i._id,
      }));
      return {
        ...state,
        subCategoryOptions,
      };
    },

    SET_SELECTED_OPTIONS: (state, action) => {
      return {
        ...state,
        selectedSubCategories: [...action.payload],
      };
    },
    SET_SUB_CATEGORIES: (state, action) => {
      return {
        ...state,
        subCategories: [...action.payload],
      };
    },
    RESET: () => initialState,
  },
});

export const {
  CHANGE_INPUT,
  CHANGE_IMAGE,
  SET_CATEGORY_OPTIONS,
  SHOW_SUBCATEGORIES,
  SET_SUBCATEGORIES_OPTIONS,
  SET_SELECTED_OPTIONS,
  SET_SUB_CATEGORIES,
  DELETE_IMAGE,
  RESET,
} = productSlice.actions;
export default productSlice.reducer;

const data = {
  api: "mtop.daraz.merchant.product.publish.category.async",
  data: {
    data: [
      {
        path: ["Fashion", "Women"],
        spell: "Women",
        idpath: [1819, 1820],
        name: "Women",
        disabled: false,
        id: 1820,
        leaf: false,
      },
      {
        path: ["Fashion", "Men"],
        spell: "Men",
        idpath: [1819, 1854],
        name: "Men",
        disabled: false,
        id: 1854,
        leaf: false,
      },
      {
        path: ["Fashion", "Girls"],
        spell: "Girls",
        idpath: [1819, 6554],
        name: "Girls",
        disabled: false,
        id: 6554,
        leaf: false,
      },
      {
        path: ["Fashion", "Boys"],
        spell: "Boys",
        idpath: [1819, 6593],
        name: "Boys",
        disabled: false,
        id: 6593,
        leaf: false,
      },
      {
        path: ["Fashion", "Unisex"],
        spell: "Unisex",
        idpath: [1819, 10001925],
        name: "Unisex",
        disabled: false,
        id: 10001925,
        leaf: false,
      },
      {
        path: ["Fashion", "Kids Unisex"],
        spell: "Kids Unisex",
        idpath: [1819, 10001926],
        name: "Kids Unisex",
        disabled: false,
        id: 10001926,
        leaf: false,
      },
    ],
    errorCodes: [],
    extra: {},
    ignore: true,
    showReporter: false,
  },
  ret: ["SUCCESS::调用成功"],
  v: "1.0",
};

const data1 = {
  api: "mtop.daraz.merchant.product.publish.category.async",
  data: {
    data: [
      {
        path: ["Fashion", "Men", "Clothing", "Sweaters & Cardigans"],
        spell: "Sweaters & Cardigans",
        idpath: [1819, 1854, 1782, 1783],
        name: "Sweaters & Cardigans",
        disabled: false,
        id: 1783,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Jackets & Coats"],
        spell: "Jackets & Coats",
        idpath: [1819, 1854, 1782, 1786],
        name: "Jackets & Coats",
        disabled: false,
        id: 1786,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Jeans"],
        spell: "Jeans",
        idpath: [1819, 1854, 1782, 1789],
        name: "Jeans",
        disabled: false,
        id: 1789,
        leaf: true,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Suits"],
        spell: "Suits",
        idpath: [1819, 1854, 1782, 1796],
        name: "Suits",
        disabled: false,
        id: 1796,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Swimwear"],
        spell: "Swimwear",
        idpath: [1819, 1854, 1782, 1799],
        name: "Swimwear",
        disabled: false,
        id: 1799,
        leaf: true,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Pants"],
        spell: "Pants",
        idpath: [1819, 1854, 1782, 1800],
        name: "Pants",
        disabled: false,
        id: 1800,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Casual Tops"],
        spell: "Casual Tops",
        idpath: [1819, 1854, 1782, 1803],
        name: "Casual Tops",
        disabled: false,
        id: 1803,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Innerwear"],
        spell: "Innerwear",
        idpath: [1819, 1854, 1782, 1804],
        name: "Innerwear",
        disabled: false,
        id: 1804,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Shirts"],
        spell: "Shirts",
        idpath: [1819, 1854, 1782, 4211],
        name: "Shirts",
        disabled: false,
        id: 4211,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Polo T-Shirts"],
        spell: "Polo T-Shirts",
        idpath: [1819, 1854, 1782, 10001966],
        name: "Polo T-Shirts",
        disabled: false,
        id: 10001966,
        leaf: true,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Traditional Clothing"],
        spell: "Traditional Clothing",
        idpath: [1819, 1854, 1782, 10002979],
        name: "Traditional Clothing",
        disabled: false,
        id: 10002979,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Shorts"],
        spell: "Shorts",
        idpath: [1819, 1854, 1782, 9689],
        name: "Shorts",
        disabled: false,
        id: 9689,
        leaf: false,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Socks"],
        spell: "Socks",
        idpath: [1819, 1854, 1782, 9693],
        name: "Socks",
        disabled: false,
        id: 9693,
        leaf: true,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Hoodies & Sweatshirts"],
        spell: "Hoodies & Sweatshirts",
        idpath: [1819, 1854, 1782, 9701],
        name: "Hoodies & Sweatshirts",
        disabled: false,
        id: 9701,
        leaf: true,
      },
      {
        path: ["Fashion", "Men", "Clothing", "Tracksuits"],
        spell: "Tracksuits",
        idpath: [1819, 1854, 1782, 20000163],
        name: "Tracksuits",
        disabled: false,
        id: 20000163,
        leaf: true,
      },
    ],
    errorCodes: [],
    extra: {},
    ignore: true,
    showReporter: false,
  },
  ret: ["SUCCESS::调用成功"],
  v: "1.0",
};
