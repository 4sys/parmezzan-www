const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { url } = require("inspector");

const links = [{ url: "/", changefreq: "daily", priority: 1, lastmod: new Date().toISOString().slice(0, 16) }];

let sitemap = new SitemapStream({ hostname: "https://parmezzan.pl" });
for (i = 0; i < links.length; i++) {
  sitemap.write(links[i]);
}
sitemap.end();

streamToPromise(sitemap)
  .then((sitemap) => {
    createWriteStream("./src/sitemap.xml").write(sitemap.toString());
  })
  .catch(console.error);
