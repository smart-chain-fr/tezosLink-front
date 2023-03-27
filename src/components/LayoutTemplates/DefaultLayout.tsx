import Head from "next/head";
import { ReactNode } from "react";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Tezos Link</title>
        <link rel="shortcut icon" href="/favicon-16x16.png" />
      </Head>
      <main>{children}</main>
    </>
  );
};
