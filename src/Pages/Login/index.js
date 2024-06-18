import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

import styles from "./Login.module.scss"; // Import SCSS module
import classNames from "classnames/bind";
import { FaUser } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const cx = classNames.bind(styles);

const Login = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State để kiểm soát hiển thị spinner
  const [rememberMe, setRememberMe] = useState(false); // State để lưu trạng thái của checkbox "Remember Me"
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra xem có thông tin tài khoản đã được lưu trong localStorage hay không
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true); // Đánh dấu ô "Remember Me"
    }

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      username: username,
      password: password,
    };
    if (!username.trim() || !password.trim()) {
      setErrors({ message: "Vui lòng điền đầy đủ thông tin." });
      setLoading(false); // Ẩn spinner nếu có lỗi
      return;
    }
    loginUser(newUser, dispatch, navigate, handleLoginError);

    // Lưu thông tin tài khoản nếu người dùng chọn "Remember Me"
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };

  const handleLoginError = (error) => {
    setErrors({ message: error.message });
    setLoading(false); //
  };


  return (
    <div className={cx("body-login")}>
      <div className={cx("wrapper")}>
        {loading && <div className={cx("spinner-overlay")}></div>}
        <form onSubmit={handleLogin}>
          <h1>Đăng nhập</h1>
          <div className={cx("input-box")}>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
            />
            <FaUser className={cx("icon")} />
          </div>
          <div className={cx("input-box")}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
            <div
              className={cx("icon-container")}
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <IoIosEye className={cx("icon")} /> : <IoIosEyeOff className={cx("icon")} />}
            </div>
          </div>
          <div className={cx("login-error")}>
            <span>{errors?.message}</span>
          </div>
          <div className={cx("remember-forgot")}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe} // Liên kết ô "Remember Me" với state
                onChange={(e) => setRememberMe(e.target.checked)} // Cập nhật trạng thái khi ô "Remember Me" được chọn
              />
              Remember me
            </label>
          </div>
          <button type="submit">Đăng nhập</button>
          <div className={cx("register-link")}>
            {/* <p>
              Don't have an account? <a href="#">Register</a>
            </p> */}
          </div>
          {loading && (
            <div className={cx("spinner-container")}>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="orange"
                ariaLabel="loading"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
