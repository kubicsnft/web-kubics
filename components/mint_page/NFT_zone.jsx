import React from 'react';
import Carousel_Legend from './Carousel_legendary';
import ConnectButton from "./connectButton";
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl';
import { useEffect, useState, useContext } from "react";
import Link from "next/link"
import axios from "axios";
import { ethers } from "ethers";
import { dragonKeeper } from "../../constants";
import DragonKeeper from "../../artifacts/contracts/DragonKeeper.sol/DragonKeeper.json";
import Swal from 'sweetalert2'
import { MovingSquareLoader } from 'react-loaders-kit'

// import gif categorys
import ultraRare from '../../public/dragonkeeper/gif/ultraRare.gif'
import rare from '../../public/dragonkeeper/gif/rare.gif'
import uncommon from '../../public/dragonkeeper/gif/uncommon.gif'
import common from '../../public/dragonkeeper/gif/common.gif'

import { ConnectContext } from '../../context/MyProvider'

// import {img} from '../../public/dragonkeeper/nft_legenday/10.webp'
const NFTZone = (props) => {

    // =================== Error alerts ===================
    const alertBought = (url, img) => {
        return (
            Swal.fire({
                title: 'Excellent! You have bought your NFT!',
                // icon: 'success',
                imageUrl: img,
                imageWidth: 400,
                imageHeight: 300,
                imageAlt: 'Custom image',
                imageAlt: 'A tall image',
                html:
                    '<a class="text-xl text-secondary underline  transition hover:text-blue-500"' +
                    'href="' + url + '" ' +
                    '>View it on opensea</a> ',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Exit',
                confirmButtonColor: '#7B94b1'
            })
        )
    }

    const alertsError = (error) => {
        if (error.error) {
            if (error.error.code === -32603) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    iconColor: '#7094b1',
                    title: 'Sorry, this NFT has already been sold!',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#7B94b1'
                })
            }
            else if (error.error.code === -32000) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    iconColor: '#7094b1',
                    title: 'There are not enough funds!',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#7B94b1'
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    iconColor: '#7094b1',
                    title: 'Unexpected error',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#7B94b1'
                })
            }
        }
        else if (error.code) {
            if (error.code == 'NETWORK_ERROR' || error.code == 'CALL_EXCEPTION') {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    iconColor: '#7094b1',
                    title: 'Your not connected to the Ethereum network',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#7B94b1'
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    iconColor: '#7094b1',
                    title: 'Unexpected error',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#7B94b1'
                })
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                iconColor: '#7094b1',
                title: 'Unexpected error',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#7B94b1'
            })
        }
    }



    // =================== Loader ===================
    const [loading, setLoading] = useState(false);

    const loaderProps = {
        loading,
        size: 35,
        duration: 1,
        colors: ['#7094b1', '#E1B649']
    }


    // =================== Provider ===================
    const conn_Context = useContext(ConnectContext)

    const connected = conn_Context.is_Connected()
    const signer = conn_Context.get_Signer()
    const account = conn_Context.get_Account()

    // =================== States ===================

    const [isConnected, setIsConnected] = useState(connected);
    //const [hasSigner, setSigner] = useState(conn_Context.get_Signer());
    const [hasMetamask, setHasMetamask] = useState(false);
    //const [hasAccount, setAccount] = useState(conn_Context.get_Account());
    const [imageURI, setImageURI] = useState(undefined);
    const [openseaURL, setOpenseaURL] = useState(undefined);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    }, []);

    useEffect(() => {
        if (connected === true) {
            setIsConnected(true);
        }
    }, [connected]);

    /* ------------------  MINT FUNCTIONS ------------------ */

    //Function Mint Category ULTRARARE
    async function mint_UltraRare() {
        if (typeof window.ethereum !== "undefined") {
            try {
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


                const contentIdImages_UltraRare =
                    "QmfEimuwbfPhdgnVnx3J1gbfpfdQYMwEYxGV8RT8sKMEDe";
                const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_UltraRare}/${tokenId_UltraRare}.png`;

                //URL Needs to be updated with production data
                const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;

                setLoading(true)
                const result = await contract.payToMint_UltraRare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setOpenseaURL(openSeaURL);
                setImageURI(imageURI);
                setLoading(false)
                //------- ALERT --------
                alertBought(openSeaURL, imageURI)
                // ---------------------
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
                setLoading(false)
                alertsError(error)
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
            try {
                const tokenID_Collection = await contract.getTokenCounter();
                console.log(`Token ID: ${tokenID_Collection.toString()}`);

                const tokenId_Rare = await contract.getTokenCounter_Rare();
                console.log(`Token ID Category Rare: ${tokenId_Rare.toString()}`);


                const contentIdMetadata_Rare =
                    "QmXULEzuP1aHfgbtRMDVwH2L2qG76K48cDd8s4S3uZsHxu";
                const metadataURI = `${contentIdMetadata_Rare}/${tokenId_Rare}.json`;


                const contentIdImages_Rare =
                    "QmQtxEB6H1PZRHSAQA4rFyUxUW4fiHbwDTVAMfw8SKkRVA";
                const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Rare}/${tokenId_Rare}.png`;

                //URL Needs to be updated with production data
                const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;

                setLoading(true)
                const result = await contract.payToMint_Rare(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setOpenseaURL(openSeaURL);
                setImageURI(imageURI);
                setLoading(false)
                //------- ALERT --------
                alertBought(openSeaURL, imageURI)
                // ---------------------
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
                setLoading(false)
                alertsError(error)

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
            try {
                const tokenID_Collection = await contract.getTokenCounter();
                console.log(`Token ID: ${tokenID_Collection.toString()}`);

                const tokenId_Uncommon = await contract.getTokenCounter_Uncommon();
                console.log(`Token ID Category Uncommon: ${tokenId_Uncommon.toString()}`);


                const contentIdMetadata_Uncommon =
                    "QmSuK42qdgBqhMQS69U4wJ9BBWrBRsdTgemrHqHfhAacM5";
                const metadataURI = `${contentIdMetadata_Uncommon}/${tokenId_Uncommon}.json`;


                const contentIdImages_Uncommon =
                    "QmWBWUpMCkqFoWb9QmLwVo3qKxoY1om1aBc6QtUUDui2Y1";
                const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Uncommon}/${tokenId_Uncommon}.png`;

                //URL Needs to be updated with production data
                const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;

                setLoading(true)
                const result = await contract.payToMint_Uncommon(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setOpenseaURL(openSeaURL);
                setImageURI(imageURI);
                setLoading(false);
                //------- ALERT --------
                alertBought(openSeaURL, imageURI);
                // ---------------------
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
                setLoading(false);
                alertsError(error);
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
            try {
                const tokenID_Collection = await contract.getTokenCounter();
                console.log(`Token ID: ${tokenID_Collection.toString()}`);

                const tokenId_Common = await contract.getTokenCounter_Common();
                console.log(`Token ID Category Common: ${tokenId_Common.toString()}`);


                const contentIdMetadata_Common =
                    "QmazdhrysQenu9RePX2Y47VbJAUYMCjgtkMi6daepDLMwL";
                const metadataURI = `${contentIdMetadata_Common}/${tokenId_Common}.json`;


                const contentIdImages_Common =
                    "QmTTYqyXV9vpgwtvn9EeknNAuGqMScyf666GpzXDJrMHtz";
                const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Common}/${tokenId_Common}.png`;

                //URL Needs to be updated with production data
                const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;

                setLoading(true)
                const result = await contract.payToMint_Common(metadataURI, {
                    value: ethers.utils.parseEther("0.005"),
                });
                await result.wait();
                setOpenseaURL(openSeaURL);
                setImageURI(imageURI);
                setLoading(false)
                //------- ALERT --------
                alertBought(openSeaURL, imageURI)
                // ---------------------
                console.log(openSeaURL);
            } catch (error) {
                console.log(error);
                setLoading(false);
                alertsError(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    /* ------------------ WHITELIST MINT FUNCTIONS ------------------ */

    // //Function Whitelist Mint Category ULTRARARE
    // async function whitelist_Mint_UltraRare() {
    //     if (typeof window.ethereum !== "undefined") {
    //         const contract = new ethers.Contract(
    //             dragonKeeper,
    //             DragonKeeper.abi,
    //             signer
    //         );
    //         const tokenID_Collection = await contract.getTokenCounter();
    //         console.log(`Token ID: ${tokenID_Collection.toString()}`);

    //         const tokenId_UltraRare = await contract.getTokenCounter_UltraRare();
    //         console.log(`Token ID Category UltraRare: ${tokenId_UltraRare.toString()}`);

    //         const contentIdMetadata_UltraRare =
    //             "QmQswc9AWienxmWLA3pGBQpMJ3R2kXdWCn51GAMxj5G9rE";
    //         const metadataURI = `${contentIdMetadata_UltraRare}/${tokenId_UltraRare}.json`;
    //         console.log(`https://ipfs.io/ipfs/${metadataURI}`);

    //         const contentIdImages_UltraRare =
    //             "QmfEimuwbfPhdgnVnx3J1gbfpfdQYMwEYxGV8RT8sKMEDe";
    //         const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_UltraRare}/${tokenId_UltraRare}.png`;

    //         //URL Needs to be updated with production data
    //         const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
    //         try {
    //             setLoading(true)
    //             const result = await contract.whitelistMinting_UltraRare(metadataURI, {
    //                 value: ethers.utils.parseEther("0.005"),
    //             });
    //             await result.wait();
    //             setOpenseaURL(openSeaURL);
    //             setImageURI(imageURI);
    //             setLoading(false)
    //             //------- ALERT --------
    //             alertBought(openSeaURL,imageURI)
    //             // ---------------------
    //             console.log(openSeaURL);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         console.log("Please install MetaMask");
    //     }
    // }

    // //Function Whitelist Mint Category RARE
    // async function whitelist_Mint_Rare() {
    //     if (typeof window.ethereum !== "undefined") {
    //         const contract = new ethers.Contract(
    //             dragonKeeper,
    //             DragonKeeper.abi,
    //             signer
    //         );
    //         const tokenID_Collection = await contract.getTokenCounter();
    //         console.log(`Token ID: ${tokenID_Collection.toString()}`);

    //         const tokenId_Rare = await contract.getTokenCounter_Rare();
    //         console.log(`Token ID Category Rare: ${tokenId_Rare.toString()}`);

    //         const contentIdMetadata_Rare =
    //             "QmXULEzuP1aHfgbtRMDVwH2L2qG76K48cDd8s4S3uZsHxu";
    //         const metadataURI = `${contentIdMetadata_Rare}/${tokenId_Rare}.json`;
    //         console.log(`https://ipfs.io/ipfs/${metadataURI}`);

    //         const contentIdImages_Rare =
    //             "QmQtxEB6H1PZRHSAQA4rFyUxUW4fiHbwDTVAMfw8SKkRVA";
    //         const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Rare}/${tokenId_Rare}.png`;

    //         //URL Needs to be updated with production data
    //         const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
    //         try {
    //             setLoading(true)
    //             const result = await contract.whitelistMinting_Rare(metadataURI, {
    //                 value: ethers.utils.parseEther("0.005"),
    //             });
    //             await result.wait();
    //             setOpenseaURL(openSeaURL);
    //             setImageURI(imageURI);
    //             setLoading(false)
    //             //------- ALERT --------
    //             alertBought(openSeaURL,imageURI)
    //             // ---------------------
    //             console.log(openSeaURL);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         console.log("Please install MetaMask");
    //     }
    // }

    // //Function Mint Category UNCOMMON
    // async function whitelist_Mint_Uncommon() {
    //     if (typeof window.ethereum !== "undefined") {
    //         const contract = new ethers.Contract(
    //             dragonKeeper,
    //             DragonKeeper.abi,
    //             signer
    //         );
    //         const tokenID_Collection = await contract.getTokenCounter();
    //         console.log(`Token ID: ${tokenID_Collection.toString()}`);

    //         const tokenId_Uncommon = await contract.getTokenCounter_Uncommon();
    //         console.log(`Token ID Category Uncommon: ${tokenId_Uncommon.toString()}`);

    //         const contentIdMetadata_Uncommon =
    //             "QmSuK42qdgBqhMQS69U4wJ9BBWrBRsdTgemrHqHfhAacM5";
    //         const metadataURI = `${contentIdMetadata_Uncommon}/${tokenId_Uncommon}.json`;
    //         console.log(`https://ipfs.io/ipfs/${metadataURI}`);

    //         const contentIdImages_Uncommon =
    //             "QmWBWUpMCkqFoWb9QmLwVo3qKxoY1om1aBc6QtUUDui2Y1";
    //         const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Uncommon}/${tokenId_Uncommon}.png`;

    //         //URL Needs to be updated with production data
    //         const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
    //         try {
    //             setLoading(true)
    //             const result = await contract.whitelistMinting_Uncommon(metadataURI, {
    //                 value: ethers.utils.parseEther("0.005"),
    //             });
    //             await result.wait();
    //             setOpenseaURL(openSeaURL);
    //             setImageURI(imageURI);
    //             setLoading(false)
    //             //------- ALERT --------
    //             alertBought(openSeaURL,imageURI)
    //             // ---------------------
    //             console.log(openSeaURL);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         console.log("Please install MetaMask");
    //     }
    // }

    // //Function Mint Category COMMON
    // async function whitelist_Mint_Common() {
    //     if (typeof window.ethereum !== "undefined") {
    //         const contract = new ethers.Contract(
    //             dragonKeeper,
    //             DragonKeeper.abi,
    //             signer
    //         );
    //         const tokenID_Collection = await contract.getTokenCounter();
    //         console.log(`Token ID: ${tokenID_Collection.toString()}`);

    //         const tokenId_Common = await contract.getTokenCounter_Common();
    //         console.log(`Token ID Category Common: ${tokenId_Common.toString()}`);

    //         const contentIdMetadata_Common =
    //             "QmazdhrysQenu9RePX2Y47VbJAUYMCjgtkMi6daepDLMwL";
    //         const metadataURI = `${contentIdMetadata_Common}/${tokenId_Common}.json`;
    //         console.log(`https://ipfs.io/ipfs/${metadataURI}`);

    //         const contentIdImages_Common =
    //             "QmTTYqyXV9vpgwtvn9EeknNAuGqMScyf666GpzXDJrMHtz";
    //         const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Common}/${tokenId_Common}.png`;

    //         //URL Needs to be updated with production data
    //         const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
    //         try {
    //             setLoading(true)
    //             const result = await contract.payToMint_UltraRare(metadataURI, {
    //                 value: ethers.utils.parseEther("0.005"),
    //             });
    //             await result.wait();
    //             setOpenseaURL(openSeaURL);
    //             setImageURI(imageURI);
    //             setLoading(false)
    //             //------- ALERT --------
    //             alertBought(openSeaURL,imageURI)
    //             // ---------------------
    //             console.log(openSeaURL);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         console.log("Please install MetaMask");
    //     }
    // }

    // --------- Prices categorys ----------
    const priceURare = 0.4
    const priceRare = 0.3
    const priceUCommon = 0.2
    const priceCommon = 0.18


    /*      //Test
         async function Withdraw() {
            if (typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(
                    dragonKeeper,
                    DragonKeeper.abi,
                    signer
                );
                await contract.Withdraw()
            }
        } */



    return (
        <>
            {/* ------- loading ----- */}
            {loading ? (
                <div className='z-50 fixed w-full h-screen bg-[#9490908f] flex items-center justify-center  bottom-0'>
                    <div className='flex items-center justify-center bg-white rounded-lg w-52 h-44'>
                        <div className="flex flex-col items-center justify-center text-center">
                            <MovingSquareLoader   {...loaderProps} />
                            <div className="mt-3">LOADING ...</div>
                        </div>
                    </div>
                </div>) : ''}
            {/* ---------------------- */}
            <div className='flex-col mt-5  lg:p-12 sm:p-10 p-4 items-center w-11/12  mb-4 rounded-lg border-2 shadow-lg shadow-[#7B94b1] bg-[#ffffff]  border-primary' >
                {/* <div className='md:absolute md:w-6/12 w-12/12  bg-[#7094b16e] rouded-lg md:left-1/4 -mt-20 md:text-2xl tracking-widest text-center -rotate-6 px-10 p-4 text-white may'>
                    <FormattedMessage
                        id='imminent'
                        defaultMessage='IMINENTE'
                    />
                </div> */}
                
                <h2 className='mb-4 text-3xl font-bold'>NFTs</h2>
                <div className='flex justify-center mb-6'>
                    <ConnectButton/>
                    </div>

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
                <div className='mb-32 ' >
                    <Carousel_Legend loading={setLoading} nfts_Sold={props.nfts_Sold} />
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
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Connect
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
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
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Install
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* =========================== RARE Category =========================== */}
                {/* --------------- For Mobile --------------- */}
                <div className='flex flex-col items-center justify-around w-full gap-5 p-4 mb-20 text-justify rounded-lg lg:hidden lg:gap-10 sm:shadow-md lg:items-start lg:flex-row'>
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
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Connect
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
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
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Install
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
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
                                        <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
                                            <span className="circle" aria-hidden="true">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                                Connect
                                                {/* <Image
                                                    className="ml-4"
                                                    src='/MetaMask.png'
                                                    width='25'
                                                    height='25'
                                                    alt="metamask"
                                                /> */}
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
                                            <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                                Install
                                                {/* <Image
                                                    className="ml-4"
                                                    src='/MetaMask.png'
                                                    width='25'
                                                    height='25'
                                                    alt="metamask"
                                                /> */}
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
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Connect
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
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
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Install
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* =========================== COMMON Category =========================== */}
                {/* --------------- For Mobile --------------- */}
                <div className='flex flex-col items-center justify-around w-full gap-5 p-4 mb-20 text-justify rounded-lg lg:hidden lg:gap-10 sm:shadow-md lg:items-start lg:flex-row'>
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
                                    <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Connect
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
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
                                        <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                            Install
                                            {/* <Image
                                                className="ml-4"
                                                src='/MetaMask.png'
                                                width='25'
                                                height='25'
                                                alt="metamask"
                                            /> */}
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
                            <div className='w-full mb-6 text-lg border-b may text-secondary text-start'>COMMON</div>
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
                                        <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
                                            <span className="circle" aria-hidden="true">
                                                <span className="icon arrow"></span>
                                            </span>
                                            <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                                Connect
                                                {/* <Image
                                                    className="ml-4"
                                                    src='/MetaMask.png'
                                                    width='25'
                                                    height='25'
                                                    alt="metamask"
                                                /> */}
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
                                            <span className="flex items-center justify-center gap-1 button-text" translate="no">
                                                Install
                                                {/* <Image
                                                    className="ml-4"
                                                    src='/MetaMask.png'
                                                    width='25'
                                                    height='25'
                                                    alt="metamask"
                                                /> */}
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
                {/* <button className="bg-white shadow-lg button learn-more" onClick={() => Withdraw()}> Withdraw </button> */}
            </div>
        </>

    );
}

export default NFTZone;
