import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from './components/NotFound/NotFound';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Login from "./components/login/Login";
import { AuthContextProvider } from "./Context/AuthStore";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/ProductDetiels/ProductDetiels";
import { CartContextProvider } from "./Context/CartStore";
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";
import { WishlistContextProvider } from "./Context/WishlistStore";
import WishList from "./components/WishList/WishList";
import Categories from "./components/Categories/Categories";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import Brands from "./components/Brands/Brands";
import BrandProducts from "./components/BrandProducts/BrandProducts";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Verifycode from "./components/Verifycode/Verifycode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
 
const router = createHashRouter( 
  [
    { path: '' , element: <Layout/> , children: [
      {path: '' , element: <ProtectedRoute>
        <Home/>
        </ProtectedRoute> },
      {path: 'home' , element: <ProtectedRoute>
        <Home/>
        </ProtectedRoute> },
      {path: 'Categories' , element: <ProtectedRoute>
        <Categories/>
        </ProtectedRoute> },
      {path: 'Categories/:CategoryId' , element: <ProtectedRoute>
        <CategoryProducts/>
        </ProtectedRoute> },
      {path: 'Brands' , element: <ProtectedRoute>
        <Brands/>
        </ProtectedRoute> },
      {path: 'Brands/:brandId' , element: <ProtectedRoute>
        <BrandProducts/>
        </ProtectedRoute> },
      {path: 'productDetails/:id' , element: <ProtectedRoute>
        <ProductDetails/>
        </ProtectedRoute> },
      {path: 'cart' , element: <ProtectedRoute>
        <Cart/>
        </ProtectedRoute> },
      {path: 'payment' , element: <ProtectedRoute>
        <Payment/>
        </ProtectedRoute> },
      {path: 'allorders' , element: <ProtectedRoute>
        <AllOrders/>
        </ProtectedRoute> },
      {path: 'WishList' , element: <ProtectedRoute>
        <WishList/>
        </ProtectedRoute> },
      {path: 'Register' , element: <Register/>},
      {path: 'Login' , element: <Login/>},
      {path: 'ForgetPassword' , element: <ForgetPassword/>},
      {path: 'verifycode' , element: <Verifycode/>},
      {path: 'ResetPassword' , element: <ResetPassword/>},
      {path: '*' , element: <NotFound/>},
    ]}
  ]
)


function App() {
  const myQueryClient =  new QueryClient()
  return <>
  <QueryClientProvider client={myQueryClient}>

  <AuthContextProvider>

    <CartContextProvider>
      <WishlistContextProvider>

      <RouterProvider router={router}/>
      </WishlistContextProvider>
      
    </CartContextProvider>

  </AuthContextProvider>

  </QueryClientProvider>
  <Toaster   position="top-right"/>
  <Offline>
    <div className="bg-black text-white p-4 top-50 position-fixed text-uppercase text-center w-100 ">
        you are offline check your internet
    </div>
  </Offline>
  </>
}

export default App;
