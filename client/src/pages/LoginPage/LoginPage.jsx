import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// --------------------------------------------------------------------
import { CustomButton, LabelForm, Logo } from "../../components";
import { loginModel } from "../../models/auth.models";

// CSS
import { toast } from "react-toastify";
import { instance } from "../../axios/axiosConfig";
import { normalToast } from "../../utils/toastConfg";
import "./index.css";

// --------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: loginModel,
  });

  const _handleLogin = (e) => {
    toast("Cargando", normalToast);
console.log(e)
    instance
      .post("/users/login", e)
      .then(({ data }) => {
        localStorage.setItem("J&CToken", data.token);
        toast(data.message, normalToast);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  return (
    <div className="login-page flex-center">
      <Logo />
      <form
        className="form-login-register flex-center"
        onSubmit={handleSubmit(_handleLogin)}
      >
        <span className="input-conatiner">
          <LabelForm elementFor="email-inp" text="Correo" />
          <input
            type="email"
            name="email-inp"
            id="email-inp"
            className="input"
            {...register("email", { required: true })}
          />
          <p className="error-message-inp">
            {errors.email && "Este campo es requerido"}
          </p>
        </span>
        <span className="input-conatiner">
          <LabelForm elementFor="password-inp" text="Contraseña" />
          <input
            type="password"
            name="password-inp"
            id="password-inp"
            className="input"
            {...register("password", { required: true })}
          />
          <p className="error-message-inp">
            {errors.password && "Este campo es requerido"}
          </p>
        </span>
        <span className="span">
          <a href="#">Recuperar contraseña</a>
        </span>
        <CustomButton text="Iniciar" />
        <span className="span">
          No tines una cuenta <Link to="/register">Registrarse</Link>
        </span>
      </form>
    </div>
  );
}
