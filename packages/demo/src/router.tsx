import { createRouter, route } from "@favy/wayfind";
import { Redirect } from "./routerComponent";
import { Suspense, lazy } from "react";

function delayForDemo<T>(promise: Promise<T>) {
  return new Promise<T>((resolve) => setTimeout(resolve, 2000, promise));
}

export const UserId = lazy(() => delayForDemo(import("./lazy")));

const UserIdPage = () => {
  return (
    <Suspense fallback={<div className='text-purple-500 text-2xl'>Loading component...</div>}>
      <UserId />
    </Suspense>
  );
};

const root = route({
  "/": {
    "/users": {
      "/{id:number}?page={p:string}": UserIdPage,
    },
    "/posts": () => (
      <div>
        redirecting
        <Redirect to='/' />
      </div>
    ),
    "/logs/{page}": () => {
      throw "random error " + Date.now();
    },
    error: ({ error }) => <div style={{ color: "red" }}>Throw error: {`${error}`}</div>,
    render: () => <div>render root</div>,
  },
  "/a": { "/b": { "/c": { "/d": () => 1 } } },
  404: () => <div className='text-7xl text-red-400'>Not found</div>,
});

export const router = createRouter(root);
