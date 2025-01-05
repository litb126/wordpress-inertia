import { isStrHasLen } from '@/app/utilities/cond';
export const formatSeoData = (
  seo,
  title = '',
  titleTemplate = '| SOAK Digital'
) => {
  return {
    title: seo?.metaTitle || title,
    titleTemplate: `%s ${titleTemplate}`,
    canonical: seo?.canonicalURL || '',
    description: seo?.metaDescription || '',
    noindex: seo?.noindex || false,
    nofollow: seo?.nofollow || false,
    keywords: seo?.keywords || '',
    openGraph: seo?.openGraph || {},
    additionalMetaTags: [
      ...(seo.hasOwnProperty('metaViewport') && isStrHasLen(seo.metaViewport)
        ? [
            {
              name: 'viewport',
              content: seo.metaViewport,
            },
          ]
        : []),
    ],
  };
};
