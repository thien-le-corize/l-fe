"use client";
import { httpClient } from "@/utils/httpClient";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import React, { FC, useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { styled } from "styled-components";
import DeleteIcon from "@/assets/delete-icon.svg";
import SeeDetailIcon from "@/assets/see-detail.svg";
import Image from "next/image";

type Props = { adminId: string };

export const Users: FC<Props> = ({ adminId }) => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const getUserList = useCallback(
    async (page = 1) => {
      const res = await httpClient.get("/admin/users", { page, adminId });
      return res.data;
    },
    [adminId]
  );

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["admin", "users-mana", page],
    queryFn: () => getUserList(page),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.currentPage <= data?.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["admin", "users-mana", page],
        queryFn: () => getUserList(),
      });
    }
  }, [data, getUserList, isPlaceholderData, page, queryClient]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      const current = selected + 1;
      //   console.log(current);
      if (current > data.totalPages || current < 1) {
        return;
      }

      setPage(current);
    },
    [data]
  );

  if (isLoading) {
    return <>Loading</>;
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
              SDT
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Tên đầy đủ
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
          {data.users.map((user: any) => (
            <tr
              key={user._id}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td
                scope="row"
                className="max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {user?.phoneNumber}
              </td>
              <td className="px-6 py-4">
                {user?.role === "admin" ? "Admin" : "User"}
              </td>
              <td className="px-6 py-4">{user?.fullName}</td>
              <td className="px-6 py-4">
                {user?.status === "verified" ? "Verified" : "Unverified"}
              </td>
              <td className="px-6 py-4">
                {!!user?.createdAt &&
                  dayjs(user.createdAt).format("DD/MM/YYYY")}
              </td>

              <td className="flex gap-2 px-6 py-4">
                <div className="relative right-0">
                  <ul
                    className="py-2 text-sm flex gap-2 text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      <Link
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        href={`/admin/user/${user._id}`}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={SeeDetailIcon}
                          alt=""
                        />
                      </Link>
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

export const MyPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
})`
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
