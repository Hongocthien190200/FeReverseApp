import { createSlice } from "@reduxjs/toolkit";
const questionSlice = createSlice({
    name: "question",
    initialState: {
        createquestion: {
            isFetching: false,
            error: false,
            success: false
        },
        deletequestion: {
            isFetching: false,
            error: false,
            success: false
        },
        questions: {
            listquestion: null,
            isFetching: false,
            error: false,
        }
        
    },
    reducers: {
        createQuestionStart: (state) => {
            state.createquestion.isFetching = true;
        },
        createQuestionSuccess: (state) => {
            state.createquestion.isFetching = false;
            state.createquestion.error = false;
            state.createquestion.success = true;
        },
        createQuestionFailed: (state) => {
            state.createquestion.isFetching = false;
            state.createquestion.error = true;
            state.createquestion.success = false;
        },
        deleteQuestionStart: (state) => {
            state.deletequestion.isFetching = true;
        },
        deleteQuestionSuccess: (state) => {
            state.deletequestion.isFetching = false;
            state.deletequestion.error = false;
            state.deletequestion.success = true;
        },
        deleteQuestionFailed: (state) => {
            state.deletequestion.isFetching = false;
            state.deletequestion.error = true;
            state.deletequestion.success = false;
        },
        getquestionstart: (state) => {
            state.questions.isFetching = true;
        },
        getquestionSuccess: (state, action) => {
            state.questions.isFetching = false;
            state.questions.listquestion = action.payload;
            state.questions.error = false;
        },
        getquestionFailed: (state) => {
            state.questions.isFetching = false;
            state.questions.error = true;
        },
        
    }
});
export const {
    deleteQuestionStart,
    deleteQuestionSuccess,
    deleteQuestionFailed,
    createQuestionStart,
    createQuestionSuccess,
    createQuestionFailed,
    getquestionstart,
    getquestionSuccess,
    getquestionFailed,
} = questionSlice.actions;
export default questionSlice.reducer;