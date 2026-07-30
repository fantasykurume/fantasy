/* ==========================================
   Fantasy CMS
   SEO
========================================== */

export function applySEO(seo){

if(!seo){

return;

}


/*
==============================
 Title
==============================
*/

document.title =
seo.site_title ||
"Fantasy";



/*
==============================
 Description
==============================
*/

const desc =
document.querySelector(
'meta[name="description"]'
);


if(desc){

desc.content =
seo.meta_description ||
"";

}



/*
==============================
 Canonical
==============================
*/

const canonical =
document.querySelector(
'link[rel="canonical"]'
);


if(canonical){

canonical.href =
seo.canonical ||
"";

}



/*
==============================
 OGP Title
==============================
*/

const ogTitle =
document.querySelector(
'meta[property="og:title"]'
);


if(ogTitle){

ogTitle.content =
seo.og_title ||
seo.site_title ||
"Fantasy";

}



/*
==============================
 OGP Description
==============================
*/

const ogDescription =
document.querySelector(
'meta[property="og:description"]'
);


if(ogDescription){

ogDescription.content =
seo.og_description ||
seo.meta_description ||
"";

}



/*
==============================
 OGP Image
==============================
*/

const ogImage =
document.querySelector(
'meta[property="og:image"]'
);


if(ogImage){

ogImage.content =
seo.og_image ||
"";

}



/*
==============================
 Favicon
==============================
*/

const favicon =
document.querySelector(
'link[rel="icon"]'
);


if(favicon){

favicon.href =
seo.favicon ||
"";

}



/*
==============================
 Robots
==============================
*/

const robots =
document.querySelector(
'meta[name="robots"]'
);


if(robots){

robots.content =
seo.robots ||
"index";

}



/*
==============================
 Google verification
==============================
*/

const googleVerify =
document.querySelector(
'meta[name="google-site-verification"]'
);


if(googleVerify){

googleVerify.content =
seo.google_verify ||
"";

}



/*
==============================
 GA4 / Clarity
==============================

※ 後でscriptタグ追加用

*/


}
