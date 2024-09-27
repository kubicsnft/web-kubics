import Image from 'next/image';
import { useEffect, useState, useContext } from "react";
import Link from "next/link"
import axios from "axios";
import { ethers } from "ethers";
import { dragonKeeper } from "../../constants";
import DragonKeeper from "../../artifacts/contracts/DragonKeeper.sol/DragonKeeper.json";
import Swal from 'sweetalert2'
import { FaEthereum } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl';
import { MovingSquareLoader } from 'react-loaders-kit';

import { ConnectContext } from '../../context/MyProvider'

function CardPremium(props) {
    // ---- Price NFT Legendary -------
    const price = 0.5

    // =================== Loader ===================
    const [loading, setLoading] = useState(false);

    // ----- setState OF NFT_zone ----
    const setLoadNFT_zone = props.loading


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


    const [hasMetamask, setHasMetamask] = useState(false);
    const [isConnected, setIsConnected] = useState(connected);
    const [isSold, setIsSold] = useState(props.sold);
    const [currentSold, setCurrentSold] = useState(false)
    const [imageURI, setImageURI] = useState(undefined);
    const [openseaURL, setOpenseaURL] = useState(undefined);
    const mongoAPI = process.env.NEXT_PUBLIC_MONGO_API


   

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    }, []);

    //Function POST to call the API and create NFT
    async function postAPI(id) {

        let body = {
            id: id,
            mint: true,
        }
        //Call to Register API
        try {
            axios.post(mongoAPI, body).then(response => {
                console.log(response.data)
                console.log("nft legendary saved")
            })
        } catch (error) {

        }

    }

    //Function Mint LEGENDARY
    async function mint_Legendary(id) {
        if (typeof window.ethereum !== "undefined") {
            try {
                const contract = new ethers.Contract(
                    dragonKeeper,
                    DragonKeeper.abi,
                    signer
                );

                const tokenID_Collection = await contract.getTokenCounter();
                console.log(`Token ID: ${tokenID_Collection.toString()}`);

                const tokenId_Legendary = await contract.getTokenCounter_Legendary();
                console.log(`Token ID Category Legendary: ${id.toString()}`);
                const contentIdMetadata_Legendary =
                    "QmZUwBLjDjGfWC3mnSmMWj8CF1LTVa4di5QSeSvuDtQi2z";
                const metadataURI = `${contentIdMetadata_Legendary}/${id}.json`;

                const contentIdImages_Legendary =
                    "QmPXHyjmy71fQgQqaNYR3h9pH2v5jqVfoYGw5uEV9ayC9t";
                const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Legendary}/${id}.png`;

                //URL Needs to be updated with production data
                const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;

                setLoading(true)
                const result = await contract.payToMint_Legendary(metadataURI, {
                    value: ethers.utils.parseEther("0.006"),
                });
                await result.wait();
                setImageURI(imageURI);
                setOpenseaURL(openSeaURL);
                setCurrentSold(true);
                postAPI(id);   
                setLoading(false)
                //----- ALERT ------
                Swal.fire({
                    title: 'Excellent! You have bought your NFT!',
                    imageUrl: imageURI,
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: 'Custom image',
                    imageAlt: 'A tall image',
                    html:
                        '<a class="text-xl text-secondary underline  transition hover:text-blue-500"' +
                        'href="' + openSeaURL + '" ' +
                        '>View it on opensea</a> ',
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Exit',
                    confirmButtonColor: '#7B94b1'
                })

            } catch (error) {
                console.log(error);
                setLoading(false)
                if (error.error) {
                    if (error.error.code === -32603) {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            iconColor: '#7094b1',
                            title: 'Sorry, this NFT has already been sold!',
                            showConfirmButton: true,
                            confirmButtonText: 'Ok',
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
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            iconColor: '#7094b1',
                            title: 'Unexpected error',
                            showConfirmButton: true,
                            confirmButtonText: 'Ok',
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
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            iconColor: '#7094b1',
                            title: 'Unexpected error',
                            showConfirmButton: true,
                            confirmButtonText: 'Ok',
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
                    })
                }
            }
        } else {
            console.log("Please install MetaMask");
        }
    }


    //Function Whitelist Mint LEGENDARY

    // async function whitelist_Mint_Legendary(id) {
    //     if (typeof window.ethereum !== "undefined") {
    //         const contract = new ethers.Contract(
    //             dragonKeeper,
    //             DragonKeeper.abi,
    //             signer
    //         );

    //         const tokenID_Collection = await contract.getTokenCounter();
    //         console.log(`Token ID: ${tokenID_Collection.toString()}`);

    //         const tokenId_Legendary = await contract.getTokenCounter_Legendary();
    //         console.log(`Token ID Category Legendary: ${id.toString()}`);
    //         const contentIdMetadata_Legendary =
    //             "QmZUwBLjDjGfWC3mnSmMWj8CF1LTVa4di5QSeSvuDtQi2z";
    //         const metadataURI = `${contentIdMetadata_Legendary}/${id}.json`;

    //         const contentIdImages_Legendary =
    //             "QmPXHyjmy71fQgQqaNYR3h9pH2v5jqVfoYGw5uEV9ayC9t";
    //         const imageURI = `https://kubicsnft.mypinata.cloud/ipfs/${contentIdImages_Legendary}/${id}.png`;

    //         //URL Needs to be updated with production data
    //         const openSeaURL = `https://testnets.opensea.io/assets/goerli/${dragonKeeper}/${tokenID_Collection}`;
    //         try {
    //             const result = await contract.whitelistMinting_Legendary(metadataURI, {
    //                 value: ethers.utils.parseEther("0.005"),
    //             });
    //             await result.wait();

    //            setImageURI(imageURI);
    //            setOpenseaURL(openSeaURL);
    //            setCurrentSold(true);
    //            postAPI(id);
    //            setLoadNFT_zone(false)
    //            setLoading(false)
    //            
    //            Swal.fire({
    //     title: 'Excellent! You have bought your NFT!',
    //     // icon: 'success',
    //     imageUrl: imageURI,
    //     imageWidth: 400,
    //     imageHeight: 300,
    //     imageAlt: 'Custom image',
    //     imageAlt: 'A tall image',
    //     html:
    //         '<a class="text-xl text-secondary underline  transition hover:text-blue-500"' +
    //         'href="' + openSeaURL + '" ' +
    //         '>View it on opensea</a> ',
    //     showCloseButton: true,
    //     focusConfirm: false,
    //     confirmButtonText: 'Exit',
    //     confirmButtonColor: '#7B94b1'
    // })
    //             console.log(openSeaURL);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         console.log("Please install MetaMask");
    //     }
    // }

    // 



    return (
        <>

            {/* ------- loading ----- */}
            {loading ? (
                <div className='z-50 fixed w-screen  lg:h-[750rem] md:h-[1040rem] sm:h-[1060rem] h-[930rem] bg-[#9490908f] flex items-center justify-center  '>
                    <div className='relative flex items-center justify-center bg-white rounded-lg w-52 h-44'>
                        <div className="fixed flex flex-col items-center justify-center text-center">
                            <MovingSquareLoader   {...loaderProps} />
                            <div className="mt-3">LOADING ...</div>
                        </div>
                    </div>
                </div>) : ''}
            {/* ---------------------- */}
            <div className="  bg-white p-1 flex flex-col items-cener rounded-lg shadow-md box  border-primary sm:shadow-[#7B94b1]  w-72 sm:w-96">
                {props.sold ? <div className='rounded-lg absolute z-10  w-full sm:h-[23.6rem] h-[19.2rem] bg-[#4d4c4c9a] left-0'></div> : ''}
                {currentSold ? <div className='rounded-lg absolute z-10  w-full sm:h-[23.6rem] h-[19.2rem] bg-[#4d4c4c9a] left-0'></div> : ''}
                <div>
                    <Image
                        className="flex rounded-md"
                        key={props.id}
                        src={props.image}
                        alt='nft image'
                        layout='responsive'
                        width={364}
                        height={273}
                    />
                </div>
                <div className='flex flex-row justify-between w-full p-2 text-primary'>
                    <div className="flex flex-col items-start justify-between gap-2">
                        <h3 className="text-sm font-bold">{props.title}</h3>
                        {/* <p className='text-sm text-start'>{props.description}</p> */}
                        <div className='z-20 w-44'>
                            {/*  */}
                            {/* <div className='flex items-center justify-center h-12 text-xl font-bold tracking-widest text-secondary -rotate-6 may'>
                            <FormattedMessage
                                id='imminent'
                                defaultMessage='IMINENTE'
                            />
                        </div> */}
                            {currentSold ? (
                                <div className='flex items-center justify-center h-12 text-2xl font-bold tracking-widest text-secondary -rotate-6 may'>
                                    <FormattedMessage
                                        id='sold'
                                        defaultMessage='SOLD'
                                    />
                                </div>
                            ) : (
                                props.sold ? (
                                    <div className='flex items-center justify-center h-12 text-2xl font-bold tracking-widest text-secondary -rotate-6 may'>
                                        <FormattedMessage
                                            id='sold'
                                            defaultMessage='SOLD'
                                        />
                                    </div>
                                ) : (
                                    hasMetamask ? (
                                        isConnected ? (
                                            <button className="text-sm shadow-md button learn-more" onClick={() => mint_Legendary(props.id)}>
                                                <span className="circle" aria-hidden="true">
                                                    <span className="icon arrow"></span>
                                                </span>
                                                <span className="button-text" translate="no">
                                                    Buy Now
                                                </span>
                                            </button>
                                        ) : (
                                            <button className="bg-white shadow-lg button learn-more" onClick={() => conn_Context.connect()} >
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
                                    )
                                )
                            )
                            }
                        </div>
                    </div>
                    <div className=' text-start'>
                        <p>Price</p>
                        <p className='flex flex-row items-center ' >
                            {/* ====== PRICE ======== */}
                            <FaEthereum />{price}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};



export default CardPremium
