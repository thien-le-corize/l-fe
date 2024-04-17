import Image from "next/image";
import { FC } from "react";
import { ButtonWrapper } from "./styles";

type props = {
  text: string;
  icon: string;
  onClick: () => void
};

export const Button: FC<props> = ({ text, icon,onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      {text} <Image src={icon} alt="" width={20} height={20} />
    </ButtonWrapper>
  );
};

Button.displayName = "Button";
