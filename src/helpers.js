
export const mainProducts = [
  "10 Pair Pro",
  "10 Pair Eco",
  "3D 7 PAIR ",
  "5 PAIR HUMAN ",
  "3 PAIR GORGEOUS EYELASHES ",
  "3 PAIR NEW HUMAN ",
  "1 PAIR 3D SILK ",
  "1 PAIR 3D EYELASHES ",
  "5D 1 PAIR ",
  "6D 1 PAIR MINK",
  "1 PAIR PRO ",
  "1 PAIR MINK",
  "1 PAIR HUMAN ",
  " 1 PAIR HUMAN OLD ",
  "1 PAIR HUMAN NAME ",
  "1 PAIR GMF ",
  "1 PAIR REMY ",
  "1 PAIR FANTASY ",
  "BRUSH OLD BRUSH ",
  "GALA PROFESSIONAL BRUSH ",
];

export const navItems = [
  {
    label: "All Products",
    href: "/products",
  },
  {
    label: "Categories",
    href: "/categories",
  },
];

export const getSubstring = (text, substringEnd) => {
  return text?.length > substringEnd
    ? `${text?.substring(0, substringEnd)}...`
    : text;
};

export const calculateItemsTotal = (items) => {
  return items
    .map((item) => ({ price: item.price, count: item.count }))
    .reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.count,
      0
    );
};

export const formatPrice = (value) => {
  return value.toFixed(2);
};

export const calculateShipping = (subTotal) => {
  if (subTotal < 500) return 50;
  if (subTotal < 700) return 70;
  return 100;
};

export const getProductsProperly = (products) => {
  let res = [];
  const allProducts = products.map(({ name }) => name);
  mainProducts.flatMap((p) => {
    let variants = [];
    allProducts.map(
      (a) => a.includes(p) && variants.push(a.replace(p, "").trim())
    );
    res.push({ name: p, variants });
  });
  res = res.filter(({ variants }) => variants.length > 0);

  allProducts
    .filter(
      (elementA) =>
        !mainProducts
          .map((substringB) => elementA.includes(substringB))
          .includes(true)
    )
    .map((a) => res.push({ name: a }));

  res = res.map(({ name, variants }) => ({
    ...products.find((product) => product.name.includes(name)),
    variants: variants?.map((variant) =>
      ({...products.find(
        (product) =>
          product.name.includes(name) && product.name.includes(variant)
      ), variant})
    ),
    name,
  }));
  
  return res;
};
 export const getVariantsFor = (product) =>{
  return mainProducts.find((name) => product.name.includes(name))
 }