import { Link } from "react-router-dom"

export const Home = () => {

    return (
        <div className="w-dvw h-dvh flex items-center content-center justify-center bg-black text-white">
            <div className="w-1/2 h-1/2 border border-white rounded-xl flex-col content-center m-auto justify-center font-sans ">
                <h1 className="text-center my-10 text-3xl font-bold">Lista de produtos</h1>
                <div className="mx-auto w-1/2 flex-col items-center justify-center">
                    <h2 className="text-center my-5 font-bold text-xl">Você é:</h2>
                    <div className="w-full flex justify-center flex-wrap gap-5">
                        <Link to="/visitor">
                            <button className="rounded-full bg-gray-500 px-8 py-2 font-semibold hover:bg-gray-800 hover:animate-bounce">Visitante</button>
                        </Link>
                        <Link to="/user">
                            <button className="rounded-full bg-red-600 px-5 py-2 font-semibold hover:bg-red-800 hover:animate-bounce">Colaborador</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}