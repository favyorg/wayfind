import { useContext } from "react";
import { RouterContext } from "./RouterContext";

export const RouterContent: React.FC = () => useContext(RouterContext)?.routeContent();
