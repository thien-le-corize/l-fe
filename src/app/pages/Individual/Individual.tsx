'use client';
import React, { FC } from 'react'
import LoanActions from './LoanActions/LoanActions';
import HomeBanners from './HomeBanners/HomeBanners';

 const Individual: FC<any> = ({ parsedUser }) => {


    return (
        <div>
            <HomeBanners/>
            <LoanActions/>
        </div>
    )
}

export default Individual