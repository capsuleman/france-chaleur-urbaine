interface WindowTrackingExtended extends Window {
  _linkedin_data_partner_ids: string[];
  _paq: [any];
  tarteaucitron: any;
}
declare let window: WindowTrackingExtended;

const MatomoMarkup = ({
  matomoUrl,
  siteId,
}: {
  matomoUrl: string;
  siteId: string;
}) => {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              /* Matomo */
               var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(["disableCookies"]);
              _paq.push(['enableLinkTracking']);
              // https://matomo.org/faq/how-to/how-do-i-track-a-website-within-an-iframe/ 
              _paq.push(['setCookieSameSite', 'None']);
              (function() {
                var u="${matomoUrl}";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '${siteId}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<p><img src="${matomoUrl}/matomo.php?idsite='${siteId}'&amp;rec=1" style="border:0;" alt="" /></p>`,
        }}
      />
    </>
  );
};

export default MatomoMarkup;

export const matomoEvent = (
  matomoEventValues: string[] = [],
  userEventValues: (string | number)[] = []
) => {
  const eventParam = [...matomoEventValues, ...userEventValues];
  if (eventParam.length === 0) {
    console.warn(
      'matomoEvent > Event Params is required - Event is not send to Matomo'
    );
    return;
  }
  return (
    typeof window?._paq?.push === 'function' &&
    window._paq.push(['trackEvent', ...eventParam])
  );
};
