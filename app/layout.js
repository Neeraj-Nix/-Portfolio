import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});
export const metadata = {
  title: "Portfolio | Graphic Designer & Video Editor",
  description:
    "Creative portfolio showcasing graphic design and video editing projects.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      {""}
      <body className="antialiased min-h-screen flex flex-col">
        {""}
        <Navbar /> <main className="flex-grow pt-20"> {children} </main>{" "}
        <Footer />{""}
      </body>{""}
    </html>
  );
}
