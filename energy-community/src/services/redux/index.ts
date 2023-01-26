import {combineReducers} from "@reduxjs/toolkit";
import {userReducer, utilityReducer} from "services/redux/store";
import {Slice} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    user: userReducer,
    utility: utilityReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export function editState(slice: Slice, property: string, value: any) {
    property = property.charAt(0).toUpperCase() + property.slice(1);
    const fx = "set" + property;
    const store = window.store;
    store.dispatch(slice.actions[fx](value));
}
