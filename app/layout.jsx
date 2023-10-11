import Nav from "@/config/navigation/Nav";
import "./globals.css";
import Footer from "@/config/footer/Footer";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="seZXlxxGXXnGt9EuEOHKlkr92NZ1TsZodqX_oXDovpM"
        />
        {/* <script
          src="https://code.jquery.com/jquery-3.7.1.slim.js"
          integrity="sha256-UgvvN8vBkgO0luPSUl2s8TIlOSYRoGFAX4jlCIm9Adc="
          crossorigin="anonymous"
        ></script> */}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/images/fav-gotrav.png`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/bootstrap.min.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/font-awesome.min.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/animate.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/owl.carousel.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/slick.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/off-canvas.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/fonts/linea-fonts.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/fonts/flaticon.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/magnific-popup.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/rsmenu-main.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/rs-spacing.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/style.css`}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/css/responsive.css`}
        />

        <link
          rel="stylesheet"
          type="text/css"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/noken-style.css`}
        />
      </head>

      <body className="defult-home">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
