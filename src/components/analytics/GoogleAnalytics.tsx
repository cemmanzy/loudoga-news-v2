import Script from "next/script";

interface Props {
  measurementId: string;
}

export default function GoogleAnalytics({
  measurementId,
}: Props) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          gtag("js", new Date());

          gtag("config", "${measurementId}");
        `}
      </Script>
    </>
  );
}