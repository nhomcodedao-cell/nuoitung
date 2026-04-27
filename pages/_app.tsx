import type { AppProps } from "next/app";
import { Suspense } from "react";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config";
import "./app.css";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = object> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & ((props: P) => ReactElement);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface AppContentProps {
  Component: NextPageWithLayout;
  pageProps: Record<string, unknown>;
}

const AppContent = ({ Component, pageProps }: AppContentProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const pageContent = getLayout(<Component {...pageProps} />);

  return (
    <Suspense fallback={<></>}>

      <>{pageContent}</>

    </Suspense>
  );
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Toaster position="top-center" />
      <AppContent
        Component={Component}
        pageProps={pageProps as Record<string, unknown>}
      />
    </>
  );
}