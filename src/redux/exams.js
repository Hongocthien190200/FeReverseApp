import { createSlice } from "@reduxjs/toolkit";
const examsSlice = createSlice({
    name: "exam",
    initialState: {
        createxam: {
            isFetching: false,
            error: false,
            success: false
        },
        
    },
    reducers: {
        createExamStart: (state) => {
            state.createxam.isFetching = true;
        },
        createExamSuccess: (state) => {
            state.createxam.isFetching = false;
            state.createxam.error = false;
            state.createxam.success = true;
        },
        createExamFailed: (state) => {
            state.createxam.isFetching = false;
            state.createxam.error = true;
            state.createxam.success = false;
        },
        
    }
});
export const {
    createExamStart,
    createExamSuccess,
    createExamFailed,
} = examsSlice.actions;
export default examsSlice.reducer;