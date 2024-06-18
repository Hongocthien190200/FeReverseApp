import React from 'react';
import Nav from "../components/NavCategory";
import Header from "../components/Header";
import styles from './DefaultLayout.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("container")}>
            <div className={cx('default-layout')}>
                <Header />
                <div className={cx('wrap')}>
                    <div className={cx('wrap-child')}>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DefaultLayout;