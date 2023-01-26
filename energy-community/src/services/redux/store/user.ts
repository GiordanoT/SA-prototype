import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dictionary} from "utils/types";

const initialState: Dictionary = { id: 0, username: "", email: "", uid: "", solarPanels: 0, windTurbines: 0, route: 0 }
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state: Dictionary, action: PayloadAction<Dictionary>){
            const dict = action.payload;
            state.id = dict.id;
            state.username = dict.username;
            state.email = dict.email;
            state.uid = dict.uid;
            state.solarPanels = dict.solarPanels;
            state.windTurbines = dict.windTurbines;
            state.route = dict.route;
        }
    }
});
export const userReducer = userSlice.reducer;
