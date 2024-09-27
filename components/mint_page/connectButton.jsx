import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import kubicsWhitelist from "../../artifacts/kubicsWhitelist.json";
import Swal from 'sweetalert2'
import { MovingSquareLoader } from 'react-loaders-kit'
import { FormattedMessage } from "react-intl"
import { ConnectContext } from '../../context/MyProvider'
import { RiErrorWarningLine } from 'react-icons/ri'

export default function Whitelist() {

  // =================== Provider ===================
  const conn_Context = useContext(ConnectContext)

  const connected = conn_Context.is_Connected()
  const signer = conn_Context.get_Signer()
  const account = conn_Context.get_Account()

  const [isConnected, setIsConnected] = useState(connected);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  //const [signer, setSigner] = useState(undefined);

  console.log(connected)

  const contractAddress = "0x9B399A856B0016Cf91c60aaAE195B33738874C2B";

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  useEffect(() => {
    if (connected === true) {
      setIsConnected(true);
    }
  }, [connected]);





  // ===================     Loader     ===================
  const [loading, setLoading] = useState(false);

  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    colors: ['#7094b1', '#E1B649']
  }

  // function buttonLoading() {
  //   if (loading)
  //     return (
  //       <div className="flex flex-col items-center justify-center text-center">
  //         <MovingSquareLoader   {...loaderProps} />
  //         <div className="mt-3">LOADING ...</div>
  //       </div>
  //     )
  //   else {
  //     return (
  //       <div className="flex flex-col items-center  sm:w-[30rem]">
  //         <div>
  //           <FormattedMessage
  //             id='wl.connected'
  //             defaultMessage='Connected! Make sure you are on the ETH Chain'
  //           />
  //         </div>
  //         <div className="w-64">
  //           <button className="w-32 mt-4 shadow-lg button learn-more" onClick={() => addToWhitelist()}>
  //             <span className="circle" aria-hidden="true">
  //               <span className="icon arrow"></span>
  //             </span>
  //             <span className="button-text" translate="no">
  //               <FormattedMessage
  //                 id='wl.join'
  //                 defaultMessage='JOIN OUR WHITELIST'
  //               />
  //             </span>
  //           </button>
  //         </div>
  //       </div>
  //     )
  //   }
  // }
  // ========================================================
  return (
    <div className="flex text-primary">
      {hasMetamask ? (
        isConnected ? ("") : (
          <div className="flex flex-col bg-[#ffffff8a] items-center justify-center p-5 rounded-lg shadow-xl sm:w-[30rem] ">
            <div className="mb-4">
              <FormattedMessage
                id='NFT.metamask'
                defaultMessage='Connect with Metamask to join our Whitelist!'
              />
            </div>
            <div className="flex flex-row items-center justify-center w-full">
              <button
                className=' buttMeta'
                type="button"
                onClick={() => conn_Context.connect()}
              >
                <p className="">
                  Connect
                </p>
                <svg strokeWidth="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="w-6 h-6 " xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
                <Image
                  className="ml-4"
                  src='/MetaMask.png'
                  width='30'
                  height='30'
                  alt="metamask"
                />
              </button>
            </div>
          </div>
        )

      ) : (

        <div className="flex flex-col  items-center justify-center p-5 rounded-lg shadow-xl sm:w-[30rem] ">
          <p>
            <span className="flex justify-center text-2xl text-secondary"><RiErrorWarningLine /></span>
            <FormattedMessage id="NFT.metamask.install1" defaultMessage='' />
            <a className="hover:text-[#E1B649] underline" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">Metamask</a>
            <FormattedMessage id="NFT.metamask.install2" defaultMessage='' />
          </p>
        </div>
      )}
    </div>
  );
}