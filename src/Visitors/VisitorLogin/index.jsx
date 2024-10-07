import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";


export const VisitorLogin = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = (formData) => {
        visitorLogin(formData)
    }

    const visitorLogin = async (formData) => {
        try {
            const { data } = await api.post('/login-visitor', formData);
            console.log('Logado com sucesso.');
            localStorage.setItem("@TOKEN", data);

            navigate("/dashboard-visitor");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-dvw h-dvh flex flex-col items-center justify-center bg-black text-white">
            <form onSubmit={handleSubmit(submit)} className="w-1/2 h-1/2 border border-white rounded-xl content-center m-auto justify-center font-sans">
                <h1 className="text-center my-10 text-2xl font-bold">Login de visitantes</h1>
                <div className="mx-auto w-3/4 flex flex-col flex-wrap items-center justify-center">
                    <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="Nome" type="text" {...register("name", { required: true })} />

                    <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="Email" type="email" {...register("email", { required: true })} />

                    <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="Senha" type="password" {...register("password", { required: true })} />
                </div>
                <div className="mx-auto w-full flex items-center justify-center gap-2 my-8">
                    <button className="rounded-lg h-8 px-4 text-center bg-gray-600 hover:bg-gray-800" type="submit">Entrar</button>
                    <Link to='/'><button className="rounded-lg h-8 px-4 text-center bg-red-600 hover:bg-red-800">Voltar</button></Link>
                </div>
            </form>
                <Link className="text-center my-10 text-2xl font-bold hover:underline" to='/cadastrar-visitor'>Cadastre-se para ver nossos produtos.</Link>
        </div>
    )
}