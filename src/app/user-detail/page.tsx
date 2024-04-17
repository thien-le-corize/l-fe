import { UserDetail } from "@/app/pages/UserDetail/UserDetail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const UserDetailPage = () => {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const parsedUser = user && JSON.parse(user.value ?? "");

  if (!parsedUser) {
    redirect("/login");
  }
  return <UserDetail />;
};

export default UserDetailPage;
