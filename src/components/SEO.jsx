import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, image }) {
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://ancientmovers.com/');
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
