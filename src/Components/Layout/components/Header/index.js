import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { logOut } from "../../../../redux/apiRequest";
import { createAxios } from "../../../../createInstance";
import { logoutSuccess } from "../../../../redux/authSlice";
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { GiBookCover } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";

const cx = classNames.bind(styles);
function Header() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = () => {
        setShowLogoutModal(true);
    }

    const handleLogoutConfirmed = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
        // Đăng xuất thành công, có thể thực hiện các bước khác nếu cần
        setShowLogoutModal(false);
    }

    const handleCancelLogout = () => {
        // Người dùng chọn hủy bỏ, đóng modal
        setShowLogoutModal(false);
    }
    return (
        <>
            <div className={cx('header')}>
                <div className={cx('title')} onClick={() => {
                    navigate('/');
                }}>
                    <GiBookCover className={cx('info-icon')}>
                    </GiBookCover>
                    <span>Reverse App</span>
                </div>
                <ul className={cx('nav')}>
                    <li>
                        <span onClick={() => {
                            navigate('/');
                        }}>Tổng quan</span>
                        <span></span>
                    </li>
                    <li>
                        <span>Đề thi</span>
                        <span></span>
                    </li>
                    <li>
                        <span>Ngân hàng đề thi</span>
                        <span></span>
                    </li>
                </ul>
                <div className={cx('user')}>
                    <GrLogout className={cx('info-icon')} onClick={handleLogout}>
                    </GrLogout>
                </div>
            </div>

            {showLogoutModal && (
                <div className={cx('logout-modal')}>
                    <h1>Bạn muốn đăng xuất khỏi thiết bị</h1>
                    <button onClick={handleLogoutConfirmed}>OK</button>
                    <button className={cx('cancel')} onClick={handleCancelLogout}>Cancel</button>
                </div>
            )}
        </>

    );
}

export default Header;
