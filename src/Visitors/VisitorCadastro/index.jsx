import { useForm } from "react-hook-form"
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";


export const VisitorCadastro = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    const visitorRegister = async (formData) => {
        try {
            await api.post('/cadastrar-visitor', formData);
            console.log('visitante registrado com sucesso.')
            navigate('/visitor');
        } catch (error) {
            console.log(error);
        }
    }

    const submit = (formData) => {
        visitorRegister(formData)
    }

    return (
        <div className="w-dvw h-dvh flex items-center content-center justify-center bg-black text-white">
            <form onSubmit={handleSubmit(submit)} className="w-1/2 h-1/2 border border-white rounded-xl flex-col content-center m-auto justify-center font-sans">
                <h1 className="text-center my-10 text-2xl font-bold">Crie sua conta</h1>
                <div className="mx-auto w-3/4 flex flex-col flex-wrap items-center justify-center">
                    <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="Nome" type="text" {...register("name", { required: true })} />

                    <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="Email" type="text" {...register("email", { required: true })} />

                    <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="Senha" type="password" {...register("password", { required: true })} />
                </div>
                <div className="mx-auto w-full flex items-center justify-center gap-2 my-8">
                    <button type="submit" className="rounded-lg h-8 px-4 text-center bg-gray-600 hover:bg-gray-800">Cadastrar</button>
                    <Link to="/visitor">
                        <button className="rounded-lg h-8 px-4 text-center bg-red-600 hover:bg-red-800">Voltar</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}