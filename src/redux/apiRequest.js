import axios from "axios";
import { saveAs } from 'file-saver';

//Đăng ký/Đăng nhập/User
import {
    RegisterFailed, RegisterStart, RegisterSuccess,
    loginFailed, loginStart, loginSuccess,
    logoutFailed, logoutStart, logoutSuccess,
    updatePassWordStart, updatePassWordSuccess, updatePassWordFailed,
    deleteUserStart, deleteUserSuccess, deleteUserFailed
} from "./authSlice";
// Phân loại
import {
    getallcategoryStart, getallcategorySuccess, getallcategoryFailed,
    getcategoryStart, getcategorySuccess, getcategoryFailed
} from "./categories";
//Chuyên đề
import {
    getsubjectstart, getsubjectSuccess, getsubjectFailed,
    createSubjectStart, createSubjectSuccess, createSubjectFailed
} from "./subjects";
//Câu hỏi
import {
    deleteQuestionStart, deleteQuestionSuccess, deleteQuestionFailed,
    createQuestionStart, createQuestionSuccess, createQuestionFailed,
    getquestionstart, getquestionSuccess, getquestionFailed,
} from "./questions";
//Đề thi
import {
    createExamStart, createExamSuccess, createExamFailed
} from "./exams"
axios.defaults.baseURL = 'https://be-reverse-app.onrender.com';

//XOÁ TÀI KHOẢN
export const deleteUser = async (id, dispatch, successCallback, errCallback, accessToken, axiosJWT) => {
    await dispatch(deleteUserStart());
    try {
        await axiosJWT.delete(`/api/users/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        await dispatch(deleteUserSuccess());
        await successCallback();
    }
    catch (error) {
        await errCallback();
        await dispatch(deleteUserFailed(error));
    }
}
//THAY ĐỔI MẬT KHẨU
export const updatePassWord = async (newData, dispatch, successCallback, errCallback, accessToken, axiosJWT) => {
    await dispatch(updatePassWordStart());
    try {
        await axiosJWT.patch("/api/changepw", newData, {
            headers: { token: `Bearer ${accessToken}` },
        });
        await dispatch(updatePassWordSuccess());
        await successCallback();
    }
    catch (error) {
        await errCallback();
        await dispatch(updatePassWordFailed(error));
    }
}

//ĐĂNG NHẬP
export const loginUser = async (user, dispatch, navigate, errorCallback) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/login", user);
        await dispatch(loginSuccess(res.data));
        await navigate("/");
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            errorCallback(new Error("Sai tên đăng nhập hoặc mật khẩu"));
            dispatch(loginFailed());
        }
    }
}
//ĐĂNG XUẤT
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/api/logout", id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate("/login");
    }
    catch (err) {
        dispatch(logoutFailed());
    }
}
//ĐĂNG KÝ
export const registerUser = async (user, dispatch, successCallback, errCallback, accessToken, axiosJWT) => {
    dispatch(RegisterStart());
    try {
        await axiosJWT.post("/api/register", user, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(RegisterSuccess());
        await successCallback();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await errCallback();
            // errorCallback(new Error("Username already exists"));
            dispatch(RegisterFailed(error));
        }
    }
}
//Lấy chuyên đề theo các phân loại
export const getAllSubjectByAllCategory = async (user, dispatch, axiosJWT) => {
    dispatch(getallcategoryStart());
    try {
        const res = await axiosJWT.get("/api/category/showall", user);
        await dispatch(getallcategorySuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(getallcategoryFailed());
        }
    }
}
//LẤY TẤT CẢ CHUYÊN ĐỀ KHÔNG PHỤ THUỘC PHÂN LOẠI
export const getSubject = async (user, dispatch, axiosJWT) => {
    dispatch(getsubjectstart());
    try {
        const res = await axiosJWT.get("/api/subject", user);
        await dispatch(getsubjectSuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(getsubjectFailed());
        }
    }
}
//Lấy các phân loại chuyên đề
export const getCategory = async (user, dispatch, axiosJWT) => {
    dispatch(getcategoryStart());
    try {
        const res = await axiosJWT.get("/api/category", user);
        await dispatch(getcategorySuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(getcategoryFailed());
        }
    }
}
//TẠO MỚI CHUYÊN ĐỀ
export const createSubject = async (dispatch, accessToken, newSubject, axiosJWT, successCallback, errCallback) => {
    dispatch(createQuestionStart());
    try {
        await axiosJWT.post("/api/subject", newSubject, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(createQuestionSuccess());
        await successCallback();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await errCallback();
            // errorCallback(new Error("Username already exists"));
            dispatch(createQuestionFailed(error));
        }
    }
}
//TẠO MỚI MỘT CÂU HỎI
export const createQuestion = async (dispatch, accessToken, newQuestion, axiosJWT, successCallback, errCallback) => {
    dispatch(createSubjectStart());
    try {
        await axiosJWT.post("/api/question", newQuestion, {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(createSubjectSuccess());
        await successCallback();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await errCallback();
            dispatch(createSubjectFailed(error));
        }
    }
};
//XÓA MỘT CÂU HỎI
export const deleteQuestion = async (id, dispatch, accessToken, axiosJWT, successCallback, errCallback) => {
    dispatch(deleteQuestionStart());
    try {
        await axiosJWT.delete(`/api/question/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteQuestionSuccess());
        await successCallback();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await errCallback();
            dispatch(deleteQuestionFailed(error));
        }
    }
};
//LẤY CÁC CÂU HỎI TRONG MỘT CHUYÊN ĐỀ
export const getQuestionById = async (id, user, dispatch, axiosJWT) => {
    dispatch(getquestionstart());
    try {
        const res = await axiosJWT.get(`/api/question/${id}`, user);
        await dispatch(getquestionSuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(getquestionFailed());
        }
    }
}
// TẠO ĐỀ THI
export const createExam = async (dispatch, accessToken, newExam, axiosJWT, successCallback, errCallback) => {
    dispatch(createExamStart());
    try {
        const response = await axiosJWT.post("/api/create-exam", newExam, {
            headers: { token: `Bearer ${accessToken}` },
            responseType: 'blob', // Cần thiết để nhận file blob từ server
        });

        dispatch(createExamSuccess());

        // Trích xuất tên file từ header nếu có
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'exam.docx';
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match && match[1]) {
                fileName = match[1];
            }
        }

        // Lưu file sử dụng FileSaver
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        saveAs(blob, fileName);

        await successCallback();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await errCallback();
            dispatch(createExamFailed(error));
        }
    }
}
