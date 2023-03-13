import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

// хук который забирает данные из store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector