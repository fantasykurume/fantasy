/* ==========================================
   Fantasy CMS
   SEO
========================================== */

export function applySEO(seo){

if(!seo)return;

document.title=
seo.site_title||"Fantasy";

const desc=
document.querySelector(
'meta[name="description"]'
);

if(desc){

desc.content=
seo.meta_description||"";

}

const canonical=
document.querySelector(
'link[rel="canonical"]'
);

if(canonical){

canonical.href=
seo.canonical||"";

}

}
