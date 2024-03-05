import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthStore";

export const wishListStore = createContext();

export function WishlistContextProvider({ children }) {
  const {token} = useContext(AuthContext)
  const [countWishList, setCount] = useState(0);
  const [productWish, setProductWishList] = useState(null);
  const [productWishIds, setproductWishIds] = useState([]);
  const productWishIdsArry = [];
  function getUserWishlist() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((res) => {
        setCount(res.data.count);
        setProductWishList(res.data.data);
        setproductWishIds([])
        for(let i =  0 ; i < res.data.data.length ; i++) {
            productWishIdsArry.push(res.data.data[i].id);
            setproductWishIds(productWishIdsArry)
        }
        // setproductWishIds((test))
      })
      .catch((err) => {
        console.log("err", err);
        setProductWishList([]);
      });
  }
  function addToWishlist(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      }
    ).then((res)=> {
        getUserWishlist()
    })
  }
  function deleteProduct(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
      headers: {
        token : localStorage.getItem('tkn')
      }
    })
    .then(()=> {
        getUserWishlist()
    })
  }
  useEffect(function () {
    getUserWishlist();
  }, [token]);
  return (
    <>
      <wishListStore.Provider
        value={{
          countWishList,
          productWish,
          addToWishlist,
          deleteProduct,
          productWishIds,
        }}
      >
        {children}
      </wishListStore.Provider>
    </>
  );
}
