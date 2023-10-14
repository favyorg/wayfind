import { getComponents } from "@favy/wayfind-react";
import { router } from "./router";

// router.go("/users/{id}?page={p}", {
//   id: 1,
//   p: "5",
// });
// router.go("/");
// router.go("/", {});
// type pp = (typeof router)["paths"];
// type xx = (typeof router)["var"];
// const d: xx = "/logs/123";
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
