import React from 'react';

const TestRoadmap = () => {
    return (
        <div className='flex flex-row w-10/12 md:w-8/12 sm:8/12'>
            {/* ========================================== Left column ========================================== */}
            <div className='left'>
                <div className='group'>
                    <div className='logoP'></div>
                    <div className='LineH'>
                        <div className='ml-1 rectangle'>
                            <div className='phase'>PHASE 0 <span className='text-secondary'></span></div>
                            <ul className=''>
                                <div className='flex flex-row text'><span className='mr-2'>▪</span><li> 2022 - FX, Render and Comp</li></div>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                {/* ----------- */}
                <div className='group'>
                    <div className='logoP'></div>
                    <div className='flex justify-start LineH'>
                        <div className='ml-1 rectangle'>
                            <div className='phase'>PHASE II </div>
                            <ul className=''>
                                <div className='flex flex-row text'><span className='mr-2'>▪</span><li> 2023 - 2stQ Postproduction</li></div>
                                
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-1 h-5/5 bg-primary'></div>
            {/* ========================================== right column ========================================== */}
            <div className='right'>
                <div className='h-[140px] vacio'></div>
                {/*-------- For mobile (Left colums)-------- */}
                <div className=' group2'>
                    <div className='flex justify-start LineH'>
                        <div className='ml-2 rectangle2'>
                            <div className='phase'>PHASE 0 <span className='text-secondary'></span></div>
                            <ul className=''>
                                <div className='flex flex-row text'><span className='mr-2'>▪</span><li> 2022 - FX, Render and Comp</li></div>
                                
                            </ul>
                        </div>
                    </div>
                    <div className='logoP'></div>
                </div>
                {/* -------------------------------------- */}
                <div className='group'>
                    <div className='flex justify-end LineH'>
                        <div className='mr-1 rectangle'>
                            <div className='phase'>PHASE I <span className='text-secondary'></span></div>
                            <ul className=''>
                                <div className='flex flex-row text'><span className='mr-2'>▪</span><li> 2023 - 1stQ Render and Comp</li></div>
                                
                            </ul>
                        </div>
                    </div>
                    <div className='logoP'></div>
                </div>
                {/*-------- For mobile (Left colums)-------- */}
                <div className='group2'>
                    <div className='flex justify-start LineH'>
                        <div className='ml-2 rectangle2'>
                            <div className='phase'>PHASE II </div>
                            <ul className=''>
                                <div className='flex flex-row text'><span className='mr-2'>▪</span><li> 2023 - 2stQ Postproduction</li></div>
                                
                            </ul>
                        </div>
                    </div>
                    <div className='logoP'></div>
                </div>

                {/* -------------------------------------- */}
                <div className='group'>
                    <div className='flex justify-end LineH'>
                        <div className='mr-1 rectangle'>
                            <div className='phase'>PHASE III </div>
                            <ul className=''>
                                <div className='flex flex-row text'><span className='mr-2'>▪</span><li> Release on summer 2023</li></div>
                                
                            </ul>
                        </div>
                    </div>
                    <div className='logoP'></div>
                </div>
                
            </div>
        </div>
    );
}

export default TestRoadmap;
