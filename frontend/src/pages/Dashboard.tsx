import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import NFTCard from "../components/NFTCard";
import VestingTable from "../components/VestingTable";
import { ethers } from "ethers";
import { getSigner } from "../services/web3.service";
import VESTING_ABI from "../contracts/Vesting.json";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const wallet = localStorage.getItem("wallet");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDisconnect = () => {
    localStorage.removeItem("wallet");
    localStorage.removeItem("tokenId");
    navigate("/");
  };

  const fetchSchedule = async () => {
    if (!wallet) return;

    try {
      setLoading(true);  
      console.log("Fetching for wallet:", wallet);
      
      const res = await apiService.get(`/api/vesting/${wallet}`);
      
      setSchedules(res.data?.data?.schedules || []);
    } catch (error: any) {
      console.error(" API Error:", error.response?.data || error.message); 
      setSchedules([]);  
    } 
    finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    fetchSchedule();
  }, [wallet]);

  const handleClaim = async () => {
    try {
      setLoading(true);

      const signer = await getSigner();

      const contract = new ethers.Contract(
        process.env.REACT_APP_VESTING!,
        VESTING_ABI,
        signer
      );

      const tx = await contract.claim();
      await tx.wait();

      await fetchSchedule();
      alert("Tokens Claimed Successfully!");

    } catch (err) {
      console.error(err);
      alert("Claim failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          CryptoCorp Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2 rounded-xl">
            {wallet?.slice(0, 6)}...
            {wallet?.slice(-4)}
          </div>

          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* NFT Section */}
      <div className="mb-10">
        <h2 className="text-xl mb-4">My NFT</h2>
        {wallet && <NFTCard wallet={wallet} />}
      </div>

      {/* Vesting Section */}
      <div>
        <h2 className="text-xl mb-4">Vesting Schedule</h2>
        <VestingTable schedules={schedules} />
        
        {/* Claim Button Section */}
        <div className="mt-6">
          <button
            onClick={handleClaim}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Claim Tokens"}
          </button>
        </div>
      </div>
    </div>
  );
}
