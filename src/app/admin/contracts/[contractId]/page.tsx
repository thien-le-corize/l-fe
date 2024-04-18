import { ContractDetail } from "@/app/pages/admin/ContractDetail/ContractDetail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ContractDetailPage() {
  const cookieStore = cookies();
  const adminId = cookieStore.get("adminId");
  const parsedAdminId = adminId && (await JSON.parse(adminId.value ?? ""));

  if (!parsedAdminId) {
    redirect("/admin/login");
  }

  return <ContractDetail />;
}
