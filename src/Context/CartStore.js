import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthStore";

export const CartContext = createContext();
export function CartContextProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [allProduct, setAllProduct] = useState(null);
  const [numOfCartItem, setnumOfCartItem] = useState(0);
  const [totelPriceOfCartItem, settotelPriceOfCartItem] = useState(0);
  const [cartId, setCartId] = useState(null)
  // const [userId, setUserId] = useState(null)
  async function addProductToCart(id) {
    try {
      const data = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getCartItems();
      return data;
    } catch (e) {
      console.log("err", e);
    }
  }
  function getCartItems() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        // setUserId(res.data.data.cartOwner)
        setCartId(res.data.data._id)
        setAllProduct(res.data.data.products);
        setnumOfCartItem(res.data.numOfCartItems);
        settotelPriceOfCartItem(res.data.data.totalCartPrice);
      })
      .catch((err) => {
        if (err.response.data.message.includes("No cart exist for this user")) {
                  setCartId(null);
                  setAllProduct([]);
                  setnumOfCartItem(0);
                  settotelPriceOfCartItem(0);
        } else {

          console.log("err", err);
        }
        });
  }
  function UpdateCartItems(id, newCount) {
    // const res = await axios
    //   .put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    //     count: newCount,
    //   } , {
    //     headers: {
    //       token : localStorage.getItem('tkn')
    //     }
    //   })
    //   .then((res) => {
    //     setAllProduct(res.data.data.products);
    //     setnumOfCartItem(res.data.numOfCartItems);
    //     settotelPriceOfCartItem(res.data.data.totalCartPrice);
    //     return true;
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     return false;
    //   });
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        setAllProduct(res.data.data.products);
        setnumOfCartItem(res.data.numOfCartItems);
        settotelPriceOfCartItem(res.data.data.totalCartPrice);
      });
  }
  function deleteCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setAllProduct(res.data.data.products);
        setnumOfCartItem(res.data.numOfCartItems);
        settotelPriceOfCartItem(res.data.data.totalCartPrice);
      });
  }
  function clearUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then(() => {
        setAllProduct([]);
        setnumOfCartItem(0);
        settotelPriceOfCartItem(0);
      });
  }
  useEffect(
    function () {
      getCartItems();
    },
    [token]
  );
  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          totelPriceOfCartItem,
          numOfCartItem,
          allProduct,
          UpdateCartItems,
          deleteCartItem,
          clearUserCart,
          cartId,
          // userId,
          getCartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
