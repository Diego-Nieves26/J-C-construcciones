import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { instance } from "../../axios/axiosConfig";
import { Caption, CustomButton, LabelForm } from "../../components";
import { formInpCreateData } from "../../data/formsInp.data";
import { normalToast } from "../../utils/toastConfg";

// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function AddDataPage() {
  const { type } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formInpCreateData[type].model,
  });

  useEffect(() => {
    reset(formInpCreateData[type].model);
  }, [reset, type]);

  const _handleCreate = (e) => {
    toast("Creando...", normalToast);

    instance
      .post(`${formInpCreateData[type].link}create`, e, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("J&CToken")}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        toast(data.message, normalToast);
        reset(formInpCreateData[type].model);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Error", normalToast);
      });
  };

  return (
    <main className="add-data-page">
      <Caption text={`Agregar datos: ${type.toUpperCase()}`} />
      <form
        className="form-login-register form-create-data"
        onSubmit={handleSubmit(_handleCreate)}
      >
        {formInpCreateData[type].fildsName.map((fild, i) => (
          <span className="input-conatiner" key={i + 1}>
            <LabelForm elementFor={fild.id} text={fild.label} />
            <input
              type={fild.type}
              name={fild.id}
              id={fild.id}
              className="input"
              {...register(fild.name, { required: true })}
            />
            <p className="error-message-inp">
              {errors[fild.name] && "Este campo es requerido"}
            </p>
          </span>
        ))}
        <CustomButton text="Agregar" />
      </form>
    </main>
  );
}
