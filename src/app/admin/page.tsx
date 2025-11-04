import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminForm from "@/components/AdminForm";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <p className="text-gray-700">
            Selamat datang, {session.user?.name} 👋
          </p>
        </div>

        {/* Client Component */}
        <LogoutButton />
      </div>

      <AdminForm />
    </div>
  );
}