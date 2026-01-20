import React from 'react'
import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
    title = 'Country Counter App',
    description = 'Create your travel list, share it with your friends, create wish lists and track them.',
    keywords = 'countries, travel, flags, counter, visited, wishlist',
    url = window.location.href
  }) => {

    const fullTitle = title.includes('Country Counter') 
    ? title 
    : `${title} | Country Counter`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="ru" />
    </Helmet>
  )
}
