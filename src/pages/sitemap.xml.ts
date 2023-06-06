import { GetServerSideProps } from 'next';

//pages/sitemap.xml.js
const API_DATA_URL = process.env.NODE_ENV === 'production' ? 
'https://api.promogate.app/resources/stores' : 
'http://localhost:8080/resources/stores';
const APP_DATA_URL = 'https://promogate.app';

type Stores = {
  store_name: string;
}[]

function generateSiteMap(stores: Stores) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://promogate.app</loc>
     </url>
     <url>
       <loc>https://promogate.app/quem-somos</loc>
     </url>
     <url>
       <loc>https://promogate.app/politica-de-privacidade</loc>
     </url>
     <url>
       <loc>https://promogate.app/politica-de-cookies</loc>
     </url>
     <url>
       <loc>https://promogate.app/termos-de-uso</loc>
     </url>
     ${stores
       .map(({ store_name }) => {
         return `
       <url>
           <loc>${`${APP_DATA_URL}/${store_name}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // We make an API call to gather the URLs for our site
  const request = await fetch(API_DATA_URL);
  const stores = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(stores);

  ctx.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  ctx.res.write(sitemap);
  ctx.res.end();

  return {
    props: {},
  };
}

export default SiteMap;