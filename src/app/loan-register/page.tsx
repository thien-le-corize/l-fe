import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import { LoanRegister } from "../pages/LoanRegister/LoanRegister";

export default async function LoanRegisterPage() {
  const nextCookies = cookies();

  const userValue = nextCookies.get("user")?.value;

  if (!userValue) {
    redirect("/");
  }

  const user = JSON.parse(userValue);

  if (user.status !== "verified") {
    redirect("/user-detail?verify=true");
  }

  return <LoanRegister />;
}
