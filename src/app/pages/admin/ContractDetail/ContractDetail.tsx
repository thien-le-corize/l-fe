"use client";
import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { SkeletonLoader } from "@/app/pages/admin/common/SkeletonLoader";
import { formatCurrency } from "@/utils/formatCurrency";
import dayjs from "dayjs";
import Link from "next/link";
import { toast } from "react-toastify";
import { RejectModal } from "./RejectModal/RejectModal";
import { useRevalidate } from "@/hooks/useRevalidate";

export const ContractDetail = () => {
  const [o, setO] = useState(false);

  const revalidate = useRevalidate();

  const jsonAdminId = Cookie.get("adminId");
  const params = useParams();
  const contractId = params?.contractId as string;

  const getContractDetail = useCallback(async () => {
    if (!jsonAdminId) {
      return;
    }

    const adminId = JSON.parse(jsonAdminId);

    try {
      const res = await httpClient.get(`/admin/loan-contract/${contractId}`, {
        adminId,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }, [contractId, jsonAdminId]);

  const handleApprove = useCallback(async () => {
    if (!jsonAdminId) {
      return;
    }
    const adminId = JSON.parse(jsonAdminId);
    try {
      await httpClient.put(`/admin/loan-contract/${contractId}`, {
        status: "approved",
        adminId,
      });
      revalidate(["admin", "contract", contractId]);
      toast.success("Duyệt thành công");
    } catch (error) {
      toast.error("Duyệt thất bại");
    }
  }, [contractId, jsonAdminId, revalidate]);

  const handleTickPaid = useCallback(
    async (kyHanId: number) => {
      if (!jsonAdminId) {
        return;
      }

      const adminId = JSON.parse(jsonAdminId);

      try {
        await httpClient.put(
          `/admin/loan-contract/${contractId}/tick-paid-ky-han/${kyHanId}`,
          {
            adminId,
          }
        );

        revalidate(["admin", "contract", contractId]);
      } catch (error) {
        toast.error("Tick thất bại");
      }
    },
    [contractId, jsonAdminId, revalidate]
  );

  const {
    data: contract,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["admin", "contract", contractId],
    queryFn: getContractDetail,
    enabled: !!jsonAdminId,
  });

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div>
      <RejectModal
        contractId={contractId}
        jsonAdminId={jsonAdminId}
        open={o}
        close={() => setO(false)}
      />

      <div className="flex gap-10">
        {contract.status !== "approved" && (
          <div>
            <button
              type="button"
              onClick={handleApprove}
              className="inline-block rounded bg-cyan-900 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            >
              Duyệt
            </button>
          </div>
        )}
        {contract.status !== "rejected" && (
          <div>
            <button
              type="button"
              onClick={() => setO(true)}
              className="inline-block rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            >
              Từ chối
            </button>
          </div>
        )}
      </div>

      <div
        className={`flex mt-10 text-slate-50 italic text-bold ${contract?.status === "notApproved" ? " bg-stone-500" : contract?.status === "approved" ? "bg-sky-500" : "bg-red-400"} rounded-md px-2 py-5 flex-col gap-2`}
      >
        <div>Trạng thái: {contract.status}</div>
        {!!contract.rejectReason && contract.status === "rejected" && (
          <div>Lý do: {contract.rejectReason}</div>
        )}
      </div>

      <div className="divide-y flex flex-col gap-10">
        <div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-4">
                          UserId
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Kỳ hạn
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Lãi suất
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tổng vay
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tổng tiền sau lãi
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Ngày tạo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">
                          {contract._id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link href={`/admin/user/${contract.userId}`}>
                            {contract.userId}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contract.kyHan}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contract.laiSuat * 100}%
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatCurrency(contract.tongVay)}vnd
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatCurrency(contract.tongTienSauLai)}vnd
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {dayjs(contract.createdAt).format("DD/MM/YYYY H:m:s")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Kỳ
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Số tiền phải trả
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Ngày thanh toán
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Hạn thanh toán
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contract.loanPayments.map((loanPay: any) => (
                        <tr
                          key={loanPay.id}
                          className="border-b border-neutral-200 dark:border-white/10"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {loanPay.ky}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {formatCurrency(loanPay.soTienPhaiTra)}vnd
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <input
                              id={`default-checkbox-${loanPay.id}`}
                              type="checkbox"
                              checked={!!loanPay.paid}
                              onChange={() => handleTickPaid(loanPay.id)}
                              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`default-checkbox-${loanPay.id}`}
                              className="ms-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {!loanPay.paid
                                ? "Chưa thanh toán"
                                : "Đã thanh toán"}
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {loanPay.paidDate &&
                              dayjs(loanPay.paidDate).format(
                                "DD/MM/YYYY H:m:s"
                              )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {loanPay.paidDeadline &&
                              dayjs(loanPay.paidDeadline).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
