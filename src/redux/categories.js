import { createSlice } from "@reduxjs/toolkit";
const categoriesSlice = createSlice({
    name: "category",
    initialState: {
        allcategory: {
            listcategory: null,
            isFetching: false,
            error: false
        },
        category:{
            listcategories: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        getallcategoryStart: (state) => {
            state.allcategory.isFetching = true;
        },
        getallcategorySuccess: (state, action) => {
            state.allcategory.isFetching = false;
            state.allcategory.listcategory = action.payload;
            state.allcategory.error = false;
        },
        getallcategoryFailed: (state) => {
            state.allcategory.isFetching = false;
            state.allcategory.error = true;
        },
        getcategoryStart: (state) => {
            state.category.isFetching = true;
        },
        getcategorySuccess: (state, action) => {
            state.category.isFetching = false;
            state.category.listcategories = action.payload;
            state.category.error = false;
        },
        getcategoryFailed: (state) => {
            state.category.isFetching = false;
            state.category.error = true;
        },
    }
});
export const {
    getallcategoryStart,
    getallcategorySuccess,
    getallcategoryFailed,
    getcategoryStart,
    getcategorySuccess,
    getcategoryFailed,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;