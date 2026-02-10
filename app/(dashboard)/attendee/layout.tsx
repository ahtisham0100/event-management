import { Sidebar } from "@/components/layouts/sidebar";
import { Header } from "@/components/layouts/header";

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="ATTENDEE" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-muted/10 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
