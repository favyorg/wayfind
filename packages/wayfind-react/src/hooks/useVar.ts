import { useContext } from "react";
import { RouterContext } from "../RouterContext";

export const makeVarHook = <T>() => {
    const useVar = (): T => useContext(RouterContext).router?.var;

    return useVar
}