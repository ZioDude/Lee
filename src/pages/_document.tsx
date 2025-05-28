import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark"> {/* Added className="dark" here */}
      <Head />
      {/* It's generally better to apply theme classes to <html>, 
          but if needed, body can also have specific dark mode base styles.
          For now, `bg-background` on main layout in index.tsx should handle body bg.
          Removed antialiased as it's often default or handled by Tailwind base. */}
      <body> 
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
