"use client";
import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { SkeletonLoader } from "../admin/common/SkeletonLoader";
import Cookie from "js-cookie";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";

export const ContractList = () => {
  const jsonUser = Cookie.get("user");

  const getContractList = useCallback(async () => {
    try {
      if (!jsonUser) {
        return;
      }
      const user = JSON.parse(jsonUser);
      const res = await httpClient.get("/loan-contracts", { userId: user._id });
      return res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const {
    isLoading,
    isError,
    data: contracts,
  } = useQuery({ queryKey: ["contracts"], queryFn: getContractList });

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div>
      <div className="text-3xl p-10">Hợp đồng của bạn</div>
      <div className="mb-4 w-full px-2  flex-wrap mx-4 flex gap-10">
        {contracts.map((contract: any) => (
          <div key={contract._id}>
            <div className="border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 relative whitespace-normal break-words rounded-lg border bg-white p-4 font-sans text-sm font-normal shadow-lg focus:outline-none">
              <div className="mb-2 flex items-center gap-3">
                <Link
                  href={`/contracts/${contract._id}`}
                  className="text-blue-gray-900 block font-sans text-base font-medium leading-relaxed tracking-normal text-gray-900 antialiased transition-colors hover:text-pink-500"
                >
                  {formatCurrency(contract.tongVay)}vnd
                </Link>
              </div>

              <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-blue-400"></span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`-mt-px ${contract.status !== "notApproved" ? "text-green-300" : "text-red-400"} h-4 w-4"`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    {contract.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
