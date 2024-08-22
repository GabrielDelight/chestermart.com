import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    index: 0,
}

const pageIndicatorSlice =  createSlice({
    initialState,
    name: "pageIndicator",
    reducers: {
        indicatorAction(state, {payload}) {
            state.index = payload.index
        }
    }
})

// Export the actions
export const {indicatorAction} = pageIndicatorSlice.actions

// Export teh slixe
export default pageIndicatorSlice;
