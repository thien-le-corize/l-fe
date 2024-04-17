import React, { useMemo } from 'react'
import styled from 'styled-components'
import NewLoanIcon from './assets/newLoan.png'
import MyInfoIcon from './assets/myInfo.png'
import MyWaltIcon from './assets/myWaltet.png'
import HotlineIcon from './assets/hotline.png'
import Image from 'next/image'
import Link from 'next/link'

const LoanActions = () => {
const actions = useMemo(() => ([
    {id: 1, title: 'Đăng ký vay', icon: NewLoanIcon.src, link: '/loan-register'},
    {id: 2, title: 'Hồ sơ của tôi', icon: MyInfoIcon.src, link: '/user-detail'},
    {id: 3, title: 'Ví tiền', icon: MyWaltIcon.src, link: '/my-walt'},
    {id: 4, title: 'Hỗ trợ khách hàng', icon: HotlineIcon.src, link: '/'},
]),[])

  return (
    <div className='flex w-3/4 gap-7 my-20 mx-auto justify-center'>{actions.map(action => (
        <Link key={action.id} href={action.link} className='hover:opacity-80 flex w-1/4 cursor-pointer bg-sky-600 text-red-50 rounded-3xl px-4 py-8 flex-col justify-center items-center gap-5'>
            <ActionButton className='flex flex-col justify-center items-center gap-4'>
                <Image src={action.icon} alt='' width={62} height={62}/>
                {action.title}
            </ActionButton>
        </Link>
    ))}</div>
  )
}

export default LoanActions

const ActionButton = styled.div`

    img {
        object-fit: cover;
        filter: hue-rotate(180deg) saturate(0%) brightness(300%);

        
    }
`
