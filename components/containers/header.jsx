import React from 'react';
import CenterLogo from '../centerLogo';
import Newsletter from '../Newsletter';
import Swich from '../toggleSwitch';
import { FormattedMessage } from "react-intl"

const Header = () => {
    return (
        <div className='grid content-between w-full min-h-screen max-w-screen-2xl'>
            <div className='grid sm:items-center sm:grid-cols-2 -center' >
                <div className="hidden text-lg text-start sm:flex">
                    <FormattedMessage
                        id='app.slogan'
                        defaultMessage='The world will never be round again'
                    />
                </div>
                <div className="flex justify-end">
                    <Swich />
                </div>
            </div>
            <div className="mb-40 text-center">
                <CenterLogo />
            </div>
            <div className='w-3/5 mb-24 justify-self-center'>
                <Newsletter/>
            </div>

        </div>

    );
}

export default Header;
