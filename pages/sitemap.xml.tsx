import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

import { DOMAIN_URL } from 'constants/variables';
import { sanityClient } from 'lib/sanity-server';

type SanityResponse = {
  loc: string
  lastmode: string
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slugs = await sanityClient.fetch<SanityResponse[]>(`
    *[_type == "post"]{
      'loc': slug.current, 'lastmod': _updatedAt
    }
  `);

  const fields = slugs.map(slug => ({
    ...slug,
    loc: `${DOMAIN_URL}/blog/${slug.loc}`,
  }));

  context.res.setHeader('Content-Type', 'text/xml');
  context.res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');

  return getServerSideSitemap(context, fields);
};

export default function Sitemap() {
  return null;
}
