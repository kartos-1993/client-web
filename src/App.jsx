import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { currentUser } from "./api/auth";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "./store/reducers/userReducer";
import { UserDashboard, Order, Wishlist, Account } from "./Pages/User";
import { Auth, PasswordUpdate, PasswordReset } from "./components/Auth";

import NavBar from "./components/Navbar/Header";
const Home = lazy(() => import("./Pages/Home"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./Pages/Admin/Category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./Pages/Admin/Category/CategoryUpdate")
);
const SubCategoryCreate = lazy(() =>
  import("./Pages/Admin/SubCategory/SubCategoryCreate")
);
const SubCategoryUpdate = lazy(() =>
  import("./Pages/Admin/SubCategory/SubCategoryUpdate")
);
const ProductCreate = lazy(() => import("./Pages/Admin/Product/ProductCreate"));
const ProductAttributeCreate = lazy(() =>
  import("./Pages/Admin/ProductAttribute/ProductAttibuteCreate")
);
const ProductAttributeUpdate = lazy(() =>
  import("./Pages/Admin/ProductAttribute/ProductAttributeUpdate")
);
import AuthProtectedUser from "./components/Routes/AuthProtected";
import "bootswatch/dist/lux/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

import "./App.css";
import styled from "styled-components";
import { KitSpinner } from "./kit";
import PrivacyPolicy from "./Pages/Privacypolicy";

console.log(import.meta.env.NODE_ENV);

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        const { accessToken, photoURL } = res;

        currentUser(accessToken)
          .then((res) => {
            console.log("current user response", res);
            dispatch(
              LOGGED_IN_USER({
                name: res.data.name,
                role: res.data.role,
                email: res.data.email,
                token: accessToken,
                _id: res.data._id,
                photoURL,
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });

    return unSubscribe();
  }, []);

  return (
    <AppWrapper>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<KitSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/** admin route start */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={<KitSpinner />}>
                  <AuthProtectedUser>
                    <AdminDashboard />
                  </AuthProtectedUser>
                </Suspense>
              }
            >
              <Route
                path="category"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <CategoryCreate />
                  </Suspense>
                }
              />
              <Route
                path="category/:slug"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <CategoryUpdate />
                  </Suspense>
                }
              />
              <Route
                path="sub"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <SubCategoryCreate />
                  </Suspense>
                }
              />
              <Route
                path="sub/:slug"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <SubCategoryUpdate />
                  </Suspense>
                }
              />
              <Route
                path="product"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <ProductCreate />
                  </Suspense>
                }
              />
              <Route
                path="product-attribute"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <ProductAttributeCreate />
                  </Suspense>
                }
              />

              <Route
                path="product-attribute/:slug"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <ProductAttributeUpdate />
                  </Suspense>
                }
              />
              <Route
                path="password-update"
                element={
                  <Suspense fallback={<KitSpinner />}>
                    <PasswordUpdate />
                  </Suspense>
                }
              />
            </Route>
            {/** admin route end */}

            <Route path="password-reset" element={<PasswordReset />} />
            <Route path="/auth" element={<Auth />} />
            {/** user route start */}
            <Route path="privacypolicy" element={<PrivacyPolicy />} />

            <Route
              path="/user"
              element={
                <AuthProtectedUser>
                  <UserDashboard />
                </AuthProtectedUser>
              }
            >
              <Route path="order" element={<Order />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="account" element={<Account />} />
            </Route>
            {/** admin route end */}

            <Route path="*" element={<h1>There's nothing here: 404!</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  position: relative;
`;

const UserSideNav = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: orangered;
`;

const Section = styled.section`
  display: flex;
`;
