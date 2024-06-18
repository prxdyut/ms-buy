"use client";
import { AppContext } from "@src/context/AppContext";
import React, {
  startTransition,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

  import Lightbox from "yet-another-react-lightbox";
  import "yet-another-react-lightbox/styles.css";
export function ProductImage({ image, name}) {
  const [id] = useState(Math.random());
  const { store } = useContext(AppContext);

  return (
      <div
        style={{
          background:'white',
          aspectRatio: "1/1",
          maxWidth: '90vw',
          maxHeight: '80vh'
        }}
        className="resultPit cursor-pointer"
      >
        <div
          style={{
            position: "relative",
            justifyContent: "space-evenly",
            display: "flex",
            height: "100%",
          }}
          id="image_preview"
          className="img_container"
        >
          <img
            className="resultPit overlay"
            style={{
              position: "absolute",
              height: "3rem",
              left: "1rem",
              top: "1rem",
              width: "auto",
              height: "1.8rem",
            }}
            src={store?.logo?.header?.url}
          />
          <span
            className="resultPit"
            style={{
              position: "absolute",
              right: "0rem",
              bottom: ".5rem",
              padding: "4px 8px",
              paddingRight: ".8rem",
              borderRadius: "0.6rem 0 0 0.6rem",
              background: "black",
              color: "white",
              fontSize: "0.6rem",
            }}
          >
            www.galaeyelashes.in
          </span>

          <span
            className="resultPit"
            style={{
              position: "absolute",
              left: ".6rem",
              bottom: ".5rem",
              paddingBlock: "4px",
              fontSize: "0.6rem",
              fontWeight: "700",
            }}
          >
            {name}
          </span>
          <img
            className="resultPit"
            id={"output" + id}
            alt="Result Image"
            style={{ objectFit: "contain" }}
            src={image}
          />
        </div>
      </div>
  );
}
