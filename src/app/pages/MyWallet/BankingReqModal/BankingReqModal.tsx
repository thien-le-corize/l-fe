import { httpClient } from "@/utils/httpClient";
import React, { useCallback, useState } from "react";
import Modal from "styled-react-modal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const BankingReqModal = ({ o, cl }: any) => {
  const [tienRut, setTienRut] = useState<number>();

  const jsonUser = Cookies.get("user");
  const user = JSON.parse(jsonUser ?? "{}");

  const onCl = useCallback(() => {
    cl();
    setTienRut(undefined);
  }, [cl]);

  const bankingReq = useCallback(async () => {
    const userId = user?._id;
    if (!userId) {
      return;
    }

    try {
      const res = await httpClient.post("/banking/banking-request", {
        userId,
        soTienCanRut: tienRut,
      });

      //   user.bankingStatus = "notApproved";

      //   Cookies.set("user", JSON.stringify(user));
      toast.success("Gửi yêu cầu rút tiền thành công");
      onCl();
    } catch (error) {
      toast.error("Gửi yêu cầu rút tiền thất bại");
    }
  }, [onCl, tienRut, user]);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!Number(tienRut)) {
        return;
      }

      if (tienRut && user.soDuKhaDung < tienRut) {
        toast.error("Không thể rút số tiền lớn hơn số dư khả dụng");
      }

      bankingReq();
    },
    [bankingReq, tienRut, user?.soDuKhaDung]
  );

  return (
    <StyledModal isOpen={o} onBackgroundClick={onCl} onEscapeKeydown={onCl}>
      <form className="px-5 py-10 flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="NHẬP SỐ TIỀN CẦN RÚT"
          value={tienRut ?? ""}
          onChange={(e) =>
            Number(e.target.value) && setTienRut(Number(e.target.value))
          }
          required
        />
        <button
          type="submit"
          className="text-white ease-out w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Gửi yêu cầu rút tiền
        </button>
      </form>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
width: 30%;
height: fit-content;
position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
