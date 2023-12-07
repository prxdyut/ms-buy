'use client'
import { IContext, IProduct, IState, ItemKey } from "@src/model";
import React, { createContext, ReactNode, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { groq } from "next-sanity";
import { client } from "@utils/sanity.client";

export const AppContext = createContext<IContext>(null as any);

interface IAppContextProviderProps {
  children: ReactNode;
}

const initialState: IState = {
  cart: [],
  wishlist: [],
  checkout: [],
};

const AppContextProvider: React.FC<IAppContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useLocalStorage<IState>({
    key: "ms-buy",
    defaultValue: initialState,
  });

  const addItem = async (key: ItemKey, productId: string, count?: number) => {
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

    if (res.instock >= itemCount) {
      setState((prevState) => ({
        ...prevState,
        [key]: [...prevState[key], { ...res, count: itemCount }],
      }));
      return true;
    } else {
      alert("The Product is Out of Stock.");
      return false;
    }
  };

  const removeItem = (key: ItemKey, productId: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: prevState[key].filter((item) => item.id !== productId),
    }));
  };

  const increaseCount = async (
    key: ItemKey,
    productId: string,
    callback: () => void
  ) => {
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

  const forceUpdate = async (key: ItemKey, productId: string) => {
    const query = groq`*[_type == "product" && _id == $id][0].instock`;
    const instock = await client.fetch(query, { id: productId });
    const items = [...state[key]];
    const index = items.findIndex((item) => item.id === productId);
    items[index].count = instock;
    setState((prevState) => ({ ...prevState, [key]: items }));
  };

  const decreaseCount = (key: ItemKey, productId: string) => {
    const items = [...state[key]];
    const index = items.findIndex((item) => item.id === productId);
    if (items[index].count > 1) {
      items[index].count -= 1;
    }
    setState((prevState) => ({ ...prevState, [key]: items }));
  };

  const resetItems = (key: ItemKey) => {
    setState((prevState) => ({
      ...prevState,
      [key]: [],
    }));
  };

  const isAdded = (key: ItemKey, productId: string): boolean => {
    return state[key].some((item) => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        increaseCount,
        decreaseCount,
        isAdded,
        resetItems,
        forceUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
