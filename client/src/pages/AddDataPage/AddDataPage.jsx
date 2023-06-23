import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// --------------------------------------------------------------------
import { Caption, CustomButton, LabelForm } from "../../components";
import { formInpCreateData } from "../../data/formsInp.data";
import { normalToast } from "../../utils/toastConfg";

// CSS
import { instance } from "../../axios/axiosConfig";
import { getConfig } from "../../axios/getHeaders";
import "./index.css";

// --------------------------------------------------------------------

function InpText({ item, register, errors }) {
  return (
    <span className="input-conatiner">
      <LabelForm elementFor={item.id} text={item.label} />
      <input
        className="input"
        type={item.type}
        name={item.id}
        id={item.id}
        {...register(item.name, { required: true, ...item.validationInp })}
      />
      <p className="error-message-inp">
        {errors[item.name]?.type === "required"
          ? "Este campo es requerido"
          : errors[item.name] && "Campo no valido"}
      </p>
    </span>
  );
}

function InpMoney({ item, register, errors }) {
  return (
    <span className="input-conatiner">
      <LabelForm elementFor={item.id} text={item.label} />
      <div className="input-money">
        <span>S/.</span>
        <input
          type={item.type}
          name={item.id}
          id={item.id}
          className="input"
          {...register(item.name, { required: true })}
          {...item.formatInp}
        />
      </div>
      <p className="error-message-inp">
        {errors[item.name] && "Este campo es requerido"}
      </p>
    </span>
  );
}

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
      .post(`${formInpCreateData[type].link}create`, e, getConfig())
      .then(({ data }) => {
        toast(`${data.message}, datos creados`, normalToast);
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
      <form className="form-create-data" onSubmit={handleSubmit(_handleCreate)}>
        {formInpCreateData[type].fildsName.map((fild, i) => {
          if (fild.typeCamp === "money") {
            return (
              <InpMoney
                item={fild}
                key={i + 1}
                errors={errors}
                register={register}
              />
            );
          }
          if (fild.typeCamp === "text") {
            return (
              <InpText
                item={fild}
                key={i + 1}
                errors={errors}
                register={register}
              />
            );
          }
        })}
        <CustomButton text="Agregar" />
      </form>
    </main>
  );
}
