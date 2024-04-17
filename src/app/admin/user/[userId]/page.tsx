
import { UserDetail } from "@/app/pages/admin/UserDetail/UserDetail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function UserDetailPage() {
const cookieStore = cookies()
    const adminId =  cookieStore.get('adminId')
    const parsedAdminId = adminId && JSON.parse(adminId.value ?? '')
   
    if (!parsedAdminId) {
        redirect('/admin/login')
    }

    return (
      <div><UserDetail/></div>
    );
  }
  