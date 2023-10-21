import { RouterContent } from "@favy/wayfind-react";
import "./index.css";
import { Router } from "@favy/wayfind-react";
import { createRoot } from "react-dom/client";
import { useIsActive, useNavigate, Link } from "./routerComponent";
import { router } from "./router";

const Head = () => {
  const isActiveRoot = useIsActive("/");
  const go = useNavigate();

  return (
    <div className='w-full bg-blue-100 p-5 text-2xl flex gap-20 text-gray-800 items-center'>
      useIsActive("/") = {isActiveRoot.toString()}{" "}
      <button
        className='bg-blue-400 rounded-md px-4 py-2 shadow-md'
        onClick={() =>
          go({
            to: "/users/{id}?page={p}",
            vars: {
              id: 42,
              p: 2,
            },
          })
        }
      >
        go to "/"
      </button>
    </div>
  );
};

function App() {
  return (
    <Router router={router}>
      <Head></Head>
      <div className='p-2 px-4 text-xl'>
        <div className='flex gap-4'>
          <Link to='/'>/</Link>
          <Link to='/posts'>/posts</Link>
          <Link to='/users'>/users</Link>
          <Link to='/users/{id}?page={p}' vars={{ id: 42, p: 2 }}>
            /users/42
          </Link>
          <Link to='/logs/{page}' vars={{ page: 10 }}>
            /logs/10
          </Link>
        </div>

        <div className='p-2 mt-2 outline outline-orange-400'>
          <RouterContent />
        </div>
      </div>
    </Router>
  );
}

createRoot(document.querySelector("#root")!).render(<App />);
