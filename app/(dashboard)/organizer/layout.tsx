import { Sidebar } from "@/components/layouts/sidebar";
import { Header } from "@/components/layouts/header";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="ORGANIZER" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-muted/10 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
