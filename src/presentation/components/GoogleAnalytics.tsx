export function GoogleAnalytics() {

  if (process.env.NEXT_PUBLIC_GA_TRACKING) {
    return (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING}`}
        >
        </script>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING}'), {
                page_path: window.location.pathname
              }
            `
          }}
        />
      </>
    )
  }

  return null
}