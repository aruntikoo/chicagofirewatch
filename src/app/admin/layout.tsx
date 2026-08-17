import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Chicago Fire Watch",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-fire-red/20 bg-charcoal/80">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-warm-white">
            CFW Admin
          </p>
          <p className="text-[11px] text-muted uppercase tracking-wider">
            Not linked publicly
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
