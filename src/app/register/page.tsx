'use client';
import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo.png'
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { httpClient } from '@/utils/httpClient';
import { useRouter } from 'next/navigation';
import { keyBy } from 'lodash';


const countries = [
    {
        id: 1,
        name: 'United States (+1)',
        shortName: 'US (+1)',
        icon: <svg fill="none" aria-hidden="true" className="h-4 w-4 me-2" viewBox="0 0 20 15"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /><mask id="a" style={{ maskType: 'luminance' }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /></mask><g mask="url(#a)"><path fill="#D02F44" fill-rule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clip-rule="evenodd" /><path fill="#46467F" d="M0 .5h8.4v6.533H0z" /><g filter="url(#filter0_d_343_121520)"><path fill="url(#paint0_linear_343_121520)" fill-rule="evenodd" d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z" clip-rule="evenodd" /></g></g><defs><linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" /><stop offset="1" stop-color="#F0F0F0" /></linearGradient><filter id="filter0_d_343_121520" width="6.533" height="5.667" x=".933" y="1.433" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dy="1" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" /><feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" /></filter></defs></svg>
    },
    {
        id: 2,
        name: 'United Kingdom (+44)',
        shortName: 'UK (+44)',
        icon: <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /><mask id="a" style={{ maskType: 'luminance' }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /></mask><g mask="url(#a)"><path fill="#0A17A7" d="M0 .5h19.6v14H0z" /><path fill="#fff" fill-rule="evenodd" d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z" clip-rule="evenodd" /><path stroke="#DB1F35" stroke-linecap="round" stroke-width=".667" d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093" /><path fill="#E6273E" fill-rule="evenodd" d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z" clip-rule="evenodd" /></g></svg>
    },
    {
        id: 3,
        name: 'Australia (+61)',
        shortName: 'AUS (+61)',
        icon: <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /><mask id="a" style={{ maskType: 'luminance' }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /></mask><g mask="url(#a)"><path fill="#0A17A7" d="M0 .5h19.6v14H0z" /><path fill="#fff" stroke="#fff" stroke-width=".667" d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z" /><path fill="url(#paint0_linear_374_135177)" fill-rule="evenodd" d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z" clip-rule="evenodd" /><path fill="url(#paint1_linear_374_135177)" fill-rule="evenodd" d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z" clip-rule="evenodd" /><path fill="#fff" fill-rule="evenodd" d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z" clip-rule="evenodd" /></g><defs><linearGradient id="paint0_linear_374_135177" x1="0" x2="0" y1=".5" y2="7.5" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" /><stop offset="1" stop-color="#F0F0F0" /></linearGradient><linearGradient id="paint1_linear_374_135177" x1="0" x2="0" y1=".5" y2="7.033" gradientUnits="userSpaceOnUse"><stop stop-color="#FF2E3B" /><stop offset="1" stop-color="#FC0D1B" /></linearGradient></defs></svg>
    },
    {
        id: 4,
        name: 'Germany (+49)',
        shortName: 'GER (+49)',
        icon: <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /><mask id="a" style={{ maskType: 'luminance' }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse"><rect width="19.6" height="14" y=".5" fill="#fff" rx="2" /></mask><g mask="url(#a)"><path fill="#262626" fill-rule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clip-rule="evenodd" /><g filter="url(#filter0_d_374_135180)"><path fill="#F01515" fill-rule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clip-rule="evenodd" /></g><g filter="url(#filter1_d_374_135180)"><path fill="#FFD521" fill-rule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clip-rule="evenodd" /></g></g><defs><filter id="filter0_d_374_135180" width="19.6" height="4.667" x="0" y="5.167" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" /><feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" /></filter><filter id="filter1_d_374_135180" width="19.6" height="4.667" x="0" y="9.833" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_374_135180" /><feBlend in="SourceGraphic" in2="effect1_dropShadow_374_135180" result="shape" /></filter></defs></svg>
    },
    {
        id: 5,
        name: 'France (+33)',
        shortName: 'FR (+33)',
        icon: <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15"><rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#F5F5F5" stroke-width=".5" rx="1.75" /><mask id="a" style={{ maskType: 'luminance' }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse"><rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#fff" stroke-width=".5" rx="1.75" /></mask><g mask="url(#a)"><path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" /><path fill="#1035BB" fill-rule="evenodd" d="M0 14.5h6.533V.5H0v14z" clip-rule="evenodd" /></g></svg>
    },
    {
        id: 6,
        name: 'Vietnam (+84)',
        shortName: 'VIE (+84)',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-vn" viewBox="0 0 640 480" className="w-4 h-4 me-2">
                <defs>
                    <clipPath id="vn-a">
                        <path fill-opacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
                    </clipPath>
                </defs>
                <g fill-rule="evenodd" clip-path="url(#vn-a)" transform="translate(80)scale(.9375)">
                    <path fill="#da251d" d="M-128 0h768v512h-768z" />
                    <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z" />
                </g>
            </svg>

    },
    {
        id: 7,
        name: 'Japan (+81)',
        shortName: 'JP (+81)',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-jp" viewBox="0 0 640 480" className="w-4 h-4 me-2">
                <defs>
                    <clipPath id="jp-a">
                        <path fill-opacity=".7" d="M-88 32h640v480H-88z" />
                    </clipPath>
                </defs>
                <g fill-rule="evenodd" stroke-width="1pt" clip-path="url(#jp-a)" transform="translate(88 -32)">
                    <path fill="#fff" d="M-128 32h720v480h-720z" />
                    <circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-168.4 8.6)scale(.76554)" />
                </g>
            </svg>
    },
    {
        id: 8,
        name: 'China (+86)',
        shortName: 'CN (+86)',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icons-cn" viewBox="0 0 640 480" className="w-4 h-4 me-2">
                <defs>
                    <path id="cn-a" fill="#ff0" d="M-.6.8 0-1 .6.8-1-.3h2z" />
                </defs>
                <path fill="#ee1c25" d="M0 0h640v480H0z" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(71.9991 0 0 72 120 120)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)" />
            </svg>
    },
    {
        id: 9,
        name: 'Korea (+82)',
        shortName: 'KR (+82)',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icons-kr" viewBox="0 0 640 480" className="w-4 h-4 me-2">
                <defs>
                    <clipPath id="kr-a">
                        <path fill-opacity=".7" d="M-95.8-.4h682.7v512H-95.8z" />
                    </clipPath>
                </defs>
                <g fill-rule="evenodd" clip-path="url(#kr-a)" transform="translate(89.8 .4)scale(.9375)">
                    <path fill="#fff" d="M-95.8-.4H587v512H-95.8Z" />
                    <g transform="rotate(-56.3 361.6 -101.3)scale(10.66667)">
                        <g id="kr-c">
                            <path id="kr-b" fill="#000001" d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z" />
                            <use xlinkHref="#kr-b" width="100%" height="100%" y="44" />
                        </g>
                        <path stroke="#fff" d="M0 17v10" />
                        <path fill="#cd2e3a" d="M0-12a12 12 0 0 1 0 24Z" />
                        <path fill="#0047a0" d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z" />
                        <circle cy="-6" r="6" fill="#cd2e3a" />
                    </g>
                    <g transform="rotate(-123.7 191.2 62.2)scale(10.66667)">
                        <use xlinkHref="#kr-c" width="100%" height="100%" />
                        <path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
                    </g>
                </g>
            </svg>
    },
    {
        id: 10,
        name: 'Taipei (+886)',
        shortName: 'TW (+886)',
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icons-cn" viewBox="0 0 640 480" className="w-4 h-4 me-2">
                <defs>
                    <path id="cn-a" fill="#ff0" d="M-.6.8 0-1 .6.8-1-.3h2z" />
                </defs>
                <path fill="#ee1c25" d="M0 0h640v480H0z" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(71.9991 0 0 72 120 120)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)" />
                <use xlinkHref="#cn-a" width="30" height="20" transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)" />
            </svg>
    },
]

const countriesObject = keyBy(countries, 'name')

const Register = () => {
    const [userInfo, setUserInfo] = useState<any>({ country: 'United States (+1)' })
    const [confirmPass, setConfirmPass] = useState<any>('')
    const [isShowDrop, setIsShowDrop] = useState(false)

    const router = useRouter()

    const register = useCallback(async (request: any) => {
        try {

            await httpClient.post('/auth/register', request)
            toast.success('Đăng ký thành công')
            router.push('/login')
        } catch (error) {
            toast.error('Đăng ký thất baị')
        }
    }, [router])

    const { mutate } = useMutation({ mutationFn: register })

    const handleSetPhone = (phoneNumber: string) => {
        setUserInfo((prev: any) => ({ ...prev, phoneNumber }))
    }

    const handleSetPass = (password: string) => {
        setUserInfo((prev: any) => ({ ...prev, password }))
    }

    const handleSetConfirmPass = (password: string) => {
        setConfirmPass(password)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!userInfo?.phoneNumber || !userInfo?.password) {
            toast.error('Hãy điền tất cả trường required')
            return
        }

        if (userInfo?.password !== confirmPass) {
            toast.error('Mật khâủ không khớp')
            return
        }

        mutate(userInfo)
    }





    const handleSelectPhoneRegion = (country: string) => {
        setUserInfo((prev: any) => ({ ...prev, country }))
        setIsShowDrop(false)
    }

    const selectedCountry = countriesObject[userInfo.country]


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
                                Đăng ký
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <div className="flex items-center relative">
                                        <button onClick={() => setIsShowDrop(prev => !prev)} id="dropdown-phone-button" data-dropdown-toggle="dropdown-phone" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                                            {selectedCountry?.shortName}
                                            <div className='flex mx-1'></div>
                                            {selectedCountry?.icon}
                                        </button>
                                        <div id="dropdown-phone" className={`z-10 absolute top-0 left-0 ${!isShowDrop && 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700`}>
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">

                                                {countries.map(country => (
                                                    <li key={country.id}>
                                                        <button onClick={() => handleSelectPhoneRegion(country.name)} type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                            <div className="inline-flex items-center">
                                                                {country.icon}
                                                                {country.name}
                                                            </div>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <label htmlFor="phoneNumber" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Phone number:</label>
                                        <div className="relative w-full">
                                            <input onChange={(e) => handleSetPhone(e.target.value)} type="text" id="phoneNumber" aria-describedby="helper-text-explanation" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="123-456-7890" required />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input onChange={e => handleSetPass(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                                    <input onChange={e => handleSetConfirmPass(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <button type="submit" className="w-full text-gray-200 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Đã có tài khoản? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập ở đây</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register
