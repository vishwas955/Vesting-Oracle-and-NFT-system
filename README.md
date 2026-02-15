# CryptoCorp -- Vesting Oracle & NFT System

This is a full-stack Web3 application built as part of a Full Stack
Blockchain Developer assessment.

The system allows users to register using a Web3 wallet, automatically
receive a **Member Badge NFT**, and receive **1000 CCT (CryptoCorp
Token)** locked in a vesting contract.\
Users can later claim their tokens once the vesting period is complete.

This project demonstrates smart contract development, backend Web3
integration, IPFS usage, event indexing, and full-stack architecture
using the MERN stack.

------------------------------------------------------------------------

## Project Structure

contracts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solidity smart contracts (Hardhat)<br>
backend&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node.js + Express + MongoDB API<br>
frontend&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React Application+ Tailwind CSS<br>
README.md

------------------------------------------------------------------------

## Technology Stack

**Smart Contracts** 
- Solidity 
- Hardhat (Ignition) 
- OpenZeppelin(ERC20, ERC721)

**Backend** 
- Node.js 
- Express 
- MongoDB 
- Mongoose 
- Ethers.js 
- Pinata (IPFS)

**Frontend** 
- React 
- TypeScript 
- Tailwind CSS 
- Ethers.js

------------------------------------------------------------------------

## Smart Contracts Overview

### OrganizationToken.sol (ERC20)

-   Token Name: CryptoCorp Token
-   Symbol: CCT
-   Initial supply minted to deployer for vesting distribution

### Vesting.sol

-   Accepts ERC20 token address in constructor
-   createSchedule(address beneficiary, uint256 amount, uint256
    releaseTime) can only called by contract owner
-   claim() function for beneficiaries to unlock tokens

### MemberNFT.sol (ERC721)

-   mintNFT(address recipient, string tokenURI)
-   NFT metadata stored on IPFS

------------------------------------------------------------------------

## Features

-   Connect Wallet using MetaMask
-   User Signup with Name, Email and Wallet Address
-   NFT metadata uploaded to IPFS
-   Automatic NFT minting on signup
-   1000 CCT tokens locked via Vesting contract
-   Claim tokens after vesting period(1 day)
-   Backend event indexer for ScheduleCreated events
-   Analytics endpoint to calculate total vested tokens

------------------------------------------------------------------------

## Running the Application Locally

### 1. Clone the repository
```
    git clone https://github.com/vishwas955/Vesting-Oracle-and-NFT-system.git
    cd Vesting-Oracle-and-NFT-system
```
------------------------------------------------------------------------

### 2. Smart Contracts Setup
```
    cd contracts
    npm install
```

Create a `.env` file inside the contracts folder:

``` env
SEPOLIA_TESTNET_PRIVATEKEY = Provide_SepoliaTestNet_PrivateKey
SEPOLIA_TESTNET_RPC_URL = Provide_SepoliaTestNet_RPC_URL
```

Compile contracts:
```
    npx hardhat compile
```
Deploy contracts:
```
    npx hardhat ignition deploy ./ignition/modules/VestingSystem.deployemnt.ts --network sepolia
```
After deployment, copy contract addresses and update the backend
environment file.

------------------------------------------------------------------------

### 3. Backend Setup

Open a new terminal:
```
    cd backend
    npm install
```
Create a `.env` file inside backend:

``` env
MONGO_URI = Provide_Mongo_URI

PINATA_APIKEY = Provide_Pinata_API_key

PINATA_APISECRET = Provide_Pinata_API_Secret

RPC_URL = Provide_RPC_URL

ADMIN_PRIVATEKEY = Provide_Admin_PrivateKey

MemberNFT = Provide_MemberNFT_Address

Vesting = Provide_Vesting_Address

OrganizationToken = Provide_OrganizationToken_Address
```

Start backend:
```
    npm run dev
```
Backend runs on: http://localhost:5000

------------------------------------------------------------------------

### 4. Frontend Setup

Open another terminal:
```
    cd frontend
    npm install
    npm run start
```
Frontend runs on: http://localhost:3000

------------------------------------------------------------------------

## API Endpoints

**Base URL:**\
http://localhost:5000/api

POST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/signup&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register new user, mint NFT to the user and lock 1000CCT Vesting contract<br>
POST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login using wallet<br>
GET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/vesting/:walletAddress&nbsp;&nbsp;&nbsp;&nbsp;Fetch user vesting schedules<br>
GET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/analytics/total-vested&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Calculate total locked tokens

------------------------------------------------------------------------

## Notes

-   The backend admin wallet must approve the Vesting contract before
    creating schedules.
-   NFT metadata is uploaded to IPFS using Pinata.
-   Sensitive data such as Email is NOT stored on IPFS.
-   Environment files (.env) are excluded using .gitignore.
-   Clean separation between smart contracts, backend and frontend.
-   Smart contract interaction is handled securely through
    backend-controlled transactions.

------------------------------------------------------------------------
