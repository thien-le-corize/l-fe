import { BankingReqDetail } from "@/app/pages/admin/BankingReqDetail/BankingReqDetail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BankingReqDetailPage() {
  const cookieStore = cookies();
  const adminId = cookieStore.get("adminId");
  const parsedAdminId = adminId && (await JSON.parse(adminId.value ?? ""));

  if (!parsedAdminId) {
    redirect("/admin/login");
  }

  return <BankingReqDetail />;
}
