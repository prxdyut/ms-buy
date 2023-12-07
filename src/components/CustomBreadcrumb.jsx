import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IBreadcrumbItem } from "@src/model";
import Link from "next/link";

export const CustomBreadcrumb = ({ items = [] }) => {
  return (
    <>
      {items.length > 0 && (
        <p className=" flex gap-2 mb-2 text-sm font-semibold ">
          {items.map((item, index) => (
            <>
              <p>
                {index !== items.length - 1 ? (
                  <Link href={item.link} key={index} className="text-dark hover:text-black hover:underline underline-offset-2">
                    {item.name}
                  </Link>
                ) : (
                  <p key={index} className="text-dark">
                    {item.name}
                  </p>
                )}
              </p>
              {index !== items.length - 1 && <p>{'/'}</p>}
            </>
          ))}
        </p>
      )}
    </>
  );
};
