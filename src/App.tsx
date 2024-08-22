import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Search from "./components/pages/Search";
import RatingsAndReview from "./components/pages/RatingsAndReview";
const FilterScreen = lazy(() => import("./components/pages/FilterScreen"));
const Orders = lazy(() => import("./components/pages/Account/Orders"));
const Profile = lazy(() => import("./components/pages/Account/Profile"));
const Cart = lazy(() => import("./components/pages/Cart"));
const Checkout = lazy(() => import("./components/pages/Checkout"));
const ForgotPassword = lazy(
  () => import("./components/pages/Forms/ForgotPassword")
);
const Home = lazy(() => import("./components/pages/Home"));
const Login = lazy(() => import("./components/pages/Forms/Login"));
const OrderItemPage = lazy(() => import("./components/pages/OrderItemPage"));
const Product = lazy(() => import("./components/pages/Product"));
const ResetPassword = lazy(
  () => import("./components/pages/Forms/ResetPassword")
);
const SignUp = lazy(() => import("./components/pages/Forms/SignUp"));
const Dashboard = lazy(() => import("./components/pages/Admin/Dashboard"));
const AdminOrders = lazy(() => import("./components/pages/Admin/AdminOrders"));
const AdminOrderListItems = lazy(
  () => import("./components/pages/Admin/AdminOrderListItems")
);
const AdminProductPage = lazy(
  () => import("./components/pages/Admin/AdminProductPage")
);
const CreateProduct = lazy(
  () => import("./components/pages/Admin/CreateProduct")
);
const AdminBrands = lazy(() => import("./components/pages/Admin/AdminBrands"));
const AdminCategories = lazy(
  () => import("./components/pages/Admin/AdminCategories")
);
const AdminUsers = lazy(() => import("./components/pages/Admin/AdminUsers"));
const AdminLogin = lazy(
  () => import("./components/pages/Admin/Auth/AdminLogin")
);
const AdminSignUp = lazy(
  () => import("./components/pages/Admin/Auth/AdminSignUp")
);
const UpdateProduct = lazy(
  () => import("./components/pages/Admin/UpdateProduct")
);
const Page404 = lazy(() => import("./components/pages/Page404"));
const AdminLists = lazy(() => import("./components/pages/Admin/AdminLists"));

const App = () => {

  const location = useLocation();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ratings/:id" element={<RatingsAndReview />} />

          {/* Profile */}
          <Route path="/account" element={<Profile />} />
          <Route path="/my-order" element={<Orders />} />
          <Route path="/order-lists/:id" element={<OrderItemPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProductPage />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route
            path="/admin-order-items/:id"
            element={<AdminOrderListItems />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/filter" element={<FilterScreen />} />
          <Route path="/admin/brands" element={<AdminBrands />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/admins" element={<AdminLists />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />

          {/* Not found page (404) */}
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
