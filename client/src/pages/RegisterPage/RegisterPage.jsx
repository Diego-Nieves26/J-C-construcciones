import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import Icons from "../../assets/icons";
import { instance } from "../../axios/axiosConfig";
import { CustomButton, InpMain, Logo } from "../../components";
import { registerModel } from "../../models/auth.models";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: registerModel,
  });

  const _handleRegister = (e) => {
    toast("Cargando...", normalToast);

    instance
      .post("/pre-users/create", e)
      .then(({ data }) => {
        toast(
          `${data.message}, espere a que su cuenta sea autorizada.`,
          normalToast
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  return (
    <div className="register-page flex-center">
      <Logo />
      <form
        className="form-login-register flex-center"
        onSubmit={handleSubmit(_handleRegister)}
      >
        <InpMain
          label="Nombre"
          typeInp="text"
          idName="name"
          register={register}
          errors={errors}
          validationObj={{ required: true, pattern: /^[A-Za-z]+$/i }}
          nameValidation="pattern"
          messageValidation="Solo se aceptan letras"
        />
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

        <CustomButton text="Registrarse" />
        <span className="span">
          Tines una cuenta <Link to="/login">Inicia secion</Link>
        </span>
      </form>
    </div>
  );
}
