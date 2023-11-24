import { User } from "../../Pages/User";

export const adminRoutes = [
  {
    header: "Product",
    detail: [
      { title: "Add Product", link: "/admin/product" },
      { title: "Add Product Attributes", link: "/admin/product-attribute" },
    ],
  },
  {
    header: "Category",
    detail: [
      { title: "Main Category", link: "/admin/category" },
      { title: "Sub Category", link: "/admin/sub" },
    ],
  },
  {
    header: "User",
    detail: [{ title: "Change password", link: "/admin/password-update" }],
  },
];
