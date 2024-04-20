import { BankingReqs } from "@/app/pages/admin/BankingReqs/BankingReqs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BankingReqsPage() {
  const cookieStore = cookies();
  const adminId = cookieStore.get("adminId");
  const parsedAdminId = adminId && JSON.parse(adminId.value ?? "");

  if (!parsedAdminId) {
    redirect("/admin/login");
  }

  return <BankingReqs />;
}
