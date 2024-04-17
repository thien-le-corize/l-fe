import { Users } from "@/app/pages/admin/Users/Users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function UsersPage() {
const cookieStore = cookies()
const adminId =  cookieStore.get('adminId')
    const parsedAdminId = adminId && JSON.parse(adminId.value ?? '')
   
    if (!parsedAdminId) {
        redirect('/admin/login')
    }


return <Users adminId={parsedAdminId}/>
  }
  