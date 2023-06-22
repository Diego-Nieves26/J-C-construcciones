import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { Link } from "react-router-dom";
import { instance } from "../../axios/axiosConfig";
import { CustomButton, LabelForm, Logo } from "../../components";
import { registerModel } from "../../models/auth.models";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: registerModel,
  });

  const _handleRegister = (e) => {
    toast("Cargando", normalToast);

    instance
      .post("/pre-users/create", e)
      .then(({ data }) => {
        toast(data.message, normalToast);
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
        <span className="input-conatiner">
          <LabelForm elementFor="name-inp" text="Nombre" />
          <input
            type="text"
            name="name-inp"
            id="name-inp"
            className="input"
            {...register("name", { required: true })}
          />
          <p className="error-message-inp">
            {errors.name && "Este campo es requerido"}
          </p>
        </span>
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
        <CustomButton text="Registrarse" />
        <span className="span">
          Tines una cuenta <Link to="/login">Inicia secion</Link>
        </span>
      </form>
    </div>
  );
}
