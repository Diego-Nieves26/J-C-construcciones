import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { instance } from "../../axios/axiosConfig";
import { CustomButton, InpMain, Logo } from "../../components";
import { loginModel } from "../../models/auth.models";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
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

    instance
      .post("/users/login", e)
      .then(({ data }) => {
        localStorage.setItem("J&CToken", data.token);
        toast(data.message, normalToast);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast(`Error, ${err.response.data.message}`, normalToast);
      });
  };

  return (
    <div className="login-page flex-center">
      <Logo />
      <form
        className="form-login-register flex-center"
        onSubmit={handleSubmit(_handleLogin)}
      >
        <InpMain
          label="Correo"
          typeInp="email"
          idName="email"
          register={register}
          errors={errors}
          validationObj={{
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          }}
          nameValidation="pattern"
          messageValidation="Introduce un correo valido"
        />
        <InpMain
          label="Contraseña"
          typeInp={showPass ? "text" : "password"}
          idName="password"
          register={register}
          errors={errors}
          validationObj={{ required: true, minLength: 8 }}
          nameValidation="minLength"
          messageValidation="La contraseña debe tener minimo 8 caracteres"
        >
          <button
            className="show-pass-btn"
            type="button"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? Icons.HIDE_ICON : Icons.SHOW_ICON}
          </button>
        </InpMain>
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
