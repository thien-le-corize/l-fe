"use client";
import { useRevalidate } from "@/hooks/useRevalidate";
import React, { useCallback, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { httpClient } from "@/utils/httpClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "@/app/pages/admin/common/SkeletonLoader";
import { RejectModal } from "./RejectModal/RejectModal";
import { toast } from "react-toastify";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import dayjs from "dayjs";
import { CONTRACT_STATUS } from "@/constants/ContractStatus";

export const BankingReqDetail = () => {
  const [o, setO] = useState(false);
  const [otp, setOtp] = useState<number>();
  const [loading, setLoading] = useState(false);

  const revalidate = useRevalidate();

  const jsonAdminId = Cookies.get("adminId");
  const params = useParams();
  const bankingId = params?.bankingId as string;

  const getContractDetail = useCallback(async () => {
    if (!jsonAdminId) {
      return;
    }

    const adminId = JSON.parse(jsonAdminId);

    try {
      const res = await httpClient.get(`/admin/banking-requests/${bankingId}`, {
        adminId,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }, [bankingId, jsonAdminId]);

  const generateOtp = useCallback(async () => {
    if (!jsonAdminId) {
      return;
    }

    const adminId = JSON.parse(jsonAdminId);

    try {
      setLoading(true);
      await httpClient.post("/admin/generate-otp", {
        bankingId,
        adminId,
      });
      revalidate(["admin", "bankings", bankingId]);
    } catch (error) {
      toast.error("Tạo OTP thất bại");
    } finally {
      setLoading(false);
    }
  }, [bankingId, jsonAdminId, revalidate]);

  const {
    data: banking,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["admin", "bankings", bankingId],
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
    <div className="flex flex-col gap-10">
      <RejectModal
        bankingId={bankingId}
        jsonAdminId={jsonAdminId}
        open={o}
        close={() => setO(false)}
      />
      <div className="flex gap-10">
        {banking.status !== "rejected" && (
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

      <div className="flex gap-5 items-center">
        <button
          className="inline-block rounded bg-sky-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          disabled={loading}
          onClick={generateOtp}
        >
          Tạo OTP
        </button>
        <div className="px-3 py-2 bg-slate-200 rounded-sm text-slate-900">
          {banking.otp}
        </div>
      </div>

      <div
        className={`flex mt-10 text-slate-50 italic text-bold ${banking?.status === "notApproved" ? " bg-stone-500" : banking?.status === "approved" ? "bg-sky-500" : "bg-red-400"} rounded-md px-2 py-5 flex-col gap-2`}
      >
        <div>Trạng thái: {CONTRACT_STATUS[banking.status]}</div>
        {!!banking.rejectReason && banking.status === "rejected" && (
          <div>Lý do: {banking.rejectReason}</div>
        )}
      </div>

      <div>
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
                          Tên
                        </th>
                        <th scope="col" className="px-6 py-4">
                          SDT
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Tiền rút
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Ngày tạo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap px-6 py-4">
                          {banking._id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link href={`/admin/user/${banking.userId}`}>
                            {banking.userName}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {banking.phoneNumber}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatCurrency(banking.tienRut)}vnd
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {dayjs(banking.createdAt).format("DD/MM/YYYY H:m:s")}
                        </td>
                      </tr>
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
