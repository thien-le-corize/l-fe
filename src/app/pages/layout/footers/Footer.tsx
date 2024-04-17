import Image from "next/image";
import FooterCheckIcon from './assets/footerCheck.png'
import { usePathname } from "next/navigation";
import { styled } from "styled-components";
import { MEDIA_QUERY } from "@/utils/screenSize";

/**
 * Footer layout component
 */
 const Footer = () => {
const pathName = usePathname()

  return (
    <FooterWrapper>
      <FooterSection className="gap-5 flex flex-col items-center justify-center">
        <Divided />
        <div className="gap-0 flex flex-col items-center justify-center">
          <Image src={FooterCheckIcon.src} alt="" width={200} height={80}/>
          <FooterCopyRight>
            <p>® Bản Quyền Thuộc Về Ngân hàng Quân đội MB</p>
          </FooterCopyRight>
        </div>
      </FooterSection>
      <div style={{paddingBottom: pathName === '/user-detail' ? 72 : 0}}></div>
    </FooterWrapper>
  );
};

Footer.displayName = "Footer";

export default Footer

const FooterWrapper = styled.div`
  display: block;
  max-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 32px 0px;
  gap: 24px;
  @media (max-width: ${MEDIA_QUERY.TABLET}) {
  }
  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
  }
`;

const FooterSection = styled.section`
  display: flex;
  max-width: auto;
  width: 95%;
  margin: auto;
  padding: 0px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Divided = styled.div`
  height: 0px;
  border: 1px solid #212121;
  flex: none;
  width: 100%;
`;

const FooterCopyRight = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  letter-spacing: 0.0015em;
  color: #212121;
  text-align: center;
  width: 100%;
`;

