import { useContext } from "react";
import { RouterContext } from "../RouterContext";

export const makeNavigateHook = <T extends string>() => {
    const useNavigate = () => {
        const ctx = useContext(RouterContext).router;
        return <U extends T>(url: U) => ctx?.go(url);
    }
 
    return useNavigate
}