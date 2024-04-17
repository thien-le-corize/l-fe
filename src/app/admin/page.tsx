import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function AdminHome() {
const cookieStore = cookies()
const adminId =  cookieStore.get('adminId')
    const parsedAdminId = adminId && JSON.parse(adminId.value ?? '')
   
    if (!parsedAdminId) {
        redirect('/admin/login')
    }
    else {
        redirect('/admin/users')
    }
}