import { useParams } from 'next/navigation';
import { FC, useCallback } from 'react';
import Cookie from 'js-cookie'
import { httpClient } from '@/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'

export const UserProfile: FC = () => {
  const params = useParams()
  const userId = params.userId as string
  const adminId = Cookie.get('adminId')

  const getUser = useCallback(async () => {
    if (!adminId) {
      return
    }

    const parsedAdminId = JSON.parse(adminId)

    const res = await httpClient.get(`/admin/user/${userId}`, { adminId: parsedAdminId })
    return res.data
  }, [adminId, userId])


  const { isError, isLoading, data: user } = useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: getUser,
    enabled: !!userId && !!adminId
  })

  if (isLoading) {
    return <>Loading</>
  }

  if (isError) {
    return <>Error</>
  }

  const isVerified = true

  if (user?.role === 'admin') {
    return <>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input disabled={isVerified} required value={user?.username} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div>
        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
        <input disabled={isVerified} required value={user?.role} type="text" name="role" id="day_of_birth" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    </>
  }

  return (
    <form className="flex flex-wrap space-y-4 md:space-y-6" >
      <div className='w-6/12'>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Thông tin cá nhân
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
              <input disabled={isVerified} required value={user?.fullName} type="text" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div>
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</label>
              <select required id="gender" value={user?.gender} className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>


            <div>
              <label htmlFor="cmnd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CMND/CCCD</label>
              <input disabled={isVerified} required value={user?.cmnd} type="text" name="cmnd" id="cmnd" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="day_of_birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày/tháng/năm sinh</label>
              <input disabled={isVerified} required value={user?.day_of_birth} type="text" name="day_of_birth" id="day_of_birth" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
              <input disabled={isVerified} required value={user?.address} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="academic_level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trình độ học vấn</label>
              <input disabled={isVerified} required value={user?.academic_level} type="text" name="academic_level" id="academic_level" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="loan_purpose" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mục đích khoản vay</label>
              <input disabled={isVerified} required value={user?.loan_purpose} type="text" name="loan_purpose" id="loan_purpose" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div>
              <label htmlFor="income" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thu nhập hàng tháng</label>
              <select disabled={isVerified} required id="income" value={user?.income} className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Chọn thu nhập</option>
                <option value="Dưới 5 triệu">Dưới 5 triệu</option>
                <option value="Từ 5 đến 10 triệu">Từ 5 đến 10 triệu</option>
                <option value="Từ 10 đến 20 triệu">Từ 10 đến 20 triệu</option>
                <option value="Trên 20 triệu">Trên 20 triệu</option>
              </select>
            </div>

            <div>
              <label htmlFor="maritalStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tình trạng hôn nhân</label>
              <select required id="maritalStatus" value={user?.maritalStatus} className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Chọn tình trạng quan hệ</option>
                <option value="single">Độc thân</option>
                <option value="married">Đã kết hôn</option>
                <option value="divorced">Ly hôn</option>
              </select>
            </div>

            <div>
              <label htmlFor="career" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nghề nghiệp</label>
              <input disabled={isVerified} required value={user?.career} type="text" name="career" id="career" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

          </div>
        </div>
      </div>

      <div className='w-6/12'>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Thông tin ngân hàng thụ hưởng
          </h1>


          <div className='flex'>
            <div className="flex flex-1 items-center ps-4">
              <input disabled={isVerified} id="bordered-radio-1" defaultChecked={user?.bankType === 'domestic'} type="radio" value="0" checked={user?.bankType === 'domestic'} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700" />
              <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ngân hàng trong nước</label>
            </div>
            <div className="flex flex-1 items-center ps-4">
              <input disabled={isVerified} id="bordered-radio-2" defaultChecked={user?.bankType === 'international'} type="radio" value="1" checked={user?.bankType === 'international'} name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700" />
              <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ngân hàng quốc tế</label>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="bank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngân hàng thụ hưởng</label>
              <input disabled={isVerified} required value={user?.bank} type="text" name="bank" id="bank" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            </div>

            <div>
              <label htmlFor="bank_credit_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số tài khoản</label>
              <input disabled={isVerified} required value={user?.bank_credit_id} type="text" name="bank_credit_id" id="bank_credit_id" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div>
              <label htmlFor="bank_credit_owner" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chủ tài khoản</label>
              <input disabled={isVerified} required value={user?.bank_credit_owner} type="text" name="bank_credit_owner" id="bank_credit_owner" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>


        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Ảnh dịnh danh
          </h1>

          <div className="space-y-4 md:space-y-6">
            <div>

              {user?.cmnd_front && <Image src={user.cmnd_front} alt='' width={400} height={200} objectFit='contain' />}

            </div>

            <div>



              {user?.cmnd_behide && <Image src={user.cmnd_behide} alt='' width={400} height={200} objectFit='contain' />}

            </div>

            <div>



              {user?.face_image && <Image src={user.face_image} alt='' width={400} height={200} objectFit='contain' />}
            </div>
          </div>
        </div>
      </div>



    </form>
  )

};
