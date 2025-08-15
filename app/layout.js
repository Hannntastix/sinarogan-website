import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "Sinar Ogan",
  description: "Website informasi sinar ogan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Website Sinar Ogan</title>
      </head>
      <body
        className={poppins.variable}
      >
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}