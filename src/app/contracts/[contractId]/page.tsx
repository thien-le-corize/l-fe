import { ContractDetail } from "@/app/pages/ContractDetail/ContractDetail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ContractDetailPage() {
  const nextCookies = cookies();

  const userValue = nextCookies.get("user")?.value;

  if (!userValue) {
    redirect("/");
  }

  return <ContractDetail />;
}
