"use client";
import { httpClient } from "@/utils/httpClient";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { SkeletonLoader } from "../common/SkeletonLoader";
import Cookie from "js-cookie";
// eslint-disable-next-line no-restricted-imports
import { MyPaginate } from "../Users/Users";
import Image from "next/image";
import Link from "next/link";
import DeleteIcon from "@/assets/delete-icon.svg";
import SeeDetailIcon from "@/assets/see-detail.svg";
import dayjs from "dayjs";
import { formatCurrency } from "@/utils/formatCurrency";

export const Contracts = () => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const jsonAdminId = Cookie.get("adminId");

  const getContractsList = useCallback(
    async (page = 1) => {
      if (!jsonAdminId) {
        return;
      }
      const adminId = await JSON.parse(jsonAdminId);

      try {
        const res = await httpClient.get("/admin/loan-contracts", {
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
    queryFn: () => getContractsList(page),
    placeholderData: keepPreviousData,
    enabled: !!jsonAdminId,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.currentPage <= data?.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["admin", "users-mana", page],
        queryFn: () => getContractsList(page + 1),
      });
    }
  }, [data, getContractsList, isPlaceholderData, page, queryClient]);

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
              Kỳ hạn
            </th>
            <th scope="col" className="px-6 py-3">
              Tổng vay
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
          {data.contracts.map((contract: any) => (
            <tr
              key={contract._id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td
                scope="row"
                className="max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {contract?._id}
              </td>
              <td className="px-6 py-4">{contract?.kyHan}</td>
              <td className="px-6 py-4">
                {formatCurrency(contract?.tongVay)}vnd
              </td>
              <td
                className={`px-6 text-slate-50 py-4 ${contract?.status === "notApproved" ? "bg-red-400" : "bg-sky-300"} `}
              >
                {contract?.status}
              </td>
              <td className="px-6 py-4">
                {!!contract?.createdAt &&
                  dayjs(contract.createdAt).format("DD/MM/YYYY H:m:s")}
              </td>

              <td className="flex gap-2 px-6 py-4">
                <div className="relative right-0">
                  <ul
                    className="py-2 text-sm flex gap-2 text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      {contract._id && (
                        <Link
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          href={`/admin/contracts/${contract._id}`}
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
