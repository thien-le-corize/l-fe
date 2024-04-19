import { httpClient } from "@/utils/httpClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useUploadImage = () => {
  const [isUploadPending, setIsUploadPending] = useState(false);

  const handleUploadImage = useCallback(async (image?: File) => {
    if (!image) {
      return;
    }

    try {
      const base64 = await toBase64UsingFileReader(image);
      setIsUploadPending(true);
      const res = await axios.post("http://localhost:3000/api/upload", {
        file: base64,
        fileName: image.name,
      });
      toast.success("Ảnh tải thành công");
      return (res as any).data.url;
    } catch (error) {
      toast.error("Ảnh tải lên thất bại");
      throw error;
    } finally {
      setIsUploadPending(false);
    }
  }, []);

  return { handleUploadImage, isUploadPending };
};

function toBase64UsingFileReader(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target?.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
