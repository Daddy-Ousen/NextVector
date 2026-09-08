import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  articlePublishedTime?: string;
  articleSection?: string;
  tags?: string[];
  schemaData?: Record<string, any>;
}

const BASE_URL = 'https://nextvector.rhasan.online';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  articlePublishedTime,
  articleSection,
  tags = [],
  schemaData,
}) => {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = title.includes('NextVector') ? title : `${title} | NextVector`;
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const fullUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

    // 2. Standard Meta Tags & AI Directives
    setMeta('name', 'description', description);
    setMeta('name', 'author', 'Robiul Hasan');
    setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    if (tags.length > 0) {
      setMeta('name', 'keywords', tags.join(', '));
    }
    setLink('canonical', fullUrl);

    // 3. OpenGraph Tags
    setMeta('property', 'og:site_name', 'NextVector — Technology & AI Intelligence');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);

    if (ogType === 'article') {
      if (articlePublishedTime) setMeta('property', 'article:published_time', articlePublishedTime);
      if (articleSection) setMeta('property', 'article:section', articleSection);
      setMeta('property', 'article:author', 'https://rhasan.online');
    }

    // 4. Twitter Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:creator', '@NextVector');

    // 5. JSON-LD Schema for Google AI Overviews, Perplexity & Schema.org
    let scriptEl = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'seo-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: 'NextVector',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      founder: {
        '@type': 'Person',
        name: 'Robiul Hasan',
        url: 'https://rhasan.online',
        sameAs: ['https://rhasan.online', 'https://github.com/Daddy-Ousen'],
      },
    };

    scriptEl.textContent = JSON.stringify(schemaData || defaultSchema);
  }, [title, description, canonicalPath, ogImage, ogType, articlePublishedTime, articleSection, tags, schemaData]);

  return null;
};
