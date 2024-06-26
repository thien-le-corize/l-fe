import { SettingsBankCard } from "@/app/pages/admin/SettingsBankCard/SettingsBankCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingsBankCardsPage() {
  const cookieStore = cookies();
  const adminId = cookieStore.get("adminId");
  const parsedAdminId = adminId && JSON.parse(adminId.value ?? "");

  if (!parsedAdminId) {
    redirect("/admin/login");
  }

  return <SettingsBankCard />;
}
