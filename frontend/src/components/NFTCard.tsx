import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getSigner } from "../services/web3.service";
import MemberNFT from "../contracts/MemberNFT.json";

export default function NFTCard({ wallet }: { wallet: string }) {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const tokenId = localStorage.getItem("tokenId");
        if (!tokenId) return;
        const signer = await getSigner();
        
        const contract = new ethers.Contract(
          process.env.REACT_APP_MEMBER_NFT!,
          MemberNFT,
          signer
        );

        const tokenIdInt = Number(tokenId);
        const uri = await contract.tokenURI(tokenIdInt);
        console.log("uri:",uri);

        const ipfsUrl = uri.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        );

        const res = await fetch(ipfsUrl);
        const data = await res.json();
        console.log("MetaData",data)
        setMetadata(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNFT();
  }, [wallet]);

  if (!metadata)
    return (
      <div className="bg-white/10 p-6 rounded-xl">
        No NFT Found
      </div>
    );

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-80 shadow-xl border border-white/20">
      <img
        src={metadata.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        )}
        alt="NFT"
        className="rounded-xl mb-4"
      />
      <h3 className="text-xl font-bold">
        {metadata.name}
      </h3>
      <p className="text-gray-300">
        {metadata.Description}
      </p>
    </div>
  );
}
