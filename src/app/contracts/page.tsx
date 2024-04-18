import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// eslint-disable-next-line no-restricted-imports
import { ContractList } from "../pages/ContractList/ContractList";

export default async function contractListPage() {
  const nextCookies = cookies();

  const userValue = nextCookies.get("user")?.value;

  if (!userValue) {
    redirect("/");
  }

  return <ContractList />;
}
