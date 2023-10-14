import { useContext } from "react";
import { RouterContext } from "../RouterContext";

export const makeIsActiveHook = <T extends string>() => {
    const useIsActive = <U extends T>(url: U) => useContext(RouterContext).router?.isActive(url) ?? false;

    return useIsActive
}