import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header/page";
// import Foooter from "./components/footer/page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Define required weights
  variable: "--font-poppins", // Optional: For using in CSS variables
});
;

export const metadata: Metadata = {
  title: "Daily expense manager",
  description: "Effortlessly track and manage your daily expenses with our intuitive expense manager. Gain insights into your spending habits, set budgets, and stay financially organized—all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-gray-50`}
      >
        <Header />
        {children}
        {/* <Foooter /> */}
      </body>
    </html>
  );
}
