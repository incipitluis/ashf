import AdminNav from "./components/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 py-28 px-4 sm:px-6 lg:px-8">
      <AdminNav />
      {children}
    </div>
  );
}
