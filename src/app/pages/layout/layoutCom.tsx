'use client';
import { atom, useAtom, useSetAtom } from "jotai";
import { debounce } from "lodash";
import React, { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { MEDIA_QUERY, SCREEN_SIZE } from "@/utils/screenSize";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/grid";
import "swiper/css/bundle";
import 'swiper/css';
import 'swiper/css/scrollbar';
import Cookie from 'js-cookie'
import { usePathname } from "next/navigation";
import Header from "./headers/Header";
import Footer from "./footers/Footer";
import { styled } from "styled-components";
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from "react-toastify";



export const headerHeightInit = atom(70);
export const userAtom = atom<any>(null);

/** Layout components */
 const LayoutCom: FC<PropsWithChildren> = ({ children }) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useAtom(headerHeightInit);
  const setUser = useSetAtom(userAtom);

  const pathname = usePathname()
  

  useEffect(() => {
    if (pathname) {
      const user = Cookie.get('user')
      if (!user) {return}
      
      const userValue = JSON.parse(user)
      setUser(userValue)
    }
  },[pathname, setUser])

  useMediaQuery(SCREEN_SIZE.TABLET);

  const handleSetHeaderHeight = useCallback(
    (height: number) => {
      debounce((height: number) => setHeaderHeight(height), 200)(height);
    },
    [setHeaderHeight],
  );

  const measureRef = (node: object) => {
    if (!(node instanceof HTMLDivElement)) {
      return;
    }

    handleSetHeaderHeight(node.clientHeight);
  };

  return (
    <div ref={bodyRef}>
      <NextNProgress
              height={5}
              color={'#273c75'}
              options={{ showSpinner: false }}
            />
      <ToastContainer />

      <LayoutWrapper>
        <Header ref={measureRef} />
        <LayoutPageWrapper
          style={{ paddingTop: `${headerHeight}px` }}
        >
          {children}
          <Footer />
        </LayoutPageWrapper>
      </LayoutWrapper>
    </div>
  );
};

LayoutCom.displayName = "LayoutCom";

export default LayoutCom

const LayoutWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const LayoutPageWrapper = styled.div`
  width: 100%;

  margin: 0 auto;

  @media (max-width: ${MEDIA_QUERY.EXTRA_DESKTOP}) {
    width: 100%;
  }
`;
