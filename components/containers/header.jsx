import React from 'react';
import CenterLogo from '../centerLogo';
import Newsletter from '../Newsletter';
import Swich from '../toggleSwitch';
import { FormattedMessage } from "react-intl"
import Whitelist from '../mint_page/Whithelist';

const Header = () => {
    return (
        <div className='flex flex-col justify-between w-full min-h-screen items-between max-w-screen-2xl text-primary'>
            <div className='grid sm:items-center sm:grid-cols-2 ' >
                <div className="hidden ml-10 text-lg xl:ml-0 2xl:-ml-2 text-start sm:flex">
                    <FormattedMessage
                        id='app.slogan'
                        defaultMessage='The world will never be round again'
                    />
                </div>
                <div className="flex justify-end 2xl:-mr-4">
                    <Swich />
                </div>
            </div>
            <div className="text-center ">
                <CenterLogo />
            </div>
            <div className='w-full mb-40 justify-self-center'>
                {/* WalletConnect */}
                <div className="flex items-center justify-center h-full">
                        {/* <Whitelist /> */}
                    </div>
            </div>

        </div>

    );
}

export default Header;
