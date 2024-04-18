import { Contracts } from "@/app/pages/admin/Contracts/Contracts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ContractsPage() {
  const cookieStore = cookies();
  const adminId = cookieStore.get("adminId");
  const parsedAdminId = adminId && JSON.parse(adminId.value ?? "");

  if (!parsedAdminId) {
    redirect("/admin/login");
  }

  return <Contracts />;
}
