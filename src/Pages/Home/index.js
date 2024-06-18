import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllSubjectByAllCategory } from "../../redux/apiRequest";
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import CreateNew from './CreateNew';
import CreateExam from './CreateExam';
import NotiSucces from '../../Components/Notification/notisuccess';
import NotiFailed from '../../Components/Notification/notifailed';


import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    let state = useSelector((state) => state.categories.allcategory);
    let categories = [];
    if (state && state.listcategory) {
        categories = state.listcategory;
    }
    //Xử lý nút thêm mới một Chuyên đề
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupExam, setShowPopupExam] = useState(false);

    useEffect(() => {
        if (user?.accessToken) {
            getAllSubjectByAllCategory(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const handleAddNewClick = () => {
        setShowPopup(true); // Show popup when "Thêm mới" button is clicked
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Close popup
    };

    const handleAddExamNewClick = () => {
        setShowPopupExam(true);
    };

    const handleClosePopupExam = () => {
        setShowPopupExam(false); 
    };

    //xử lý modal sửa thành công
    const handleCloseSuccessModal = () => {
        setIsNotiSucces(false);
    }
    const [isNotiSucces, setIsNotiSucces] = useState(false);
    //xử lý modal sửa thất bại
    const handleCloseFailedModal = () => {
        setIsNotiFailed(false);
    }
    const [isNotiFailed, setIsNotiFailed] = useState(false);

    const navigation = (id) => {
        navigate(`/chuyende/${id}`);
    }

    return (
        <div className={cx('home')}>
            <div className={cx('head')}>
                <div className={cx('head-left')}>
                    <button onClick={handleAddNewClick}>+ Chuyên đề</button>
                </div>
                <div className={cx('head-right')}>
                    <button onClick={handleAddExamNewClick}>+ Đề thi</button>
                </div>
            </div>
            <div className={cx('body')}>
                {categories.map((category) => (
                    <div key={category.category_id} className={cx('category')} >
                        <div className={cx('category-name')}>
                            {category.categoryName}
                        </div>
                        {category.subjects.map((subject) => (
                            <div key={subject.subject_id} className={cx('subject')} onClick={() => navigation(subject.subject_id)}>
                                <span>{subject.subjectName}</span>
                                <div className={cx('subject-actions')}>
                                    <button className={cx('subject-actions1')} onClick={() => navigation(subject.subject_id)}>Xem</button>
                                    <button className={cx('subject-actions2')}>Sửa</button>
                                    <button className={cx('subject-actions3')}> Xóa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {showPopup && (
                <CreateNew
                    onClose={handleClosePopup}
                    setIsNotiFailed={setIsNotiFailed}
                    setIsNotiSucces={setIsNotiSucces}
                    getAllSubjectByAllCategory={getAllSubjectByAllCategory}
                    user={user}
                    axiosJWT={axiosJWT}
                />
            )}
            {showPopupExam && (
                <CreateExam
                    onClose={handleClosePopupExam}
                    setIsNotiFailed={setIsNotiFailed}
                    setIsNotiSucces={setIsNotiSucces}
                    user={user}
                    axiosJWT={axiosJWT}
                />
            )}
            {isNotiSucces && (<NotiSucces handleCloseSuccessModal={handleCloseSuccessModal} />)
            }
            {isNotiFailed && (<NotiFailed handleCloseFailedModal={handleCloseFailedModal} />)
            }
        </div>
    );
}

export default Home;
