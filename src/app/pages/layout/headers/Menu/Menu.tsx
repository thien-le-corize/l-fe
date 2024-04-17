import { useSetAtom } from "jotai";
import { useCallback, useRef } from "react";
// eslint-disable-next-line no-restricted-imports
import { menuActiveStatus } from "../Header";
import Cookie from 'js-cookie'
import useShowNavbar from "./useShowNavbar";
import { styled } from "styled-components";
import { MEDIA_QUERY } from "@/utils/screenSize";
import Link from "next/link";

 const Menu = () => {
  const scopeRef = useRef<HTMLUListElement>(null);

  const setMenuActive = useSetAtom(menuActiveStatus);

  useShowNavbar(scopeRef);

  const closeMenu = useCallback(() => {
    setMenuActive(false);
  }, [setMenuActive]);

  const user = Cookie.get('user')

  const link = user ? '/individual' : '/login'

  return (
    <MenuWrapper ref={scopeRef}>
      <ItemMenu className="home-menu">
        <LinkItem onClick={closeMenu} href="/">
          Trang chủ
        </LinkItem>
      </ItemMenu>
      <ItemMenu className="about-us-menu">
        <LinkItem onClick={closeMenu} href={link}>
          Đăng ký vay
        </LinkItem>
      </ItemMenu>
    </MenuWrapper>
  );
};
Menu.displayName = "Menu";

export default Menu

const MenuWrapper = styled.ul`
  list-style: none;
  display: flex;
  gap: 40px;
  justify-content: center;

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    flex-wrap: wrap;
    height: 100%;
    gap: 20px;
    padding: 24px 24px 2400px 40px;
    width: 100%;
  }
`;

const ItemMenu = styled.li`
  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    flex: 1 1 100%;
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.0025em;

  color: #212121;
  :hover {
    opacity: 0.8;
  }

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    font-family: "Aeonik Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.0025em;
    text-transform: uppercase;
    color: #141416;
  }
`;

