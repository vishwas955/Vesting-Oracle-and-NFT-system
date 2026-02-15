import { useNavigate } from "react-router-dom";
import { connectWallet } from "../services/web3.service";
import apiService from "../services/api.service";

export default function Login() {
    const navigate = useNavigate();

    const handleConnect = async () => {
        const wallet = await connectWallet();
        localStorage.setItem("wallet", wallet);

        try{
            const res = await apiService.post("/api/login", {walletAddress: wallet});
            localStorage.setItem("tokenId", res.data.data.user.nftId);
            navigate("/dashboard");
        }catch(error: any){
            if (error.response?.status === 404) {
                navigate("/signup");
            }
        }
    };

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl border border-white/20 text-center">
                <h1 className="text-3xl font-bold mb-6">
                    Welcome to <span className="text-primary">CryptoCorp</span>
                </h1>

                <button
                    onClick={handleConnect}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                    Connect Wallet
                </button>
            </div>
        </div>
    );
}