import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, getQuestionById, deleteQuestion } from '../../redux/apiRequest'; // Ensure this path is correct
import { createAxios } from '../../createInstance'; // Ensure this path is correct
import { loginSuccess } from '../../redux/authSlice'; // Ensure this path is correct
import { useParams } from 'react-router-dom'; // Import useParams
import NotiSucces from '../../Components/Notification/notisuccess';
import NotiFailed from '../../Components/Notification/notifailed';
import { LuDelete } from "react-icons/lu";
// import { LuPenSquare } from "react-icons/lu";

import styles from './Subject.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Subject() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    let state = [];
    state = useSelector((state) => state.questions.questions);
    let listQuestions = [];
    if (state && state.listquestion) {
        listQuestions = state.listquestion;
    }

    const [questionText, setQuestionText] = useState('');
    const [image, setImage] = useState(null);
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState('');
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null); // Create a ref for the file input

    const validateForm = () => {
        const errors = {};
        if (!questionText) errors.questionText = 'Nội dung câu hỏi là bắt buộc';
        if (!option1) errors.option1 = 'Đáp án 1 là bắt buộc';
        if (!option2) errors.option2 = 'Đáp án 2 là bắt buộc';
        if (!correctOption) errors.correctOption = 'Đáp án đúng là bắt buộc';
        return errors;
    };
    const successCallback = async () => {
        await getQuestionById(id, user?.accessToken, dispatch, axiosJWT);
        setIsNotiSucces(true);
    }

    //nếu thêm thất bại
    const errCallback = () => {
        setIsNotiFailed(true);
    }
    const handleSubmit = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formData = new FormData();
        formData.append('subject_id', id); // Use subjectId from URL
        formData.append('question_text', questionText);
        formData.append('option1', option1);
        formData.append('option2', option2);
        formData.append('option3', option3);
        formData.append('option4', option4);
        formData.append('correct_option', correctOption);
        if (image) {
            formData.append('image', image);
        }
        //nếu thêm thành công
        const successCallbackCreate = async () => {
            setQuestionText('');
            setImage(null);
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setCorrectOption('');
            setErrors({});
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input
            }
            await successCallback();
        }
        await createQuestion(dispatch, user.accessToken, formData, axiosJWT, successCallbackCreate, errCallback);
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

    const handleDeleteQuestion = (id) => {
        deleteQuestion(id, dispatch, user.accessToken, axiosJWT, successCallback, errCallback);
    }

    useEffect(() => {
        if (user?.accessToken) {
            getQuestionById(id, user?.accessToken, dispatch, axiosJWT);
        }
    }, []);
    return (
        <div className={cx('subject')}>
            <div className={cx('modal-create-update')}>
                <h2>Thêm mới câu hỏi</h2>
                <ul>
                    <li>
                        <textarea
                            placeholder="Nội dung câu hỏi"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                        />
                        {errors.questionText && <span className={cx('error')}>{errors.questionText}</span>}
                    </li>
                    <li>
                        <label htmlFor="file-upload">Hình ảnh:</label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            ref={fileInputRef} // Attach the ref to the file input
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Đáp án 1"
                            value={option1}
                            onChange={(e) => setOption1(e.target.value)}
                        />
                        {errors.option1 && <span className={cx('error')}>{errors.option1}</span>}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Đáp án 2"
                            value={option2}
                            onChange={(e) => setOption2(e.target.value)}
                        />
                        {errors.option2 && <span className={cx('error')}>{errors.option2}</span>}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Đáp án 3"
                            value={option3}
                            onChange={(e) => setOption3(e.target.value)}
                        />
                        {/* {errors.option3 && <span className={cx('error')}>{errors.option3}</span>} */}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Đáp án 4"
                            value={option4}
                            onChange={(e) => setOption4(e.target.value)}
                        />
                        {/* {errors.option4 && <span className={cx('error')}>{errors.option4}</span>} */}
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Đáp án đúng"
                            value={correctOption}
                            onChange={(e) => setCorrectOption(e.target.value)}
                        />
                        {errors.correctOption && <span className={cx('error')}>{errors.correctOption}</span>}
                    </li>
                </ul>
                <button onClick={handleSubmit}>Thêm mới</button>
            </div>
            <div className={cx('show-subject')}>
                {listQuestions.map((question, index) => (
                    <div key={question._id} className={cx('question')}>
                        <div className={cx('icons')}>
                            {/* <LuPenSquare
                                // onClick={() => handleEdit(question._id)}
                                className={cx('icon')}
                            /> */}
                            <LuDelete
                                onClick={() => handleDeleteQuestion(question._id)}
                                className={cx('icon')}
                            />
                        </div>
                        <p className={cx('question-text')}>{index + 1}. {question.question_text}</p>
                        {question.image_url && (
                            <img
                                src={question.image_url}
                                alt="question"
                                className={cx('question-image')}
                            />
                        )}
                        <ul className={cx('options')}>
                            <li className={cx({ 'correct': question.correct_option === 1 })}>
                                A. {question.option1}
                            </li>
                            <li className={cx({ 'correct': question.correct_option === 2 })}>
                                B. {question.option2}
                            </li>
                            {question.option3 && (
                                <li className={cx({ 'correct': question.correct_option === 3 })}>
                                    C. {question.option3}
                                </li>
                            )}
                            {question.option4 && (
                                <li className={cx({ 'correct': question.correct_option === 4 })}>
                                    D. {question.option4}
                                </li>
                            )}

                        </ul>
                    </div>
                ))}
            </div>
            {isNotiSucces && (<NotiSucces handleCloseSuccessModal={handleCloseSuccessModal} />)
            }
            {isNotiFailed && (<NotiFailed handleCloseFailedModal={handleCloseFailedModal} />)
            }
        </div>
    );
}

export default Subject;
