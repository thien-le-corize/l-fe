import Individual from '@/app/pages/Individual/Individual'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const IndividualPage = async () => {
    const cookieStore = cookies()
    const user =  cookieStore.get('user')
    const parsedUser = user && JSON.parse(user.value ?? '')
   
    if (!parsedUser) {
        redirect('/login')
    }

  return (
    <Individual parsedUser={parsedUser}/>
  )
}

export default IndividualPage