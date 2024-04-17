"use client";
import { httpClient } from "@/utils/httpClient";
import React, { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { userAtom } from "../layout/layoutCom";
import { useAtom } from "jotai";
import Cookie from "js-cookie";
import { debounce, first, omit } from "lodash";
import { useUploadImage } from "@/hooks/useUploadImage.hooks";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const UserDetail = () => {
  const [user, setUser] = useAtom(userAtom);

  const [formData, setFormData] = useState<any>({ bankType: "Domestic" });
  const [currentTab, setCurrentTab] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const isVerified = user?.status === "verified";
  const isShowToast = searchParams.get("verify");

  const updateUser = useCallback(
    async (request: any) => {
      if (!user) {
        return;
      }

      try {
        const res = await httpClient.put(`/auth/${user._id}`, request);
        setUser(res.user);
        toast.success("Xác minh danh tính thành công");
        Cookie.set("user", JSON.stringify(res.user));
        if (isShowToast) {
          router.push("/loan-register");
        }
      } catch (error) {
        throw error;
      }
    },
    [isShowToast, router, setUser, user]
  );

  const handleData = useCallback((fieldData: object) => {
    setFormData((prev: any) => ({ ...prev, ...fieldData }));
  }, []);

  const { handleUploadImage, isUploadPending } = useUploadImage();

  const handleFormImage = async (formFieldName: string, file?: File) => {
    if (!file) {
      return;
    }

    const url = await handleUploadImage(file);

    debounce(() => {
      setFormData((prev: any) => ({ ...prev, [formFieldName]: url }));
    }, 2000)();
  };

  const handleResetBankData = useCallback(() => {
    setFormData((prev: any) => {
      const newFormData = { ...prev };
      const resetData = omit(newFormData, [
        "bank",
        "bank_credit_id",
        "bank_credit_owner",
      ]);
      return resetData;
    });
  }, []);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (
        !formData?.gender ||
        !formData?.income ||
        !formData?.maritalStatus ||
        !formData?.bank ||
        !formData?.cmnd_front ||
        !formData?.cmnd_behide ||
        !formData?.face_image
      ) {
        toast.error("Hãy nhập tất cả các trường");
        return;
      }

      updateUser(formData);
    },
    [formData, updateUser]
  );

  useEffect(() => {
    if (isShowToast) {
      toast.error("Hệ thống cần xác minh danh tính của bạn");
    }
  }, [isShowToast]);

  const getCards = useCallback(async () => {
    try {
      const res = await httpClient.get("/admin/settings/cards");
      return res.data.cards;
    } catch (error) {
      throw error;
    }
  }, []);

  const { data: cards } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  return (
    <>
      <form
        className="flex flex-wrap space-y-4 md:space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="w-6/12">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Thông tin cá nhân
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Họ và tên
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) => handleData({ fullName: e.target.value })}
                  value={user?.fullName}
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giới tính
                </label>
                <select
                  required
                  id="gender"
                  value={user?.gender}
                  onChange={(e) => handleData({ gender: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cmnd"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CMND/CCCD
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) => handleData({ cmnd: e.target.value })}
                  value={user?.cmnd}
                  type="text"
                  name="cmnd"
                  id="cmnd"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="day_of_birth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ngày/tháng/năm sinh
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) => handleData({ day_of_birth: e.target.value })}
                  value={user?.day_of_birth}
                  type="text"
                  name="day_of_birth"
                  id="day_of_birth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa chỉ
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) => handleData({ address: e.target.value })}
                  value={user?.address}
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="academic_level"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Trình độ học vấn
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) =>
                    handleData({ academic_level: e.target.value })
                  }
                  value={user?.academic_level}
                  type="text"
                  name="academic_level"
                  id="academic_level"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="loan_purpose"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mục đích khoản vay
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) => handleData({ loan_purpose: e.target.value })}
                  value={user?.loan_purpose}
                  type="text"
                  name="loan_purpose"
                  id="loan_purpose"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="income"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Thu nhập hàng tháng
                </label>
                <select
                  disabled={isVerified}
                  required
                  id="income"
                  onChange={(e) => handleData({ income: e.target.value })}
                  value={user?.income}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Chọn thu nhập</option>
                  <option value="bellow_5">Dưới 5 triệu</option>
                  <option value="5_10">Từ 5 đến 10 triệu</option>
                  <option value="10_20">Từ 10 đến 20 triệu</option>
                  <option value="20_up">Trên 20 triệu</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tình trạng hôn nhân
                </label>
                <select
                  required
                  id="maritalStatus"
                  onChange={(e) =>
                    handleData({ maritalStatus: e.target.value })
                  }
                  value={user?.maritalStatus}
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Chọn tình trạng quan hệ</option>
                  <option value="single">Độc thân</option>
                  <option value="married">Đã kết hôn</option>
                  <option value="divorced">Ly hôn</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="career"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nghề nghiệp
                </label>
                <input
                  disabled={isVerified}
                  required
                  onChange={(e) => handleData({ career: e.target.value })}
                  value={user?.career}
                  type="text"
                  name="career"
                  id="career"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-6/12">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Thông tin ngân hàng thụ hưởng
            </h1>

            <div className="flex">
              <div className="flex flex-1 items-center ps-4">
                <input
                  disabled={isVerified}
                  id="bordered-radio-1"
                  defaultChecked={user?.bankType === "domestic"}
                  onClick={() => {
                    handleData({ bankType: "domestic" });
                    handleResetBankData();
                    setCurrentTab(0);
                  }}
                  type="radio"
                  value="0"
                  checked={currentTab === 0}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Ngân hàng trong nước
                </label>
              </div>
              <div className="flex flex-1 items-center ps-4">
                <input
                  disabled={isVerified}
                  id="bordered-radio-2"
                  defaultChecked={user?.bankType === "international"}
                  onClick={() => {
                    handleData({ bankType: "international" });
                    handleResetBankData();
                    setCurrentTab(1);
                  }}
                  type="radio"
                  value="1"
                  checked={currentTab === 1}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Ngân hàng quốc tế
                </label>
              </div>
            </div>

            {currentTab === 0 ? (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="bank"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ngân hàng thụ hưởng
                  </label>
                  <select
                    required
                    id="bank"
                    onChange={(e) => handleData({ bank: e.target.value })}
                    value={user?.bank}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Chọn ngân hàng thụ hưởng</option>
                    {cards?.map((card: any) => (
                      <option key={card.id} value={card.name}>
                        {card.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="bank_credit_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số tài khoản
                  </label>
                  <input
                    disabled={isVerified}
                    required
                    onChange={(e) =>
                      handleData({ bank_credit_id: e.target.value })
                    }
                    value={user?.bank_credit_id}
                    type="text"
                    name="bank_credit_id"
                    id="bank_credit_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bank_credit_owner"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên chủ tài khoản
                  </label>
                  <input
                    disabled={isVerified}
                    required
                    onChange={(e) =>
                      handleData({ bank_credit_owner: e.target.value })
                    }
                    value={user?.bank_credit_owner}
                    type="text"
                    name="bank_credit_owner"
                    id="bank_credit_owner"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="bank"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ngân hàng thụ hưởng
                  </label>
                  <input
                    disabled={isVerified}
                    required
                    onChange={(e) => handleData({ bank: e.target.value })}
                    value={user?.bank}
                    type="text"
                    name="bank"
                    id="bank"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bank_credit_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số tài khoản
                  </label>
                  <input
                    disabled={isVerified}
                    required
                    onChange={(e) =>
                      handleData({ bank_credit_id: e.target.value })
                    }
                    value={user?.bank_credit_id}
                    type="text"
                    name="bank_credit_id"
                    id="bank_credit_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bank_credit_owner"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên chủ tài khoản
                  </label>
                  <input
                    disabled={isVerified}
                    required
                    onChange={(e) =>
                      handleData({ bank_credit_owner: e.target.value })
                    }
                    value={user?.bank_credit_owner}
                    type="text"
                    name="bank_credit_owner"
                    id="bank_credit_owner"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ảnh dịnh danh
            </h1>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                  htmlFor="cmnd_front"
                >
                  Mặt trước CMND/CCCD
                </label>
                <input
                  onChange={(e) =>
                    handleFormImage("cmnd_front", first(e.target.files))
                  }
                  disabled={isUploadPending || isVerified}
                  id="cmnd_front"
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                  type="file"
                />
                {(!!formData?.cmnd_front || !!user?.cmnd_front) && (
                  <Image
                    src={user.cmnd_front || formData.cmnd_front}
                    alt=""
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                )}
              </div>

              <div>
                <label
                  className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                  htmlFor="cmnd_behide"
                >
                  Mặt sau CMND/CCCD
                </label>
                <input
                  onChange={(e) =>
                    handleFormImage("cmnd_behide", first(e.target.files))
                  }
                  disabled={isUploadPending || isVerified}
                  id="cmnd_behide"
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                  type="file"
                />
                {(!!formData?.cmnd_behide || !!user?.cmnd_behide) && (
                  <Image
                    src={user.cmnd_behide || formData.cmnd_behide}
                    alt=""
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                )}
              </div>

              <div>
                <label
                  className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                  htmlFor="face_image"
                >
                  Ảnh chân dung
                </label>
                <input
                  onChange={(e) =>
                    handleFormImage("face_image", first(e.target.files))
                  }
                  disabled={isUploadPending || isVerified}
                  id="face_image"
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                  type="file"
                />
                {(!!formData?.face_image || !!user?.face_image) && (
                  <Image
                    src={user.face_image || formData.face_image}
                    alt=""
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {!isVerified && (
          <div className="fixed py-4 bottom-0 left-0 w-full bg-white drop-shadow-2xl	filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));">
            <div className="flex w-full items-end justify-end pr-10">
              <button
                disabled={isUploadPending}
                type="submit"
                className="bg-blue-700 disabled:opacity-75 hover:bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Xác minh danh tính
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};
