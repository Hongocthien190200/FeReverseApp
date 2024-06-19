import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './Create.module.scss';
import classNames from "classnames/bind";
import { createExam, getSubject } from '../../../redux/apiRequest';

const cx = classNames.bind(styles);

function CreateExam({ onClose, setIsNotiFailed, setIsNotiSucces, user, axiosJWT }) {
    const dispatch = useDispatch();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [numExams, setNumExams] = useState(1);
    const [formErrors, setFormErrors] = useState({
        selectedSubjects: '',
        numExams: '',
    });

    let state = useSelector((state) => state.subjects.subjects);
    let subjects = [];
    if (state && state.listsubjects) {
        subjects = state.listsubjects;
    }
    const totalQuestions = selectedSubjects.reduce((total, subject) => total + parseInt(subject.numQuestions || 0, 10), 0);
    useEffect(() => {
        if (user?.accessToken) {
            getSubject(user?.accessToken, dispatch, axiosJWT);
        }
    }, [user, dispatch, axiosJWT]);

    const successCallback = async () => {
        await onClose(false);
        await setIsNotiSucces(true);
    }

    const errCallback = async () => {
        await onClose(false);
        await setIsNotiFailed(true);
    }

    const validateForm = () => {
        const errors = {
            selectedSubjects: '',
            numExams: '',
        };

        let hasErrors = false;
        const validSubjects = selectedSubjects.find(subject => subject.subjectId !== '' && subject.numQuestions > 0);
        if (!validSubjects) {
            errors.selectedSubjects = 'Bạn vui lòng chọn ít nhất một chuyên đề và số lượng câu hỏi';
            hasErrors = true;
        }
        if (!numExams || numExams <= 0) {
            errors.numExams = 'Số lượng đề thi phải lớn hơn 0';
            hasErrors = true;
        }

        setFormErrors(errors);
        return !hasErrors;
    };

    const handleAdd = async () => {
        if (validateForm()) {
            const newExam = {
                selectedSubjects,
                numExams,
            };
            await createExam(dispatch, user?.accessToken, newExam, axiosJWT, successCallback, errCallback);
        }
    };

    const handleSubjectChange = (index, field, value) => {
        const newSelectedSubjects = [...selectedSubjects];
        newSelectedSubjects[index] = {
            ...newSelectedSubjects[index],
            [field]: value
        };
        setSelectedSubjects(newSelectedSubjects);
    };

    const addSubject = () => {
        setSelectedSubjects([...selectedSubjects, { subjectId: '', numQuestions: 0 }]);
    };

    const removeSubject = (index) => {
        const newSelectedSubjects = selectedSubjects.filter((_, i) => i !== index);
        setSelectedSubjects(newSelectedSubjects);
    };

    const getAvailableSubjects = (index) => {
        const selectedIds = selectedSubjects.map(sub => sub.subjectId);
        return subjects.filter(subject => !selectedIds.includes(subject.id) || subject.id === selectedSubjects[index].subjectId);
    };

    return (
        <div className={cx("container")}>
            <div className={cx("popup")}>
                <div className={cx("header")}>Tạo Đề Thi</div>
                {selectedSubjects.map((subject, index) => (
                    <div key={index} className={cx("form-group")}>
                        <select
                            value={subject.subjectId}
                            onChange={(e) => handleSubjectChange(index, 'subjectId', e.target.value)}
                        >
                            <option value="">Chọn chuyên đề</option>
                            {getAvailableSubjects(index).map(sub => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                        <label>Số lượng:</label>
                        <input
                            type="number"
                            value={subject.numQuestions}
                            onChange={(e) => handleSubjectChange(index, 'numQuestions', e.target.value)}
                        />
                        <button className={cx("remove")} onClick={() => removeSubject(index)}>Xóa</button>
                    </div>
                ))}
                <div className={cx("form-group")}>
                    <button onClick={addSubject}>Thêm chuyên đề</button>
                    <div className={cx("total-questions")}>
                        <label>Tổng số câu hỏi:</label>
                        <span>{totalQuestions}</span>
                    </div>
                </div>
                <div className={cx('error-message')}>{formErrors.selectedSubjects}</div>
                <div className={cx("form-group3")}>
                    <label>Số Lượng Đề:</label>
                    <input
                        type="number"
                        value={numExams}
                        onChange={(e) => setNumExams(e.target.value)}
                    />
                </div>
                <div className={cx('error-message')}>{formErrors.numExams}</div>
                <div className={cx("actions")}>
                    <button className={cx("add")} onClick={handleAdd}>Tạo</button>
                    <button className={cx("cancel")} onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default CreateExam;
