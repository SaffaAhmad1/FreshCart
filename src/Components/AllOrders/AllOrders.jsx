import React, { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

export default function AllOrders() {
  

  return (
    <h2 className="text-3xl text-center my-36 flex justify-center items-center">
      <i className="fa-solid fa-check font-bold text-white me-2 size-9 rounded-full bg-green-500 flex justify-center items-center"></i>{" "}
      Payment completed successfully
    </h2>
  );
}
