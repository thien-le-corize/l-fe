'use client';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import DeleteIcon from '@/assets/delete-icon.svg'
import Image from 'next/image'
import { Modal } from './modal/Modal'
import { httpClient } from '@/utils/httpClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { toast } from 'react-toastify';
import { useRevalidate } from '@/hooks/useRevalidate';
import { debounce } from 'lodash';

export const SettingsBankCard = () => {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)

  const [cards,setCards] = useState<any[]>([])

  const queryClient = useQueryClient();
  // queryClient.getQueryData(key)

  const revalidate = useRevalidate()

  const handleGetCards = useCallback(async (page: number) => {
    try {
      const res = await httpClient.get('/admin/settings/cards', { page })
      setCards(prev => ([...prev, ...res.data.cards]))
      return res.data
    } catch (error) {
      throw error
    }
  }, [])

  const handleDeleteCard = useCallback(async (cardId: string) => {
    try {
      await httpClient.delete(`/admin/settings/card/${cardId}`)
      revalidate(['cards'])
      toast.success('Xoá thành công')
    } catch (error) {
      toast.error('Xoá thất bại')
      throw error
    }
  }, [revalidate])

  
  const { isPending: isGetCardPending, isError, data } = useQuery({
    queryKey: ['cards', page], queryFn: () => handleGetCards(page)
  })

  const { mutate } = useMutation({ mutationFn: handleDeleteCard })

      const handleSetPage = useCallback(() => {
    if (page >= data.totalPages) {
      return
    } 
    setPage(prev => prev + 1)
  },[data?.totalPages, page])

console.log(page)

  const measureRef = (node: HTMLTableRowElement) => {
     const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          debounce(() => handleSetPage(), 200)()
        }
      });
    });

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }


  if (isGetCardPending) {
    return <SkeletonLoader />
  }

  if (isError) {
    return <>Error</>
  }


  return (
    <div>
      {open && <Modal onClose={() => setOpen(false)} onSubmit={setCards} />}
      <button onClick={() => setOpen(true)} type="button" className="text-white mb-5 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Thêm thẻ mới</button>
      <table className='relative w-full text-left text-sm text-gray-500 shadow-md dark:text-gray-400 rtl:text-right'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              STT
            </th>
            <th scope='col' className='px-6 py-3'>
              Ảnh
            </th>
            <th scope='col' className='px-6 py-3'>
              Tên
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>

        {!cards.length && <div className='flex p-20 justify-center items-center'>Trống</div>}

        <tbody>

          {cards.map((card: any, index: number) => {
            return(
            <tr key={card._id} ref={index === (cards.length - 1) ? measureRef : null} className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
              <td
                scope='row'
                className='max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white'
              >
                {index + 1}
              </td>
              <td className='px-6 py-4'>
                <Image src={card.image} width={200} height={200} alt={''} />
              </td>
              <td className='px-6 py-4'>
                {card.name}
              </td>
              <td className='px-6 py-4'>
                <button
                  className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => mutate(card._id)}
                >
                  <Image width={24} height={24} src={DeleteIcon} alt='' />
                </button>
              </td>
            </tr>
          )})}



        </tbody>
      </table></div>
  )
}
