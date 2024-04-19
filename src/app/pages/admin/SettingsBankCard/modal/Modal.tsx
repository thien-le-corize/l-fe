import { useUploadImage } from "@/hooks/useUploadImage.hooks";
import { debounce, first } from "lodash";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { httpClient } from "@/utils/httpClient";
import { toast } from "react-toastify";
import { useRevalidate } from "@/hooks/useRevalidate";

export const Modal = ({ onClose }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [cardName, setCardName] = useState("");
  const [cardImage, setCardImage] = useState("");

  const revalidate = useRevalidate();

  useLayoutEffect(() => {
    if (modalRef.current instanceof HTMLDivElement) {
      setTop(-modalRef.current.offsetTop);
      setLeft(-modalRef.current.offsetLeft);
    }
  }, []);

  const { handleUploadImage, isUploadPending } = useUploadImage();

  const handleFormImage = async (file?: File) => {
    if (!file) {
      return;
    }

    const url = await handleUploadImage(file);

    debounce(() => {
      setCardImage(url as string);
    }, 2000)();
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      try {
        const res = await httpClient.post("/admin/settings/card", {
          name: cardName,
          image: cardImage,
        });
        revalidate(["cards"]);
        toast.success("Thêm thẻ thành công");
        onClose();
      } catch (error) {
        toast.success("Thêm thẻ thất bại");
      }
    },
    [cardImage, cardName, onClose, revalidate]
  );

  return (
    <div
      ref={modalRef}
      style={{
        width: "100vw",
        height: "100vh",
        top,
        left,
        position: "fixed",
        zIndex: 199,
      }}
      className={`fixed flex inset-0 bg-black bg-opacity-50 backdrop-blur-lg justify-center items-center bg-blend-overlay`}
    >
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        style={{ zIndex: 200 }}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Thêm thẻ
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <label
                  htmlFor="card_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên thẻ
                </label>
                <input
                  onChange={(e) => setCardName(e.target.value)}
                  type="text"
                  name="card_name"
                  id="card_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
                  htmlFor="upload_card"
                >
                  Hình ảnh
                </label>
                <input
                  onChange={(e) => handleFormImage(first(e.target.files))}
                  disabled={isUploadPending}
                  id="upload_card"
                  className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                  type="file"
                />
                {!!cardImage && (
                  <Image
                    src={cardImage}
                    alt=""
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="static-modal"
                type="submit"
                disabled={isUploadPending}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tạo
              </button>
              <button
                data-modal-hide="static-modal"
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
