"use client";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { httpClient } from "@/utils/httpClient";
import { SkeletonLoader } from "@/app/pages/admin/common/SkeletonLoader";
import { MyPaginate } from "@/app/pages/admin/Users/Users";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import dayjs from "dayjs";
import DeleteIcon from "@/assets/delete-icon.svg";
import SeeDetailIcon from "@/assets/see-detail.svg";
import { CONTRACT_STATUS } from "@/constants/ContractStatus";

export const BankingReqs = () => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const jsonAdminId = Cookies.get("adminId");

  const getBankingList = useCallback(
    async (page = 1) => {
      if (!jsonAdminId) {
        return;
      }
      const adminId = await JSON.parse(jsonAdminId);

      try {
        const res = await httpClient.get("/admin/banking-requests", {
          adminId,
          page,
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [jsonAdminId]
  );

  const { isError, isLoading, data, isPlaceholderData } = useQuery({
    queryKey: ["admin", "contracts", page],
    queryFn: () => getBankingList(page),
    placeholderData: keepPreviousData,
    enabled: !!jsonAdminId,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.currentPage <= data?.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["admin", "users-mana", page],
        queryFn: () => getBankingList(page + 1),
      });
    }
  }, [data, getBankingList, isPlaceholderData, page, queryClient]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      const current = selected + 1;

      if (current > data.totalPages || current < 1) {
        return;
      }

      setPage(current);
    },
    [data]
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <div>
      <table className="relative w-full text-left text-sm text-gray-500 shadow-md dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              SDT
            </th>
            <th scope="col" className="px-6 py-3">
              Tiền rút
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data.bankings?.map((banking: any) => (
            <tr
              key={banking._id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td
                scope="row"
                className="max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {banking?._id}
              </td>
              <td className="px-6 py-4">{banking?.userName}</td>
              <td className="px-6 py-4">{banking?.phoneNumber}</td>
              <td className="px-6 py-4">
                {formatCurrency(banking?.tienRut)}vnd
              </td>
              <td
                className={`px-6 text-slate-50 py-4 ${banking?.status === "notApproved" ? " bg-stone-500" : banking?.status === "approved" ? "bg-sky-500" : "bg-red-400"} `}
              >
                {CONTRACT_STATUS[banking.status]}
              </td>
              <td className="px-6 py-4">
                {!!banking?.createdAt &&
                  dayjs(banking.createdAt).format("DD/MM/YYYY H:m:s")}
              </td>

              <td className="flex gap-2 px-6 py-4">
                <div className="relative right-0">
                  <ul
                    className="py-2 text-sm flex gap-2 text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      {banking._id && (
                        <Link
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          href={`/admin/banking-reqs/${banking._id}`}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={SeeDetailIcon}
                            alt=""
                          />
                        </Link>
                      )}
                    </li>
                    <li>
                      <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <Image width={24} height={24} src={DeleteIcon} alt="" />
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data && (
        <MyPaginate
          nextLabel="next >"
          onPageChange={handleChangePage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data.totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};
