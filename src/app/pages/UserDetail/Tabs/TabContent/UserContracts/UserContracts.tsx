import { SkeletonLoader } from "@/app/pages/admin/common/SkeletonLoader";
import { formatCurrency } from "@/utils/formatCurrency";
import { httpClient } from "@/utils/httpClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback } from "react";
import Cookie from "js-cookie";
import { CONTRACT_STATUS } from "@/constants/ContractStatus";

export const UserContracts = () => {
  const jsonUser = Cookie.get("user");

  const handleGet = useCallback(async () => {
    if (!jsonUser) {
      return;
    }

    try {
      const user = JSON.parse(jsonUser);
      const res = await httpClient.get("/loan-contracts", {
        userId: user._id,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }, [jsonUser]);

  const {
    isError,
    isLoading,
    data: contracts,
  } = useQuery({ queryKey: ["contracts"], queryFn: handleGet });

  if (isError) {
    return <>Error</>;
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="-mx-4 min-h-96 flex flex-wrap justify-start px-10">
      {contracts.map((contract: any) => (
        <div
          key={contract.id}
          className="mb-4 w-full px-2 md:w-2/3 lg:w-1/2 xl:w-1/4"
        >
          <div className="border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 relative whitespace-normal break-words rounded-lg border bg-white p-4 font-sans text-sm font-normal shadow-lg focus:outline-none">
            <div className="mb-2 flex items-center gap-3">
              <Link
                href={`/contracts/${contract._id}`}
                className="text-blue-gray-900 block font-sans text-base font-medium leading-relaxed tracking-normal text-gray-900 antialiased transition-colors hover:text-pink-500"
              >
                {formatCurrency(contract.tongVay)}vnd
              </Link>
            </div>
            <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
              {contract.userId}
            </p>
            <div className="mt-4 flex items-center gap-5">
              <div className="flex items-center gap-1">
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
                <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                  {CONTRACT_STATUS[contract.status]}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
