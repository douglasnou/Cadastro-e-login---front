import { useForm } from "react-hook-form"
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";


export const UserCadastro = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();


    const userRegister = async (formData) => {
        try {
            await api.post('/cadastro', formData);
            console.log('registrado com sucesso.')
            navigate('/user');
        } catch (error) {
            console.log(error);
        }
    }

    const submit = (formData) => {
        userRegister(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <h2>Crie sua conta</h2>
                    <input placeholder="Nome" type="text" {...register("name", { required: true })} />

                    <input placeholder="Email" type="text" {...register("email", { required: true })} />

                    <input placeholder="Senha" type="password" {...register("password", { required: true })} />
                </div>
                <button type="submit">Cadastrar</button>
                <Link to="/user">
                    <button>Voltar</button>
                </Link>
            </form>
        </div>
    )
}