import "@Front/index.scss";
import type { NextPage } from "next";
import type { AppType, AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { DefaultLayout } from "@Front/components/LayoutTemplates/DefaultLayout";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    // eslint-disable-next-line react/no-children-prop
    ((page) => <DefaultLayout children={page}></DefaultLayout>);

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default MyApp;
