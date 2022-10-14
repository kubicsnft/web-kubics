import React from 'react';
import Carousel_Legend from './Carousel_legendary';
import NftCard from "./Card_Legendary";
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from "react";
import Link from "next/link"
import axios from "axios";
import { ethers } from "ethers";
import { dragonKeeper } from "../../constants";
import DragonKeeper from "../../artifacts/contracts/DragonKeeper.sol/DragonKeeper.json";

// import gif categorys
import ultraRare from '../../public/dragonkeeper/gif/ultraRare.gif'
import rare from '../../public/dragonkeeper/gif/rare.gif'
import uncommon from '../../public/dragonkeeper/gif/uncommon.gif'
import common from '../../public/dragonkeeper/gif/common.gif'



const NFTZone = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);

    const [account, setAccount] = useState(undefined);
    const [imageURI, setImageURI] = useState(undefined);
    const [openseaURL, setOpenseaURL] = useState(undefined);


    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    });

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                //Get account
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
                console.log(accounts[0]);
                setIsConnected(true);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setSigner(provider.getSigner());
            } catch (e) {
                console.log(e);
            }
        } else {
            setIsConnected(false);
        }
    }

    // Checks if wallet is connected
    const checkIfWalletIsConnected = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                console.log("Got the ethereum obejct: ", window.ethereum);
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });

                if (accounts.length !== 0) {
                    console.log("Found authorized Account: ", accounts[0]);
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    setSigner(provider.getSigner());
                    setAccount(accounts[0]);
                    setIsConnected(true)
                } else {
                    console.log("No authorized account found");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("No Wallet found. Connect Wallet");
        }
        return isConnected
    };
    /* ------------------ WHITELIST MINT FUNCTIONS ------------------ */

    //Function Mint Category ULTRARARE
    async function mint_UltraRare() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_UltraRare = await contract.getTokenCounter_UltraRare();
            console.log(`Token ID Category UltraRare: ${tokenId_UltraRare.toString()}`);

            const contentIdMetadata_UltraRare =
                "QmQswc9AWienxmWLA3pGBQpMJ3R2kXdWCn51GAMxj5G9rE";
            const metadataURI = `${contentIdMetadata_UltraRare}/${tokenId_UltraRare}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_UltraRare =
                "QmfEimuwbfPhdgnVnx3J1gbfpfdQYMwEYxGV8RT8sKMEDe";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_UltraRare}/${tokenId_UltraRare}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.payToMint_UltraRare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Mint Category RARE
    async function mint_Rare() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Rare = await contract.getTokenCounter_Rare();
            console.log(`Token ID Category Rare: ${tokenId_Rare.toString()}`);

            const contentIdMetadata_Rare =
                "QmXULEzuP1aHfgbtRMDVwH2L2qG76K48cDd8s4S3uZsHxu";
            const metadataURI = `${contentIdMetadata_Rare}/${tokenId_Rare}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_Rare =
                "QmQtxEB6H1PZRHSAQA4rFyUxUW4fiHbwDTVAMfw8SKkRVA";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Rare}/${tokenId_Rare}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.payToMint_Rare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Mint Category UNCOMMON
    async function mint_Uncommon() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Uncommon = await contract.getTokenCounter_Uncommon();
            console.log(`Token ID Category Uncommon: ${tokenId_Uncommon.toString()}`);

            const contentIdMetadata_Uncommon =
                "QmSuK42qdgBqhMQS69U4wJ9BBWrBRsdTgemrHqHfhAacM5";
            const metadataURI = `${contentIdMetadata_Uncommon}/${tokenId_Uncommon}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_Uncommon =
                "QmWBWUpMCkqFoWb9QmLwVo3qKxoY1om1aBc6QtUUDui2Y1";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Uncommon}/${tokenId_Uncommon}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.payToMint_Uncommon(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Mint Category COMMON
    async function mint_Common() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Common = await contract.getTokenCounter_Common();
            console.log(`Token ID Category Common: ${tokenId_Common.toString()}`);

            const contentIdMetadata_Common =
                "QmazdhrysQenu9RePX2Y47VbJAUYMCjgtkMi6daepDLMwL";
            const metadataURI = `${contentIdMetadata_Common}/${tokenId_Common}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_Common =
                "QmTTYqyXV9vpgwtvn9EeknNAuGqMScyf666GpzXDJrMHtz";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Common}/${tokenId_Common}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.payToMint_Common(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    /* ------------------ WHITELIST MINT FUNCTIONS ------------------ */

    //Function Whitelist Mint LEGENDARY
    async function whitelist_Mint_Legendary(id) {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );

            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Legendary = await contract.getTokenCounter_Legendary();
            console.log(`Token ID Category Legendary: ${tokenId_Legendary.toString()}`);
            const contentIdMetadata_Legendary =
                "QmZUwBLjDjGfWC3mnSmMWj8CF1LTVa4di5QSeSvuDtQi2z";
            const metadataURI = `${contentIdMetadata_Legendary}/${id}.json`;

            const contentIdImages_Legendary =
                "QmPXHyjmy71fQgQqaNYR3h9pH2v5jqVfoYGw5uEV9ayC9t";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Legendary}/${tokenId_Legendary}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.whitelistMinting_Legendary(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();

                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Whitelist Mint Category ULTRARARE
    async function whitelist_Mint_UltraRare() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_UltraRare = await contract.getTokenCounter_UltraRare();
            console.log(`Token ID Category UltraRare: ${tokenId_UltraRare.toString()}`);

            const contentIdMetadata_UltraRare =
                "QmQswc9AWienxmWLA3pGBQpMJ3R2kXdWCn51GAMxj5G9rE";
            const metadataURI = `${contentIdMetadata_UltraRare}/${tokenId_UltraRare}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_UltraRare =
                "QmfEimuwbfPhdgnVnx3J1gbfpfdQYMwEYxGV8RT8sKMEDe";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_UltraRare}/${tokenId_UltraRare}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.whitelistMinting_UltraRare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Whitelist Mint Category RARE
    async function whitelist_Mint_Rare() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Rare = await contract.getTokenCounter_Rare();
            console.log(`Token ID Category Rare: ${tokenId_Rare.toString()}`);

            const contentIdMetadata_Rare =
                "QmXULEzuP1aHfgbtRMDVwH2L2qG76K48cDd8s4S3uZsHxu";
            const metadataURI = `${contentIdMetadata_Rare}/${tokenId_Rare}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_Rare =
                "QmQtxEB6H1PZRHSAQA4rFyUxUW4fiHbwDTVAMfw8SKkRVA";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Rare}/${tokenId_Rare}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.whitelistMinting_Rare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Mint Category UNCOMMON
    async function whitelist_Mint_Uncommon() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Uncommon = await contract.getTokenCounter_Uncommon();
            console.log(`Token ID Category Uncommon: ${tokenId_Uncommon.toString()}`);

            const contentIdMetadata_Uncommon =
                "QmSuK42qdgBqhMQS69U4wJ9BBWrBRsdTgemrHqHfhAacM5";
            const metadataURI = `${contentIdMetadata_Uncommon}/${tokenId_Uncommon}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_Uncommon =
                "QmWBWUpMCkqFoWb9QmLwVo3qKxoY1om1aBc6QtUUDui2Y1";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Uncommon}/${tokenId_Uncommon}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.whitelistMinting_Uncommon(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    //Function Mint Category COMMON
    async function mint_Common() {
        if (typeof window.ethereum !== "undefined") {
            const contract = new ethers.Contract(
                dragonKeeper,
                DragonKeeper.abi,
                signer
            );
            const tokenID_Collection = await contract.getTokenCounter();
            console.log(`Token ID: ${tokenID_Collection.toString()}`);

            const tokenId_Common = await contract.getTokenCounter_Common();
            console.log(`Token ID Category Common: ${tokenId_Common.toString()}`);

            const contentIdMetadata_Common =
                "QmazdhrysQenu9RePX2Y47VbJAUYMCjgtkMi6daepDLMwL";
            const metadataURI = `${contentIdMetadata_Common}/${tokenId_Common}.json`;
            console.log(`https://ipfs.io/ipfs/${metadataURI}`);

            const contentIdImages_Common =
                "QmTTYqyXV9vpgwtvn9EeknNAuGqMScyf666GpzXDJrMHtz";
            const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Common}/${tokenId_Common}.png`;

            //URL Needs to be updated with production data
            const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
            try {
                const result = await contract.payToMint_UltraRare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    console.log(`Is connected in NFT_Zone: ${isConnected}`)

// --------- Prices categorys ----------
    const priceURare = 0.4
    const priceRare = 0.3
    const priceUCommon = 0.2
    const priceCommon = 0.18

    return (

        <div className='flex-col mt-5  lg:p-12 sm:p-10 p-4 items-center w-11/12  mb-4 rounded-lg border-2 shadow-lg shadow-[#7B94b1] bg-[#ffffff]  border-primary' >
            <div className='md:absolute md:w-6/12 w-12/12  bg-[#7094b16e] rouded-lg md:left-1/4 -mt-20 md:text-2xl tracking-widest text-center -rotate-6 px-10 p-4 text-white may'>
                <FormattedMessage
                    id='imminent'
                    defaultMessage='IMINENTE'
                />
            </div>
            <h2 className='mb-4 text-3xl font-bold'>NFTs</h2>

            {/* --------- Description --------- */}
            <div className='mb-8 text-justify ' >
                <FormattedMessage
                    id='nft.description'
                    default='description'
                />
                <p className='mt-4'>
                    <FormattedMessage
                        id='nft.description2'
                        default='description'
                    />
                </p>
            </div>
            {/* =========================== LEGENDARY Category =========================== ) */}
            <div className='mb-32'>
                <Carousel_Legend connectFunction={connect} />
            </div>
            {/* =========================== ULTRA RARE Category =========================== */}
            <div className='flex flex-col items-center justify-around w-full gap-5 mb-20 text-justify rounded-lg sm:p-4 lg:gap-10 sm:shadow-md lg:items-start lg:flex-row'>
                <div className='w-full text-lg border-b text-start may text-secondary lg:hidden'>ULTRA RARE</div>
                {/* ----------- NFT card ----------- */}
                <div className='flex flex-col p-1 bg-white border-2 rounded-lg'>
                    <Image
                        className="w-full rounded-md"
                        src={ultraRare}
                        alt='nft image'
                    />
                    <div className='flex flex-row justify-between w-full p-2 txt-[#5d5d5d]'>
                        <div className=" text-start">
                            <h3 className="font-bold ">Dragonkeeper Ultra Rare </h3>
                        </div>
                        <div className=' text-start'>
                            <p>Price</p>
                            <p className='flex flex-row items-center ' >
                                <FaEthereum />{priceURare}
                            </p>
                        </div>
                    </div>
                </div>
                {/* ----------- NFT DESCRIPTION ----------- */}
                <div className='flex flex-col lg:items-start items-center justify-between lg:w-auto sm:w-[26.5rem] h-12/12'>
                    <div className='hidden w-full mb-6 text-lg border-b may text-secondary text-start lg:flex'>ULTRA RARE</div>
                    <ul className='ml-8 list-disc text-start'>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare1' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare2' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare3' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare4' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare5' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare6' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.ultrarare7' default='description' /></li>
                    </ul>
                    <div className='flex items-center mt-4 ml-4 w-44'>
                        {hasMetamask ? (
                            isConnected ? (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => mint_UltraRare()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Buy Now
                                    </span>
                                </button>
                            ) : (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => connect()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            )
                        ) : (
                            <Link
                                href={`https://metamask.io/download/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4 button nav-button btn-sm"
                            >
                                <button className="bg-white shadow-lg button learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* =========================== RARE Category =========================== */}
            {/* --------------- For Mobile --------------- */}
            <div className='flex flex-col items-center justify-around w-full gap-5 mb-20 text-justify rounded-lg lg:hidden lg:gap-10 sm:shadow-md lg:items-start lg:flex-row'>
                <div className='w-full text-lg border-b text-start may text-secondary lg:hidden'>RARE</div>
                {/* ----------- NFT card ----------- */}
                <div className='flex flex-col p-1 bg-white border-2 rounded-lg'>
                    <Image
                        className="w-full rounded-md"
                        src={rare}
                        alt='nft image'

                    />
                    <div className='flex flex-row justify-between w-full p-2 txt-[#5d5d5d]'>
                        <div className=" text-start">
                            <h3 className="font-bold ">Dragonkeeper Rare </h3>
                        </div>
                        <div className=' text-start'>
                            <p>Price</p>
                            <p className='flex flex-row items-center ' >
                                <FaEthereum />{priceRare}
                            </p>
                        </div>
                    </div>
                </div>
                {/* ----------- NFT DESCRIPTION ----------- */}
                <div className='flex flex-col lg:items-start items-center justify-between lg:w-auto sm:w-[26.5rem] h-12/12'>
                    <div className='hidden w-full mb-6 text-lg border-b may text-secondary text-start lg:flex'>RARE</div>
                    <ul className='ml-8 list-disc text-start'>
                        <li className='mb-2'><FormattedMessage id='nft.rare1' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.rare2' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.rare3' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.rare4' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.rare5' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.rare6' default='description' /></li>

                    </ul>
                    <div className='flex items-center mt-4 ml-4 w-44'>
                        {hasMetamask ? (
                            isConnected ? (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => mint_Rare()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Buy Now
                                    </span>
                                </button>
                            ) : (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => connect()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            )
                        ) : (
                            <Link
                                href={`https://metamask.io/download/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4 button nav-button btn-sm"
                            >
                                <button className="bg-white shadow-lg button learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* --------------- For Screen --------------- */}
            <div className='flex-col items-center justify-around hidden w-full p-4 mb-20 text-justify rounded-lg shadow-md lg:flex lg:items-start lg:flex-row'>
                {/* ----------- NFT DESCRIPTION ----------- */}
                <div className='flex flex-col items-center justify-between h-12/12 '>
                    <div className='flex flex-col items-start justify-center w-full mb-8'>
                        <div className='w-full mb-6 text-lg border-b may text-secondary text-start'>RARE</div>
                        <ul className='ml-8 list-disc text-start'>
                            <li className='mb-2'><FormattedMessage id='nft.rare1' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.rare2' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.rare3' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.rare4' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.rare5' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.rare6' default='description' /></li>
                        </ul>
                        <div className='flex items-center mt-4 ml-2 w-44'>
                            {hasMetamask ? (
                                isConnected ? (
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => mint_Rare()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text " translate="no">
                                            Buy Now
                                        </span>
                                    </button>
                                ) : (
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => connect()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text " translate="no">
                                            Connect
                                        </span>
                                    </button>
                                )
                            ) : (
                                <Link
                                    href={`https://metamask.io/download/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mx-4 button nav-button btn-sm"
                                >
                                    <button className="bg-white shadow-lg button learn-more">
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text " translate="no">
                                            Connect
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* ----------- NFT CARD ----------- */}
                <div className='flex flex-col p-1 bg-white border-2 rounded-lg'>
                    <Image
                        className="w-full rounded-md"
                        src={rare}
                        alt='nft image'

                    />
                    <div className='flex flex-row justify-between w-full p-2 txt-[#5d5d5d]'>
                        <div className=" text-start">
                            <h3 className="font-bold ">Dragonkeeper Rare </h3>
                        </div>
                        <div className=' text-start'>
                            <p>Price</p>
                            <p className='flex flex-row items-center ' >
                                <FaEthereum />{priceRare}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* =========================== UNCOMMON Category =========================== */}
            <div className='flex flex-col items-center justify-around w-full gap-5 mb-20 text-justify rounded-lg sm:p-4 lg:gap-10 sm:shadow-md lg:items-start lg:flex-row'>
                <div className='w-full text-lg border-b text-start may text-secondary lg:hidden'>UNCOMMON</div>
                {/* ----------- NFT card ----------- */}
                <div className='flex flex-col p-1 bg-white border-2 rounded-lg'>
                    <Image
                        className="w-full rounded-md"
                        src={uncommon}
                        alt='nft image'

                    />
                    <div className='flex flex-row justify-between w-full p-2 txt-[#5d5d5d]'>
                        <div className=" text-start">
                            <h3 className="font-bold ">Dragonkeeper Uncommon </h3>
                        </div>
                        <div className=' text-start'>
                            <p>Price</p>
                            <p className='flex flex-row items-center ' >
                                <FaEthereum />{priceUCommon}
                            </p>
                        </div>
                    </div>
                </div>
                {/* ----------- NFT DESCRIPTION ----------- */}
                <div className='flex flex-col lg:items-start items-center justify-between lg:w-auto sm:w-[26.5rem] h-12/12 p-4' >
                    <div className='hidden w-full mb-6 text-lg border-b may text-secondary text-start lg:flex'>UNCOMMON</div>
                    <ul className='ml-8 list-disc text-start'>
                        <li className='mb-2'><FormattedMessage id='nft.uncommon1' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.uncommon2' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.uncommon3' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.uncommon4' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.uncommon5' default='description' /></li>

                    </ul>
                    <div className='flex items-center mt-4 ml-4 w-44'>
                        {hasMetamask ? (
                            isConnected ? (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => mint_Uncommon()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Buy Now
                                    </span>
                                </button>
                            ) : (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => connect()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            )
                        ) : (
                            <Link
                                href={`https://metamask.io/download/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4 button nav-button btn-sm"
                            >
                                <button className="bg-white shadow-lg button learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* =========================== COMMON Category =========================== */}
            {/* --------------- For Mobile --------------- */}
            <div className='flex flex-col items-center justify-around w-full gap-5 mb-20 text-justify rounded-lg lg:hidden lg:gap-10 sm:shadow-md lg:items-start lg:flex-row'>
                <div className='w-full text-lg border-b text-start may text-secondary lg:hidden'>COMMON</div>
                {/* ----------- NFT card ----------- */}
                <div className='flex flex-col p-1 bg-white border-2 rounded-lg'>
                    <Image
                        className="w-full rounded-md"
                        src={common}
                        alt='nft image'

                    />
                    <div className='flex flex-row justify-between w-full p-2 txt-[#5d5d5d]'>
                        <div className=" text-start">
                            <h3 className="font-bold ">Dragonkeeper Common </h3>
                        </div>
                        <div className=' text-start'>
                            <p>Price</p>
                            <p className='flex flex-row items-center ' >
                                <FaEthereum />{priceCommon}
                            </p>
                        </div>
                    </div>
                </div>
                {/* ----------- NFT DESCRIPTION ----------- */}
                <div className='flex flex-col lg:items-start items-center justify-between lg:w-auto sm:w-[26.5rem] h-12/12'>
                    <div className='hidden w-full mb-6 text-lg border-b may text-secondary text-start lg:flex'>COMMON</div>
                    <ul className='ml-8 list-disc text-start'>
                        <li className='mb-2'><FormattedMessage id='nft.common1' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.common2' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.common3' default='description' /></li>
                        <li className='mb-2'><FormattedMessage id='nft.common4' default='description' /></li>
                    </ul>
                    <div className='flex items-center mt-4 ml-4 w-44'>
                        {hasMetamask ? (
                            isConnected ? (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => mint_Common()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Buy Now
                                    </span>
                                </button>
                            ) : (
                                <button className="bg-white shadow-lg button learn-more" onClick={() => connect()} >
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            )
                        ) : (
                            <Link
                                href={`https://metamask.io/download/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4 button nav-button btn-sm"
                            >
                                <button className="bg-white shadow-lg button learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text " translate="no">
                                        Connect
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* --------------- For Screen --------------- */}
            <div className='flex-col items-center justify-around hidden w-full p-4 mb-20 text-justify rounded-lg shadow-md lg:flex lg:items-start lg:flex-row'>
                {/* ----------- NFT DESCRIPTION ----------- */}
                <div className='flex flex-col items-center justify-between h-12/12 '>
                    <div className='flex flex-col items-start justify-center w-full mb-8'>
                        <div className='w-full mb-6 text-lg border-b may text-secondary text-start'>common</div>
                        <ul className='ml-8 list-disc text-start'>
                            <li className='mb-2'><FormattedMessage id='nft.common1' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.common2' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.common3' default='description' /></li>
                            <li className='mb-2'><FormattedMessage id='nft.common4' default='description' /></li>
                        </ul>
                        <div className='flex items-center mt-4 ml-2 w-44'>
                            {hasMetamask ? (
                                isConnected ? (
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => mint_Common()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text " translate="no">
                                            Buy Now
                                        </span>
                                    </button>
                                ) : (
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => connect()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text " translate="no">
                                            Connect
                                        </span>
                                    </button>
                                )
                            ) : (
                                <Link
                                    href={`https://metamask.io/download/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mx-4 button nav-button btn-sm"
                                >
                                    <button className="bg-white shadow-lg button learn-more">
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text " translate="no">
                                            Connect
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* ----------- NFT CARD ----------- */}
                <div className='flex flex-col p-1 bg-white border-2 rounded-lg'>
                    <Image
                        className="w-full rounded-md"
                        src={common}
                        alt='nft image'

                    />
                    <div className='flex flex-row justify-between w-full p-2 txt-[#5d5d5d]'>
                        <div className=" text-start">
                            <h3 className="font-bold ">Dragonkeeper Common </h3>
                        </div>
                        <div className=' text-start'>
                            <p>Price</p>
                            <p className='flex flex-row items-center ' >
                                <FaEthereum />{priceCommon}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NFTZone;
