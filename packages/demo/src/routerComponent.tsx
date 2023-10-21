import { getComponents } from "@favy/wayfind-react";
import { router } from "./router";

export const { Link, Redirect, useVar, useIsActive, useNavigate } = getComponents(router, {
  Link: {
    default: {
      className: "px-4 py-2 text-medium",
    },
    active: {
      className: "bg-blue-200",
    },
  },
});
