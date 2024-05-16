"use client";

import * as React from "react";

import { useState, useEffect } from "react";

export interface IListPagesProps {
  maxLength?: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPagesShow?: number;
  numPages: number;
  onClick?: any;
}

export default function ListPages(props: IListPagesProps) {
  const {
    maxLength,
    currentPage,
    setCurrentPage,
    maxPagesShow,
    numPages,
    onClick,
  } = props;

  const [prevDot, setPrevDot] = useState(false);
  const [nextDot, setNextDot] = useState(false);

  let numArr = [];
  for (let i = 0; i < numPages; i++) {
    numArr.push(i + 1);
  }

  useEffect(() => {
    if (currentPage + 2 == numPages) setNextDot(false);
    else if (currentPage + 2 < numPages) setNextDot(true);
    if (currentPage > 3) setPrevDot(true);
    else if (currentPage <= 3) setPrevDot(false);
  }, [currentPage, numPages]);

  const prev = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const next = () => {
    if (currentPage != numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="py-[10px] float-end">
      <div className="ml-auto flex gap-[10px] items-center">
        <div
          onClick={prev}
          className=" cursor-pointer font-medium text-xs leading-[18px] text-[#979797]"
        >
          Previous
        </div>
        {currentPage == 3 && (
          <div
            onClick={() => setCurrentPage(1)}
            className=" cursor-pointer font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5"
          >
            1
          </div>
        )}
        {prevDot && (
          <>
            <div
              onClick={() => setCurrentPage(1)}
              className="cursor-pointer font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5"
            >
              1
            </div>
            <div className="font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5">
              ...
            </div>
          </>
        )}
        {numArr.map(function (data) {
          if (data + 1 == currentPage || data - 1 == currentPage) {
            return (
              <div
                key={data}
                onClick={() => setCurrentPage(data)}
                className="cursor-pointer font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5"
              >
                {data}
              </div>
            );
          } else if (data == currentPage) {
            return (
              <div key={data} className="cursor-pointer font-medium text-xs leading-[18px] text-[#F0F0F0] bg-[#FF6B00] rounded-full px-[6px] size-5 text-center">
                {currentPage}
              </div>
            );
          }
        })}
        {nextDot && (
          <>
            <div className="font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5">
              ...
            </div>
            <div
              onClick={() => setCurrentPage(numPages)}
              className=" cursor-pointer font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5"
            >
              {numPages}
            </div>
          </>
        )}
        {currentPage + 2 == numPages && (
          <div
            onClick={() => setCurrentPage(numPages)}
            className="cursor-pointer font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5"
          >
            {numPages}
          </div>
        )}
        <div
          onClick={next}
          className="cursor-pointer font-medium text-xs leading-[18px] text-[#979797] rounded-full px-[6px] size-5"
        >
          Next
        </div>
      </div>
    </div>
  );
}
