import { NextPageContext } from "next";

/** --------START SSR DETECTED----------- */

export function isMobileSSR(ctx: NextPageContext) {
  return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(
    ctx.req?.headers["user-agent"] || navigator.userAgent,
  );
}
