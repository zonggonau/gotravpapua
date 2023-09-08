"use client";
import Nav from "@/config/navigation/Nav";
import "./globals.css";
import Footer from "@/config/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />

        <title>GOTRAV Papua</title>

        <meta name="description" content="" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/images/fav-gotrav.png"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/font-awesome.min.css"
        />
        <link rel="stylesheet" type="text/css" href="assets/css/animate.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/owl.carousel.css"
        />
        <link rel="stylesheet" type="text/css" href="assets/css/slick.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/off-canvas.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/fonts/linea-fonts.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/fonts/flaticon.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/magnific-popup.css"
        />
        <link rel="stylesheet" href="assets/css/rsmenu-main.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/rs-spacing.css"
        />
        <link rel="stylesheet" type="text/css" href="assets/style.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/css/responsive.css"
        />

        <link rel="stylesheet" type="text/css" href="assets/noken-style.css" />
      </head>
      <body className="defult-home">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
