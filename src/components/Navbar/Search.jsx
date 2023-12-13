"use client";
import { AccountIcon, BagIcon, SearchIcon } from "../Icons";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const query = groq`
    *[_type == "product" && (name match $searchText || description match $searchText) ] {
      name, price,
      "id": _id,
      "slug": slug.current,
        category->{
            name
        }
    } [0...3]
`;
const Loading = (
  <div role="status">
    <svg
      aria-hidden="true"
      className="inline w-4 h-4 text-grey animate-spin fill-black"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
);
export default function Search({
  SearchisFocused,
  setSearchisFocused,
  input,
  setInput,
}) {
  const searchText = input;
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const path = usePathname();

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await client.fetch(query, {
      searchText: `*${searchText}*`,
    });
    setProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText.trim().length >= 3) {
        fetchProducts();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchText]);

  const search = (e) => {
    if (e.key === "Enter") {
      router.push(`/search/${input}`);
    }
  };

  return (
    <div className="relative">
      <input
        className={` max-lg:hidden bg-grey rounded-full h-10 pl-10 px-4 text-sm transition-all w-[-webkit-fill-available] ${
          SearchisFocused ? "lg:w-96" : "lg:w-40"
        } `}
        value={input}
        id="input-search"
        onChange={(e) => setInput(e.target.value)}
        type="search"
        name="search"
        placeholder="SEARCH"
        onFocus={() => setSearchisFocused(true)}
        onBlur={() => setSearchisFocused(false)}
        onKeyDown={search}
      />
      <input
        className={`lg:hidden bg-grey rounded-full h-10 pl-10 px-4 text-sm transition-all w-[-webkit-fill-available]`}
        value={input}
        onBlur={() => setSearchisFocused(false)}
        id="input-search"
        onChange={(e) => setInput(e.target.value)}
        type="search"
        name="search"
        placeholder="SEARCH"
        onKeyDown={search}
      />
      <button type="submit" class={`absolute left-0 top-0 mt-3 ml-4`}>
        <SearchIcon />
      </button>
      <div
        className={`top-12 z-50 absolute transition-all overflow-hidden rounded w-full py-2 border-grey bg-white ${
          input != "" && SearchisFocused
            ? "lg:w-96 shadow-2xl"
            : "lg:w-40 px-0 py-0 opacity-0"
        }`}
      >
        <p className="text-xs uppercase   flex gap-2  px-4 ">
          Suggestions {isLoading && Loading}
        </p>
        <ul className="mt-2">
          <li>
            <Link
              href={`/search/${input}`}
              className=" px-4 py-2 hover:bg-grey flex gap-2 items-center"
              onClick={() => {
                setSearchisFocused(false);
                setInput("");
              }}
            >
              <p>{input}</p>
            </Link>
          </li>
          {products.map((product) => (
            <li>
              <Link
                href={`/products/${product.slug}`}
                className=" px-4 py-2 hover:bg-grey flex gap-2 items-center"
                onClick={() => {
                  setSearchisFocused(false);
                  setInput("");
                }}
              >
                {" "}
                <SearchIcon />
                <p>{product.name}</p>
                <p className="  text-xs"> in {product.category.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
