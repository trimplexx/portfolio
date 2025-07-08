import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <main className="container mx-auto px-4 py-8 pt-24">{children}</main>;
}
