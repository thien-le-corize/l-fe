import { httpClient } from "@/utils/httpClient"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"

export const useUploadImage = () => {
const [isUploadPending, setIsUploadPending] = useState(false)

    const handleUploadImage = useCallback(async (image?: File) => {
        if (!image) { return }

        try {
            setIsUploadPending(true)
            const formData = new FormData()
            const base64 = await toBase64UsingFileReader(image)
            formData.append('image', image)
            const res = await httpClient.post('/upload', formData)
            toast.success('Ảnh tải thành công')
            return base64
        } catch (error) {
            toast.error('Ảnh tải lên thất bại')
            throw error
        } finally {
            setIsUploadPending(false)
        }
    }, [])


    return { handleUploadImage, isUploadPending }
}

function toBase64UsingFileReader(file:File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      resolve(event.target?.result);
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
