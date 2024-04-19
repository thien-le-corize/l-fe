"use client";
import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { SkeletonLoader } from "@/app/pages/admin/common/SkeletonLoader";
import Cookie from "js-cookie";
import { formatCurrency } from "@/utils/formatCurrency";
import dayjs from "dayjs";
import { CONTRACT_STATUS } from "@/constants/ContractStatus";

export const ContractDetail = () => {
  const jsonUser = Cookie.get("user");
  const params = useParams();
  const contractId = params?.contractId as string;

  const getContractDetail = useCallback(async () => {
    if (!jsonUser) {
      return;
    }
    const user = JSON.parse(jsonUser);

    try {
      const res = await httpClient.get(`/loan-contract/${contractId}`, {
        userId: user._id,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }, [contractId, jsonUser]);

  const {
    data: contract,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["contract", contractId],
    queryFn: getContractDetail,
    enabled: !!jsonUser,
  });

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div className="px-20 mb-20">
      <div className="text-3xl p-10">Chi tiết hợp đồng</div>

      <div className="flex items-center gap-1 mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={`-mt-px ${contract.status === "notApproved" ? "text-neutral-600" : contract.status === "approved" ? "text-green-300" : "text-red-400"} h-4 w-4"`}
        >
          <path
            fillRule="evenodd"
            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p
          className={`block ${contract.status === "notApproved" ? "text-neutral-600" : contract.status === "approved" ? "text-green-300" : "text-red-400"}  font-sans text-xl underline font-normal text-gray-700 antialiased`}
        >
          {CONTRACT_STATUS[contract.status]}
        </p>
      </div>

      <div className="flex gap-5">
        <div className="relative overflow-hidden basis-6/12">
          <table className="flex bg-slate-200 rounded-xl text-left rtl:text-right text-base text-gray-700 uppercase">
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="px-6 w-40 py-4 font-medium break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ID
                </th>
                <td className="px-6 w-60 py-4 break-words">{contract._id}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kỳ hạn
                </th>
                <td className="px-6 py-4 w-60">{contract.kyHan}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Lãi suất
                </th>
                <td className="px-6 py-4 w-60">{contract.laiSuat}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Tổng vay
                </th>
                <td className="px-6 py-4 w-60">
                  {formatCurrency(contract.tongVay)}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Tổng số tiền phải thanh toán
                </th>
                <td className="px-6 py-4 w-60">
                  {formatCurrency(contract.tongTienSauLai)}vnd
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Trạng thái
                </th>
                <td className="px-6 py-4 w-60">{contract.status}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ngày tạo
                </th>
                <td className="px-6 py-4 w-60">
                  {dayjs(contract.createdAt).format("DD / MM / YYYY")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="relative overflow-hidden basis-6/12">
          <table className="w-full text-left rtl:text-right text-base text-gray-700 uppercase  bg-slate-200 rounded-xl">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Kỳ
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tiền cần thanh toán
                </th>

                {contract.status !== "notApproved" && (
                  <>
                    <th scope="col" className="px-6 py-3">
                      Ngày đến hạn
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Ngày thanh toán
                    </th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {contract.loanPayments.map((loanPay: any) => (
                <tr key={loanPay.id}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium w-40 break-all text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Kỳ {loanPay.ky}
                  </td>
                  <td className="px-6 py-4 w-60">
                    {formatCurrency(loanPay.soTienPhaiTra)}vnd
                  </td>

                  {contract.status !== "notApproved" && (
                    <>
                      <td className="px-6 py-4 w-60">{contract.ngayDuyet}</td>

                      <td className="px-6 py-4 w-60">
                        {loanPay.status === "paid"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </td>
                      <td className="px-6 py-4 w-60">{loanPay.updatedAt}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
