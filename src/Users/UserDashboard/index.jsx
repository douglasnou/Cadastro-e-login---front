import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";

export const UserDashboard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const createProducts = async (formData) => {
        try {
            const token = localStorage.getItem("@TOKEN");

            const { data } = await api.post("/criar-produto", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts((prevProducts) => [...prevProducts, data]);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const mostraProdutos = async () => {
            try {
                const token = localStorage.getItem("@TOKEN");
                const { data } = await api.get('/produtos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (data && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.log("Os dados retornados não são uma array válida");
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        mostraProdutos();
    }, []);

    const atualizarProduto = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("@TOKEN");
            const { data } = await api.put("/atualizar-produto", { id, status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, status: newStatus } : product
                )
            );
        } catch (error) {
            console.log("Erro ao atualizar o produto:", error);
        }
    };

    const deletarProduto = async (deletedId) => {
        try {
            const token = localStorage.getItem("@TOKEN");
            await api.delete("/deletar-produto", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { id: deletedId }
            });

            const deletedProduct = products.filter((product) => product.id !== deletedId)
            setProducts(deletedProduct);
        } catch (error) {
            console.log("Erro ao deletar", error);
        }
    }

    const submit = (formData) => {
        createProducts(formData);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return new Date(dateString).toLocaleString('pt-BR', options);
    };

    const userLogout = async () => {
        localStorage.removeItem("@TOKEN");
        navigate("/user");
    }

    return (
        <div className="w-dvw h-full flex flex-col items-center justify-center bg-black text-white">
            <form className="w-1/2 h-44 my-5 border border-white rounded-xl flex flex-col items-center m-auto justify-center font-sans" onSubmit={handleSubmit(submit)}>
                <input className="rounded-lg h-8 my-2 px-0 text-center text-black" placeholder="nome do produto" type="text" {...register("name", { required: true })} />
                <select  className="rounded-lg h-7 w-32 my-2 px-0 text-center text-black" {...register("status", { required: true })}>
                    <option value="Em serviço">Em serviço</option>
                    <option value="Finalizado">Finalizado</option>
                </select>

                <button className="rounded-lg h-8 px-4 my-4 text-center bg-red-600 hover:bg-red-800" type="submit">Cadastrar produto</button>
            </form>

            <div className="max-w-full h-full px-10 flex flex-col content-center m-auto justify-evenly font-sans">
                <button className="rounded-lg h-8 px-4 text-center bg-red-600 hover:bg-red-800" onClick={userLogout}>Sair</button>
                <ul>
                    {
                        products.map((product) => (
                            <li className="my-5" key={product.id}>
                                <div>
                                    <h2 className="text-center my-1 text-xl font-bold">{product.name}</h2>
                                    <p className="text-center my-1 text-base font-bold">{product.status}</p>
                                    <p className="text-center my-1 text-sm font-light">{formatDate(product.entry)}</p>
                                </div>
                                <div className="w-full">
                                    <button className="mx-2 rounded-lg h-7 px-3 text-center text-sm bg-gray-600 hover:bg-gray-800" onClick={() => atualizarProduto(
                                        product.id, product.status === "Em serviço" ? "Finalizado" : "Em serviço"
                                    )}>
                                        Atualizar status
                                    </button>
                                    <button className="mx-2 rounded-lg h-7 px-3 text-center text-sm bg-red-600 hover:bg-red-800" onClick={() => deletarProduto(product.id)}>
                                        Deletar produto
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}