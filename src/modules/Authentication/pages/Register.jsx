import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registers } from "../slices/authSlice";
import scss from "./style.module.scss";

// data: taiKhoan, matKhau, email, hoTen, soDt

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    // Chế độ kích hoạt validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const { user, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { data: handleRegister, isLoading } = useRequest((values) =>
  //   authAPI.register(values)
  // );

  const onSubmit = async (values) => {
    try {
      await dispatch(registers(values)).unwrap();
      // await handleRegister(values);
      // Sau khi đăng ký thành công, ta cần chuyển user về trang login
      navigate("/login");
      notification.success({
        message: "Đăng ký thành công",
      });
    } catch (error) {
      // Đăng ký thất bại show error ra cho user thấy
      notification.error({
        message: "Đăng ký thất bại",
        description: error,
      });
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div className={scss.center}>
      <h1 className={scss.h1}>Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={scss.form}>
        <div className={scss.field}>
          <input
            type="text"
            {...register("email", {
              required: { value: true, message: "Email không được để trống" },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email không đúng định dạng",
              },
            })}
          />
          <span></span>
          <label>Email</label>
          {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
        </div>
        <div className={scss.field}>
          <input
            type="text"
            {...register("passWord", {
              required: {
                value: true,
                message: "mật khẩu không được để trống",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "ít nhất 8 ký tự, gồm chữ cái và số",
              },
            })}
          />
          <span></span>
          <label>Password</label>
          {errors.passWord && <p style={{color:'red'}}>{errors.passWord.message}</p>}
        </div>

        <div className={scss.field}>
          <input
            type="text"
            {...register("name", {
              required: { value: true, message: "họ tên không được để trống" },
            })}
          />
          <span></span>
          <label>Fullname</label>
          {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
        </div>

        <div className={scss.field}>
          <input
            type="text"
            {...register("phoneNumber", {
              required: { value: true, message: "sđt không được để trống" },
            })}
          />
          <span></span>
          <label>PhoneNumber</label>
          {errors.phoneNumber && <p style={{color:'red'}}>{errors.phoneNumber.message}</p>}
        </div>

        <button>Đăng Ký</button>
      </form>
    </div>
  );
};

export default Register;