import { useContext } from "react";
import { HomeContext } from "../context/HomeContext";

export default function useHome() {
  return useContext(HomeContext);
}
