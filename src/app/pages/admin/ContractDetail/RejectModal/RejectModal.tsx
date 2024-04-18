import { useRevalidate } from "@/hooks/useRevalidate";
import { httpClient } from "@/utils/httpClient";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Modal from "styled-react-modal";

const rejectReasons = [
  { id: 1, text: "Thông tin khách hàng không trùng khớp ! rút tiền thất bại" },
  {
    id: 2,
    text: "Quý khách đã vi phạm hợp đồng vay ! khoản vay tạm thời bị đóng băng",
  },
  { id: 3, text: "Rút tiền sai phạm hợp đồng vay" },
  {
    id: 4,
    text: "Tài khoản ngân hàng dính lưu đến cờ bạn trên mạng. Rút tiền thất bại!",
  },
  { id: 5, text: "Điểm tín dụng không đủ ! rút tiền thất bại" },
  { id: 6, text: "Hồ sơ bất cập" },
  { id: 7, text: "Đóng băng khoản vay" },
  { id: 8, text: "Cấp mã OTP thất bại!" },
  {
    id: 9,
    text: "Vì thông tin bạn điền không chính xác, vui lòng liên hệ cskh",
  },
  { id: 10, text: "Đóng băng khoản vay" },
  { id: 11, text: "Lý do khác" },
];

export const RejectModal = ({ contractId, open, close, jsonAdminId }: any) => {
  const [rejectReason, setRejectReason] = useState("");
  const [dropO, setDropO] = useState(false);
  const [inputShow, setInputShow] = useState(false);

  const revalidate = useRevalidate();

  const handleReject = useCallback(async () => {
    if (!jsonAdminId || !rejectReason) {
      return;
    }

    const adminId = JSON.parse(jsonAdminId);

    try {
      await httpClient.put(`/admin/loan-contract/${contractId}`, {
        status: "rejected",
        rejectReason,
        adminId,
      });

      revalidate(["admin", "contract", contractId]);

      toast.success("Từ chối thành công");
    } catch (error) {
      toast.error("Từ chối thất bại");
    }
  }, [contractId, jsonAdminId, rejectReason, revalidate]);

  return (
    <StyledModal
      isOpen={open}
      onBackgroundClick={close}
      onEscapeKeydown={close}
    >
      <div className="flex gap-5">
        <div>
          <div className="relative" data-twe-dropdown-ref>
            <button
              className="flex items-center rounded bg-cyan-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-cyan-700-accent-300 hover:shadow-primary-2 focus:bg-cyan-700-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-cyan-700-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              type="button"
              id="dropdownMenuButton1"
              data-twe-dropdown-toggle-ref
              onClick={() => setDropO((prev) => !prev)}
              aria-expanded="false"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              {rejectReason ? rejectReason : "Lý do"}
              <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <ul
              className={`absolute z-[1000] h-60 float-left m-0 ${!dropO && "hidden"} min-w-max list-none overflow-y-scroll rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark`}
              aria-labelledby="dropdownMenuButton1"
              data-twe-dropdown-menu-ref
            >
              {rejectReasons.map((reason) => (
                <li
                  key={reason.id}
                  onClick={() => {
                    if (reason.id !== 11) {
                      setRejectReason(reason.text);
                    } else {
                      setInputShow(true);
                    }
                    setDropO(false);
                  }}
                  className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                >
                  {reason.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleReject}
            className="inline-block rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-cyan-700-accent-300 hover:shadow-primary-2 focus:bg-cyan-700-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-cyan-700-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            Từ chối
          </button>
        </div>
      </div>
      <div>
        {inputShow && (
          <input
            className="shadow mt-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => setRejectReason(e.target.value)}
          />
        )}
      </div>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
width: fit-content;
height: fit-content;
position: relative;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;
