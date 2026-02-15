import { memberNFT } from "../config/contracts";

export const mintMemberNFT = async (walletAddress: string, tokenURI: string) => {
    const tx = await memberNFT.mintNFT(walletAddress, tokenURI);
    const reciept = await tx.wait();
    const transferEvent = reciept.logs[0];
    const tokenIdHex = transferEvent.topics[3];  // TokenID as hex
    const tokenId = BigInt(tokenIdHex).toString();  // Convert to decimal string
    
    console.log("NFT minted! TokenID:", tokenId, "Tx:", reciept.hash);
    return {
        tokenId,    
        txHash: reciept.hash
    };
}; 