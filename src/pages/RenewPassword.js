import { useState } from "react";
import CustomInput from "../components/CustomInput";
import SystemInfo from "../util/SystemInfo";

const RenewPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            alert("El email debe de ser obligatorio");
            return;
        }
    }

    return (
        <div className="p-8">
            <form onSubmit={handleSubmit}>
                <div className="text-center space-y-8 text-gray-500">
                    <img src={SystemInfo.logo} className="h-16 w-16 m-auto" alt="" />

                    <h1 className="text-xl font-bold">
                        Por favor ingrese aca su correo electronico.
                    </h1>

                    <input
                        placeholder="Email..."
                        type="text"
                        name="email"
                        className="rounded p-2 w-1/3 focus:ring-main focus:border-main"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <p>
                        Se le enviara un correo electronico con un enlace el cual le permitira cambiar su contraseña.
                    </p>

                    <button className="px-8 py-2 bg-main text-white rounded">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RenewPassword;