import { useState, useEffect } from "react"
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export const VisitorDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                    console.log("Os dados retornados não são um array válido");
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        mostraProdutos();
    }, []);

    const visitorLogout = async () => {
        localStorage.removeItem("@TOKEN");
        navigate("/visitor");
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        return new Date(dateString).toLocaleString('pt-BR', options);
    };

    return (
        <div className="w-dvw h-dvh flex flex-col items-center justify-center bg-black text-white">
            <div className="max-w-full h-full px-10 flex flex-col content-center m-auto justify-evenly font-sans">
                <button className="rounded-lg h-8 px-4 text-center bg-red-600 hover:bg-red-800" onClick={visitorLogout}>Sair</button>
                <ul>
                    {
                        products.map((product) => (
                            <li className="my-5" key={product.id}>
                                <div>
                                    <h2 className="text-center my-1 text-xl font-bold">{product.name}</h2>
                                    <p className="text-center my-1 text-base font-bold">{product.status}</p>
                                    <p className="text-center my-1 text-sm font-light">{formatDate(product.entry)}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}