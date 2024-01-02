"use client";
import { IContext, IProduct, IState, ItemKey } from "@src/model";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { groq } from "next-sanity";
import { client } from "@utils/sanity.client";
import { usePathname, useRouter } from "next/navigation";

export const AppContext = createContext();
const initialState = {
  store: {},
  cart: [],
  wishlist: [],
  checkout: [],
};
const AppContextProvider = ({ children }) => {
  const [state, setState] = useLocalStorage({
    key: "ms-buy",
    defaultValue: initialState,
  });

  const [store, setStore] = useState({});

  useEffect(() => {
    client
      .fetch(
        groq`*[_type == "settings"][0]
      { 
        productInfo,
        "logo" : {
          "footer": logo.footer.asset -> {
            url,
            "height" : metadata.dimensions.height, 
            "width": metadata.dimensions.width
          },
          "header": logo.header.asset -> {
            url, 
            "height" : metadata.dimensions.height, 
            "width": metadata.dimensions.width
          }
        }
      }`
      )
      .then((res) => setStore(res));
  }, []);

  const addItem = async (key, productId, count) => {
    const itemCount = count || 1;
    const query = groq`*[_type == "product" && _id == $id][0] {
      "id": _id,
      name,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      category->{
        name,
      },
      instock,
      price
    }`;
    const res = await client.fetch(query, { id: productId });

    setState((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], { ...res, count: itemCount }],
    }));
    return true;
  };

  const removeItem = (key, productId) => {
    setState((prevState) => ({
      ...prevState,
      [key]: prevState[key].filter((item) => item.id !== productId),
    }));
  };

  const setPromoCode = (code) => {
    setState((prevState) => ({
      ...prevState,
      ["promo"]: code,
    }));
  };

  const increaseCount = async (key, productId, callback) => {
    const query = groq`*[_type == "product" && _id == $id][0].instock`;
    const instock = await client.fetch(query, { id: productId });
    const items = [...state[key]];
    const index = items.findIndex((item) => item.id === productId);
    const name = items[index]?.name;

    if (instock >= items[index].count + 1) {
      items[index].count += 1;
      setState((prevState) => ({ ...prevState, [key]: items }));
      callback();
      return true;
    } else {
      alert(`Only ${instock}, ${name} in Stock`);
      callback();
      return false;
    }
  };

  const forceUpdate = async (key, productId) => {
    const query = groq`*[_type == "product" && _id == $id][0].instock`;
    const instock = await client.fetch(query, { id: productId });
    const items = [...state[key]];
    const index = items.findIndex((item) => item.id === productId);
    items[index].count = instock;
    setState((prevState) => ({ ...prevState, [key]: items }));
  };

  const decreaseCount = (key, productId) => {
    const items = [...state[key]];
    const index = items.findIndex((item) => item.id === productId);
    if (items[index].count > 1) {
      items[index].count -= 1;
    }
    setState((prevState) => ({ ...prevState, [key]: items }));
  };

  const resetItems = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: [],
    }));
  };

  const resetPromo = () => {
    setState((prevState) => ({
      ...prevState,
      promo: {},
    }));
  };

  const isAdded = (key, productId) => {
    return state[key].some((item) => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        store,
        addItem,
        removeItem,
        increaseCount,
        decreaseCount,
        isAdded,
        resetItems,
        forceUpdate,
        setPromoCode,
        resetPromo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
