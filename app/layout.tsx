// import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import '../styles.scss';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* <Analytics /> */}
    </>
  );
}

export default Layout;
