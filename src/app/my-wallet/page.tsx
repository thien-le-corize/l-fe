import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MyWallet } from "@/app/pages/MyWallet/MyWallet";

export default async function MyWalletPage() {
  const nextCookies = cookies();
  const userValue = nextCookies.get("user")?.value;

  if (!userValue) {
    redirect("/");
  }

  const user = JSON.parse(userValue);

  if (user.status !== "verified") {
    redirect("/user-detail?verify=true");
  }

  return <MyWallet />;
}
