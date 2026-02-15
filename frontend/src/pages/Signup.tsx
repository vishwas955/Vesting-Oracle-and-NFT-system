import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiService from "../services/api.service";

export default function Signup(){
    const navigate = useNavigate();
    const wallet = localStorage.getItem("wallet");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiService.post("/api/signup", {
          name,
          email,
          walletAddress: wallet,
        });

        localStorage.setItem("tokenId", res.data.data?.user?.nftId);

        navigate("/dashboard");

      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    };

    return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-96 border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-white/10 rounded-lg border border-white/20 focus:outline-none"
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-white/10 rounded-lg border border-white/20 focus:outline-none"
        />

        <input
          value={wallet || ""}
          disabled
          className="w-full p-3 mb-6 bg-gray-800 rounded-lg"
        />
        {error && (
          <div className="text-red-400 text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-3 rounded-lg bg-gradient-to-r from-accent to-primary transition flex items-center justify-center gap-2
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            "Register & Mint NFT"
          )}
        </button>
      </div>
    </div>
  );

}