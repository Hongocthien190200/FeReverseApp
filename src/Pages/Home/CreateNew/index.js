import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './Create.module.scss';
import classNames from "classnames/bind";
import { getCategory, createSubject } from '../../../redux/apiRequest';
const cx = classNames.bind(styles);

function CreateNew({ onClose, setIsNotiFailed, setIsNotiSucces, getAllSubjectByAllCategory, user, axiosJWT }) {
    const dispatch = useDispatch();
    const [categoryType, setCategoryType] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [formErrors, setFormErrors] = useState({
        categoryName:'',
        subjectName:''
    });

    let state = useSelector((state) => state.categories.category);
    let categories = [];
    if (state && state.listcategories) {
        categories = state.listcategories;
    }


    // Tạo đối tượng chuyên đề mới
    const newSubject = {
        category_id: categoryType,
        name: subjectName
    };
    //nếu thêm thành công
    const successCallback = async () => {
        await getAllSubjectByAllCategory(user?.accessToken, dispatch, axiosJWT);
        await onClose(false);
        await setIsNotiSucces(true);
    }
    //nếu thêm thất bại
    const errCallback = async () => {
        await onClose(false);
        await setIsNotiFailed(true);
    }

    const validateForm = () => {
        const errors = {
            categoryName:'',
            subjectName:''
        };

        let hasErrors = false;

        // Kiểm tra các trường bắt buộc
        if (!categoryType) {
            errors.categoryName = 'Bạn vui lòng không để trống trường này';
            hasErrors = true;
        }
        if (!subjectName) {
            errors.subjectName = 'Bạn vui lòng không để trống trường này';
            hasErrors = true;
        }
        setFormErrors(errors);
        return !hasErrors;
    };

    const handleAdd = async() => {
        if (validateForm()) {
            await createSubject(dispatch, user?.accessToken, newSubject, axiosJWT, successCallback, errCallback)
        }
    };
    useEffect(() => {
        getCategory(user?.accessToken, dispatch, axiosJWT);
    }, []);

    return (
        <div className={cx("container")}>
            <div className={cx("popup")}>
                <div className={cx("header")}>Thêm mới</div>
                <div className={cx("form-group")}>
                    <label>Phân loại chuyên đề</label>
                    <select value={categoryType} onChange={(e) => setCategoryType(e.target.value)}>
                        <option value="">Chọn phân loại</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className={cx('error-message')}>{formErrors.categoryName}</div>
                </div>
                <div className={cx("form-group")}>
                    <label>Tên chuyên đề</label>
                    <input
                        type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <div className={cx('error-message')}>{formErrors.subjectName}</div>
                </div>
                <div className={cx("actions")}>
                    <button className={cx("add")} onClick={handleAdd}>Thêm</button>
                    <button className={cx("cancel")} onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default CreateNew;
