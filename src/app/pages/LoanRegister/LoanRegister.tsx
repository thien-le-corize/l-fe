"use client";
import { formatCurrency } from "@/utils/formatCurrency";
import { calculateLoanPayments } from "@/utils/loanCalc";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { LoanRequest } from "./LoanRequest/LoanRequest";

const findNearestValue = (value: number, arr: number[]) => {
  return arr.reduce(function (prev, curr) {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
};

const acceptKyHan = [6, 12, 18, 24, 36, 48, 60];
const loanRange = { min: 30000000, max: 2000000000 };
const loanPriceDefault = 100000000;
const kyHanDefault = 12;

export const interestRate = 0.01;

const handleCalc = debounce(
  (
    interestRate: number,
    kyHan: number,
    loanPrice: number,
    setCalcLoanPay: React.Dispatch<any>,
    setTotal: React.Dispatch<number>
  ) => {
    const { payments, totalPayment } = calculateLoanPayments(
      interestRate,
      kyHan,
      loanPrice
    );
    setCalcLoanPay(payments);
    setTotal(totalPayment);
    console.log(123);
  },
  1000
);

export const LoanRegister = () => {
  const [loanPrice, setLoanPrice] = useState(loanPriceDefault);
  const [kyHan, setKyHan] = useState(kyHanDefault);
  const [calcLoanPay, setCalcLoanPay] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [o, setO] = useState(false);

  const handleLoanPrice = useCallback((value: number) => {
    setLoanPrice(value);
  }, []);

  const handleKyHan = useCallback((value: number) => {
    const currentKyHan = findNearestValue(value, acceptKyHan);
    setKyHan(currentKyHan);
  }, []);

  useEffect(() => {
    handleCalc(interestRate, kyHan, loanPrice, setCalcLoanPay, setTotal);
  }, [kyHan, loanPrice]);

  return (
    <div
      style={{ height: "600px" }}
      className="p-8 rounded-r-2xl rounded-l-lg bg-white"
    >
      <LoanRequest
        close={() => setO(false)}
        open={o}
        loanInfoSelected={{ kyHan, loanPrice, interestRate }}
      />
      <div className="text-4xl font-bold mb-10">Đăng ký khoản vay</div>
      <div style={{ height: "80%" }} className="flex gap-20">
        <div className="flex flex-col flex-1 text-2xl basis-3/6 gap-10">
          <div>
            <div className="flex justify-between">
              <div>Số tiền cần vay</div>
              <div>{formatCurrency(loanPrice)}vnd</div>
            </div>
            <div>
              <div className="relative mb-6">
                <input
                  id="labels-range-input-1"
                  step={5000000}
                  onChange={(e) => handleLoanPrice(Number(e.target.value))}
                  type="range"
                  value={loanPrice}
                  min={loanRange["min"]}
                  max={loanRange["max"]}
                  className="input-range w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-lg text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  30,000,000
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  2,000,000,000
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <div>Kỳ hạn vay</div>
              <div>{kyHan} tháng</div>
            </div>
            <div>
              <div className="relative mb-6">
                <input
                  id="labels-range-input-2"
                  onChange={(e) => handleKyHan(Number(e.target.value))}
                  step={6}
                  type="range"
                  value={kyHan}
                  min="6"
                  max="60"
                  className="input-range w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-lg text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  6 Tháng
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  60 Tháng
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 basis-3/6">
          <div className="relative h-full overflow-x-auto">
            <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-2xl rounded-s-lg">
                    Kỳ
                  </th>
                  <th scope="col" className="px-6 text-2xl py-3">
                    Số tiền phải trả
                  </th>
                </tr>
              </thead>
              <tbody>
                {calcLoanPay.map((row: any) => {
                  return (
                    <tr key={row.id} className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Kỳ {row.ky}
                      </th>
                      <td className="px-6 text-xl text-right py-4">
                        {formatCurrency(row.soTienPhaiTra)}vnd
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <div className="font-semibold flex justify-between text-gray-900 dark:text-white">
              <div className="px-6 py-3 text-2xl">Total</div>
              <div className="px-6 py-3 text-2xl">
                {formatCurrency(total)}vnd
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed py-4 bottom-0 left-0 w-full bg-white drop-shadow-2xl	filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));">
        <div className="flex w-full items-end justify-end pr-10">
          <button
            type="button"
            onClick={() => setO(true)}
            className="bg-blue-700 disabled:opacity-75 hover:bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Gửi yêu cầu vay
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
