import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dictionary} from "utils/types";

const initialState: Dictionary = { devices: 0 }
export const utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        setDevices(state: Dictionary, action: PayloadAction<number>){
            state.devices = action.payload;
        }
    }
});
export const utilityReducer = utilitySlice.reducer;
