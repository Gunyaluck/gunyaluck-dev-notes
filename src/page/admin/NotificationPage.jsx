import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { NotificationList } from "../../components/admin/Notification/NotificationList";

export function NotificationPage() {
  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-10 px-15">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-headline-2 text-brown-600">Notification</h1>
        </div>

        {/* Notification List */}
        <div className="bg-white rounded-lg border border-brown-300 overflow-hidden shadow-md">
          <NotificationList />
        </div>
      </div>
    </div>
  );
}
