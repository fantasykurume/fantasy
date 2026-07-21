/* ==========================================
   Fantasy CMS
   News Module
========================================== */


import {
    fetchAPI
}
from "../api/api.js";


import {
    CONFIG
}
from "../config/config.js";



/**
 * News 初期化
 */

export async function initNews(){


    const result =

        await fetchAPI(
            "news"
        );



    if(
        !result ||
        result.status !== "success"
    ){

        console.error(
            "News API Error"
        );

        return;

    }



    const news =

        result.data

        .filter(
            item =>
            item.status === "公開"
        )

        .sort(
            (a,b)=>
            Number(a.sort) -
            Number(b.sort)
        )

        .slice(
            0,
            CONFIG.NEWS_LIMIT
        );



    renderNews(
        news
    );


}



/**
 * News表示
 */

function renderNews(items){


    const list =

        document.getElementById(
            "newsList"
        );



    if(!list){

        return;

    }



    list.innerHTML = "";



    items.forEach(
        item=>{


            const article =

                document.createElement(
                    "article"
                );



            article.className =
                "news-card";



            article.innerHTML = `


                ${
                    item.image_url

                    ?

                    `<img
                    src="${item.image_url}"
                    alt="${item.title}"
                    loading="lazy">`

                    :

                    ""

                }



                <div class="news-content">


                    <time>

                        ${item.date}

                    </time>


                    <h3>

                        ${item.title}

                    </h3>


                    <p>

                        ${item.description || ""}

                    </p>


                </div>


            `;



            list.appendChild(
                article
            );


        }
    );


}