import { DefaultLayout } from "@/components/LayoutTemplates/DefaultLayout";
import { FrontendVariables } from "@/config/VariablesFront";
import "@/index.scss";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
} & { apiUrl: string };

const MyApp = (({ Component, pageProps, apiUrl }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    // eslint-disable-next-line react/no-children-prop
    ((page) => <DefaultLayout children={page}></DefaultLayout>);

  FrontendVariables.getInstance().NEXT_PUBLIC_API_URL = apiUrl;

  return getLayout(<Component {...pageProps} />);
}) as AppType;

MyApp.getInitialProps = async () => {
  return { apiUrl: process.env["NEXT_PUBLIC_API_URL"]};
}
export default MyApp;
