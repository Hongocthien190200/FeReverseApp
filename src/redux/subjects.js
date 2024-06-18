import { createSlice } from "@reduxjs/toolkit";
const subjectsSlice = createSlice({
    name: "subject",
    initialState: {
        creatsubject: {
            isFetching: false,
            error: false,
            success: false
        },
        subjects: {
            listsubjects: null,
            isFetching: false,
            error: false,
        }
        
    },
    reducers: {
        createSubjectStart: (state) => {
            state.creatsubject.isFetching = true;
        },
        createSubjectSuccess: (state) => {
            state.creatsubject.isFetching = false;
            state.creatsubject.error = false;
            state.creatsubject.success = true;
        },
        createSubjectFailed: (state) => {
            state.creatsubject.isFetching = false;
            state.creatsubject.error = true;
            state.creatsubject.success = false;
        },
        getsubjectstart: (state) => {
            state.subjects.isFetching = true;
        },
        getsubjectSuccess: (state, action) => {
            state.subjects.isFetching = false;
            state.subjects.listsubjects = action.payload;
            state.subjects.error = false;
        },
        getsubjectFailed: (state) => {
            state.subjects.isFetching = false;
            state.subjects.error = true;
        },
        
    }
});
export const {
    createSubjectStart,
    createSubjectSuccess,
    createSubjectFailed,
    getsubjectstart,
    getsubjectSuccess,
    getsubjectFailed
} = subjectsSlice.actions;
export default subjectsSlice.reducer;