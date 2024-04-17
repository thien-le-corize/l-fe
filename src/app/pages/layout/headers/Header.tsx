'use client';
import { atom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { LegacyRef, forwardRef, useCallback, useRef } from "react";
import MenuButtonIcon from "./assets/menu-icon.svg";
import useHeaderAnimation from "./useHeaderAnimation";
import { matches } from "@/hooks/useMediaQuery";
import ArrowRight from "@/assets/arrow-right.png";
import Logo from "@/assets/logo.png";
import userLogo from './assets/user.png'
import styled from "styled-components";
import { useRouter } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import { userAtom } from "../layoutCom";
import { MEDIA_QUERY } from "@/utils/screenSize";
import { ButtonWrapper } from "@/app/components/Button/styles";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import Menu from "./Menu/Menu";

export const menuActiveStatus = atom(false);

const Header = forwardRef<object, { ref: (node: object) => void }>(
  (__, ref) => {
    const user = useAtomValue(userAtom);

    const headerContainer = useRef<HTMLDivElement>(null);
    const setMenuActive = useSetAtom(menuActiveStatus);
    const isTablet = useAtomValue(matches);

    const { handleHideAnimate, handleShowAnimate } =
      useHeaderAnimation(headerContainer);

    const handleToggle = useCallback(() => {
      setMenuActive((prev) => {
        if (prev) {
          handleHideAnimate();
        } else {
          handleShowAnimate();
        }

        return !prev;
      });
    }, [handleHideAnimate, handleShowAnimate, setMenuActive]);

    const router = useRouter()

    return (
      <HeaderWrapper className="drop-shadow-2xl">
        <HeaderSection ref={headerContainer}>
          <FirstHeaderSection ref={ref as LegacyRef<HTMLDivElement>}>
            <Link href={'/'}>
              <Image src={Logo.src} alt="Logo" width={250} height={80} />
            </Link>
            <MenuButton onClick={handleToggle}>
              <Image
                src={MenuButtonIcon}
                width={24}
                height={24}
                alt="menu-button-icon"
              />
            </MenuButton>
          </FirstHeaderSection>
          {isTablet && <MenuContentWrapper1 className="menu-content-wrapper" />}
          <MenuContentWrapper className="menu-content">
            <HeaderMenu>
              <Menu />
            </HeaderMenu>
            <HeaderButton>
              <HeaderLanguage>
              </HeaderLanguage>
              {user ? <ButtonWrap><Button onClick={() => router.push('/user-detail')} text="" icon={userLogo.src} /></ButtonWrap> : <Button onClick={() => router.push('/login')} text="Đăng nhập" icon={ArrowRight.src} />}
            </HeaderButton>
          </MenuContentWrapper>
        </HeaderSection>
      </HeaderWrapper>
    );
  },
);

Header.displayName = "Header";

export default Header

const ButtonWrap = styled.div`
  height: 100%;

  img {
    margin: 0;
    width: 32px;
    height: 32px;
    &:hover {
      color: none;
      background-color: white !important;
      opacity: 0.8;
    }
  }

  button {
    background-color: white;
    /* padding: 8px; */
  }
`

const HeaderWrapper = styled.div`
  width: 100%;
  margin: auto;
  height: 70px;
  padding: 0px;
  position: fixed;
  z-index: 99;
  background-color: red;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    height: auto;
  }
`;

const HeaderSection = styled.section`
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: white;
  margin: auto;
  max-width: auto;
  align-items: center;
  height: 100%;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    flex-direction: column;
  }
`;



const HeaderMenu = styled.div`
  flex: 1 1 50%;
  overflow: hidden;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    order: 3;
    width: 100%;
  }
`;

const HeaderLanguage = styled.div`
  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    width: 45%;
    display: flex;
    justify-content: center;
  }
`;

const HeaderButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  height: 100%;

  ${ButtonWrapper} {
    height: 100%;
  }

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    order: 2;
    overflow: hidden;
    width: 100%;
    height: auto;
    border-top: 1px solid purple;
    border-bottom: 1px solid purple;

    ${ButtonWrapper} {
      width: 55%;
      justify-content: center;
    }
  }
`;

const FirstHeaderSection = styled.div`
  padding: 8px 24px;
  display: flex;
  align-items: center;
  flex: 1 1 20%;
  height: 100%;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    order: 1;
    width: 100%;
    justify-content: space-between;
  }
`;

const MenuButton = styled.button`
  display: none;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    display: block;
  }
`;

const MenuContentWrapper1 = styled.div`
  background: yellow;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  height: 0;
  width: 100%;
  z-index: -1;
`;

const MenuContentWrapper = styled.div`
  display: flex;
  background-color: white;
  flex: 1 1 80%;
  height: 100%;
  max-height: 100%;
  order: 2;
  top: 100%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    flex-direction: column;
    z-index: -1;
    height: 0;
    max-height: 0;
    position: absolute;
    width: 100%;
  }
`;
