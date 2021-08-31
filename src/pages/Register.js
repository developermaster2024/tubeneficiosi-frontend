//Imagenes
import BeneficioSiLogo from '../assets/images/logo.jpg';
import DeliveryMotion from '../assets/images/delivery-motion.gif';
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isEmail, isRequired, validate } from '../helpers/formsValidations';
import SystemInfo from '../util/SystemInfo';

const Register = () => {

  const { setLoading, setCustomAlert, setAuthInfo } = useAuth();

  const [{ data, loading, error }, createClient] = useAxios({ url: "auth/register", method: "POST" }, { manual: true });

  const history = useHistory();

  const [errorsForm, setErrorsForm] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    password: null,
    confirmPassword: null
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });


  useEffect(() => {
    setLoading({ show: loading, message: "Creando usuario" })
  }, [loading]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setCustomAlert({ show: true, message: `${error.response?.status === 400 ? error.response?.data.message[0] : error.response?.data.message}.`, severity: "error" });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setAuthInfo({ isAuthenticated: true, user: data.user, token: data.accessToken });
      history.push('/my-account');
    }
  }, [data]);

  useEffect(() => {
    setErrorsForm({
      name: validate(registerFormData.name, [
        { validator: isRequired, errorMessage: "el nombre es obligatorio." },
      ]),
      email: validate(registerFormData.email, [
        { validator: isRequired, errorMessage: "El email es obligatorio." },
        { validator: isEmail, errorMessage: "el email debe ser valido." }
      ]),
      password: validate(registerFormData.password, [
        { validator: isRequired, errorMessage: "la contraseña es Obligatoria." },
      ]),
      confirmPassword: validate(registerFormData.confirmPassword, [
        { validator: isRequired, errorMessage: "Por favor llene este campo." },
      ]),
      phoneNumber: validate(registerFormData.phoneNumber, [
        { validator: isRequired, errorMessage: "la el telefono es Obligatorio." },
      ]),
    })
  }, [registerFormData])

  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let errors in errorsForm) {
      if (errorsForm[errors] != null) {
        alert("Hay un error en el campo: " + errors);
        return;
      }
    }

    if (registerFormData.password !== registerFormData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    createClient({ data: { name: registerFormData.name, email: registerFormData.email, password: registerFormData.password, phoneNumber: registerFormData.phoneNumber } });
  }


  return (
    <div>
      <div className="flex justify-between">
        <div className="w-1/2 bg-gray-50 text-center py-8">
          <img className="m-auto w-1/3 text-gray-700" src={SystemInfo.logo} alt="" />
          <h1 className="my-8 font-bold text-[70px]">
            {SystemInfo.name}
          </h1>
          <p className="text-lg text-gray-500">{SystemInfo.description}</p>
          <img src={DeliveryMotion} alt="" />
        </div>
        <div className="w-1/2 bg-white p-6 relative">
          <div className="flex justify-right items-center">
            <img className="ml-auto w-1/12 text-gray-700" src={SystemInfo.logo} alt="" />
            <h1 className="ml-2 font-bold text-[40px]">
              {SystemInfo.name}
            </h1>
          </div>
          <div className="border-b border-main mt-24">
            <h2 className="text-center text-2xl">
              Registro de clientes
            </h2>
          </div>

          <form className="text-2xl mt-5 px-14" onSubmit={handleSubmit}>
            <div className="my-12 flex justify-between">
              <div>
                <h2 className="text-gray-600 font-bold">
                  Nombre y Apellido
                </h2>
                <input value={registerFormData.name} onChange={handleChange} className="rounded w-full mt-1" type="text" name="name" placeholder="Nombre y apellido" />
                {
                  errorsForm.name ?
                    <p className="text-sm mt-2 text-red-500">{errorsForm.name}</p>
                    :
                    null
                }
              </div>
              <div>
                <h2 className="text-gray-600 font-bold">
                  Correo Electronico
                </h2>
                <input value={registerFormData.email} onChange={handleChange} className="rounded w-full mt-1" type="text" name="email" placeholder="Correo Electronico" />
                {
                  errorsForm.email ?
                    <p className="text-sm mt-2 text-red-500">{errorsForm.email}</p>
                    :
                    null
                }
              </div>
            </div>

            <div className="my-12 flex justify-between">
              <div>
                <h2 className="text-gray-600 font-bold">
                  Contraseña
                </h2>
                <input value={registerFormData.password} onChange={handleChange} className="rounded w-full mt-1" type="password" name="password" placeholder="Contraseña" />
                {
                  errorsForm.password ?
                    <p className="text-sm mt-2 text-red-500">{errorsForm.password}</p>
                    :
                    null
                }
              </div>
              <div>
                <h2 className="text-gray-600 font-bold">
                  Confirmar Contraseña
                </h2>
                <input value={registerFormData.confirmPassword} onChange={handleChange} className="rounded w-full mt-1" type="password" name="confirmPassword" placeholder="Confirmar Contraseña" />
                {
                  errorsForm.confirmPassword ?
                    <p className="text-sm mt-2 text-red-500">{errorsForm.confirmPassword}</p>
                    :
                    null
                }
              </div>
            </div>

            <div className="my-12 flex justify-between">
              <div>
                <h2 className="text-gray-600 font-bold">
                  Telefono
                </h2>
                <input value={registerFormData.phoneNumber} onChange={handleChange} className="rounded w-full mt-1" type="text" name="phoneNumber" placeholder="Telefono" />
                {
                  errorsForm.phoneNumber ?
                    <p className="text-sm mt-2 text-red-500">{errorsForm.phoneNumber}</p>
                    :
                    null
                }
              </div>
            </div>

            <div className="text-center">
              <button className="bg-main px-4 py-2 rounded text-white">
                Registrate
              </button>
            </div>
            <p className="text-center mt-4 text-lg">
              ¿Ya tienes cuenta? <Link to="/login" className="text-main hover:text-gray-800 transition duration-500"> Inicia Sesión </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )

}


export default Register;