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

const ogDesc =
document.querySelector(
'meta[property="og:description"]'
);


if(ogDesc){

ogDesc.content =
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

let robots =
document.querySelector(
'meta[name="robots"]'
);


if(!robots){

robots =
document.createElement("meta");

robots.name="robots";

document.head.appendChild(
robots
);

}


robots.content =
seo.robots ||
"index";



/*
==============================
 Google Verify
==============================
*/

if(seo.google_verify){

let verify =
document.querySelector(
'meta[name="google-site-verification"]'
);


if(!verify){

verify =
document.createElement("meta");

verify.name =
"google-site-verification";

document.head.appendChild(
verify
);

}


verify.content =
seo.google_verify;

}



/*
==============================
 GA4
==============================
*/

if(seo.ga4_id){

const script =
document.createElement(
"script"
);

script.async=true;

script.src =
"https://www.googletagmanager.com/gtag/js?id="
+
seo.ga4_id;


document.head.appendChild(
script
);



const gaScript =
document.createElement(
"script"
);


gaScript.innerHTML=`

window.dataLayer = window.dataLayer || [];

function gtag(){
dataLayer.push(arguments);
}

gtag('js', new Date());

gtag('config','${seo.ga4_id}');

`;


document.head.appendChild(
gaScript
);

}



/*
==============================
 Microsoft Clarity
==============================
*/

if(seo.clarity_id){

const clarity =
document.createElement(
"script"
);


clarity.innerHTML=`

(function(c,l,a,r,i,t,y){

c[a]=c[a]||function(){

(c[a].q=c[a].q||[]).push(arguments)

};

t=l.createElement(r);

t.async=1;

t.src="https://www.clarity.ms/tag/"+i;

y=l.getElementsByTagName(r)[0];

y.parentNode.insertBefore(t,y);

})(window, document, "clarity", "script", "${seo.clarity_id}");

`;


document.head.appendChild(
clarity
);

}



/*
==============================
 Keywords
==============================
*/

let keywords =
document.querySelector(
'meta[name="keywords"]'
);


if(keywords){

keywords.content =
seo.keywords ||
"";

}


}
