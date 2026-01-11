import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";
import { Inter, Outfit } from "next/font/google"; // [MODIFIED] Added 'Outfit' for headings

import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// [NEW] Configure 'Outfit' font with a variable for Tailwind
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Dayflow HRMS | Smart Human Resource Management System",
    template: "%s | Dayflow HRMS",
  },
  description:
    "Dayflow HRMS is a modern Human Resource Management System for managing employees, attendance, leave, and payroll with secure authentication and role-based access.",
  keywords: [
    "HRMS",
    "Human Resource Management System",
    "Attendance Management",
    "Leave Management System",
    "Payroll Software",
    "Employee Management",
    "HR Software",
  ],
  authors: [{ name: "Dayflow Team" }],
  creator: "Dayflow",
  applicationName: "Dayflow HRMS",
  category: "Business & Productivity",
  icons: {
    icon: "/favicon.ico",

  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={cn(inter.variable, outfit.variable, "antialiased bg-background text-foreground font-sans")}>
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </ClerkProvider>
    </html>
  );
}


