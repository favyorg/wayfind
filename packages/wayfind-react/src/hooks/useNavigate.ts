import { useContext } from "react";
import { RouterContext } from "../RouterContext";

export const makeNavigateHook = <P>() => {
  const useNavigate = () => {
    const ctx = useContext(RouterContext).router;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (props: P) => ctx?.go(props.url, props.vars);
  };

  return useNavigate;
};
