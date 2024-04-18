import { useRevalidate } from "@/hooks/useRevalidate";
import { httpClient } from "@/utils/httpClient";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Modal from "styled-react-modal";

const rejectReasons = [{ id: 1, text: "" }];

export const RejectModal = ({ contractId, jsonAdminId }: any) => {
  const [rejectReason, setRejectReason] = useState("");

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
      RejectModal
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
width: 50%;
height: 80%;
position: relative;
top: 50px;
overflow: hidden;
overflow-y: scroll;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;
