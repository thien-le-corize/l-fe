'use client';
import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo.png'
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { httpClient } from '@/utils/httpClient';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const LoginPage = () => {
  const [loginData, setLoginData] = useState({ password: '', phoneNumber: '' })

  const router = useRouter()


  const login = useCallback(async (request: any) => {
    try {
      const res = await httpClient.post('/auth/login', request)
      Cookies.set('user', JSON.stringify(res.user as object))
      toast.success('Đăng nhập thành công')
      router.push('/individual')
    } catch (error) {
      toast.error('Sai số điện thoại hoặc mật khẩu')
    }
  }, [router])

  const { mutate } = useMutation({ mutationFn: login })

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault()

    if (!loginData.password || !loginData.phoneNumber) {
      toast.error('Hãy nhập tất cả các trường required')
      return
    }

    mutate(loginData)

  }, [loginData, mutate])



  const handleUpdateLoginData = useCallback((phoneNumber?: string, password?: string) => {
    if (phoneNumber) {

      setLoginData(prev => ({ ...prev, phoneNumber }))
    }

    if (password) {
      setLoginData(prev => ({ ...prev, password }))
    }
  }, [])

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex w-4/12 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image src={Logo.src} alt='' width={Logo.width} height={Logo.height} />
          </a>
          <div className={`w-full bg-white rounded-lg shadow dark-border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng nhập
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                  <input onChange={e => handleUpdateLoginData(e.target.value)} type="text" name="password" id="phoneNumber" placeholder="034*********" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                  <input onChange={e => handleUpdateLoginData(undefined, e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full text-gray-200 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Chưa có tài khoản? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký ở đây</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
