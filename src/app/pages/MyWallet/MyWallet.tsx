"use client";
import React, { useCallback, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/app/pages/admin/common/Loader";
import { BankingReqModal } from "./BankingReqModal/BankingReqModal";
import BankLinks from "./assets/bank-links.jpeg";
import { CONTRACT_STATUS } from "@/constants/ContractStatus";
import { toast } from "react-toastify";

export const MyWallet = () => {
  const [o, setO] = useState(false);
  const [otp, setOtp] = useState<number>();

  const jsonUser = Cookies.get("user");
  const user = JSON.parse(jsonUser ?? "{}");

  const checkOTP = useCallback(async () => {
    const userId = user._id;
    if (!userId) {
      return;
    }

    try {
      const res = await httpClient.post("/check-otp", { userId, otp });
    } catch (error) {
      toast.error("Gửi OTP thất bại");
    }
  }, [otp, user?._id]);

  const getBanking = useCallback(async () => {
    const userId = user._id;
    if (!userId) {
      return;
    }

    try {
      const res = await httpClient.get("/banking", { userId });
      return res.data;
    } catch (error) {
      toast.error("Lấy thông tin rút tiền thất bại");
      throw error;
    }
  }, [user?._id]);

  const getMe = useCallback(async () => {
    const userId = user._id;
    if (!userId) {
      return;
    }

    try {
      const res = await httpClient.get("/auth/me", { userId });
      Cookies.set("user", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      throw error;
    }
  }, [user?._id]);

  const { data: banking } = useQuery({
    queryKey: ["banking"],
    queryFn: getBanking,
  });

  const {
    isLoading,
    isError,
    data: me,
  } = useQuery({ queryKey: ["me"], queryFn: getMe });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div className="flex my-10 flex-col mx-auto w-fit gap-20">
      <div className="flex w-fit gap-10 items-center">
        <BankingReqModal o={o} cl={() => setO(false)} />
        <div className="flex relative">
          <Image
            width={400}
            height={300}
            objectFit="contain"
            src={me.bankImage}
            unoptimized
            priority
            alt={""}
          />
          <span
            style={{ bottom: "15%", left: 30 }}
            className="absolute flex flex-col text-2xl text-zinc-50 font-semibold tracking-wider"
          >
            <span>
              {me.bank_credit_id.slice(0, 4)}
              <span> </span> **** **** ****
            </span>
            <span>******</span>
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex text-xl bg-slate-200 w-fit px-10 py-5">
            <span>Số dư khả dụng:</span>
            <span className="font-semibold pl-2">
              {formatCurrency(me?.soDuKhaDung ?? 0)}vnd
            </span>
          </div>

          <div>
            <button
              onClick={() => setO(true)}
              className="flex bg-sky-700 w-full px-3 py-5 gap-3 rounded-xl"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="download"
                className="w-5 h-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                ></path>
              </svg>
              <div className="text-white">Rút tiền về tài khoản liên kết</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {!!banking && (
          <div className="flex bg-gray-100 rounded-xl px-5 py-8 justify-center flex-col items-center gap-10">
            <div className="font-semibold text-2xl">Chi tiết giải ngân</div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Số tiền rút
                  </th>
                  <td className="px-6 py-4">{banking.tienRut}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Trạng thái
                  </th>
                  <td className="px-6 py-4">
                    {CONTRACT_STATUS[banking.status]}
                  </td>
                </tr>
                {banking.status === "notApproved" && (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Nhập OTP
                    </th>
                    <td className="flex justify-between px-6 py-4">
                      <div className="w-9/12">
                        <input
                          type="text"
                          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="NHẬP OTP"
                          maxLength={4}
                          onChange={(e) =>
                            Number(e.target.value) &&
                            setOtp(Number(e.target.value))
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-white ease-out w-2/12 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Gửi
                      </button>
                    </td>
                  </tr>
                )}
                {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Trạng thái
                  </th>
                  <td className="px-6 py-4">Laptop PC</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        )}

        <div className="w-full flex justify-center">
          <Image
            src={BankLinks.src}
            width={600}
            unoptimized
            priority
            height={300}
            objectFit="contain"
            alt={""}
          />
        </div>
      </div>
    </div>
  );
};
