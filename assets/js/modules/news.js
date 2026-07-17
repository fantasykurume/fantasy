/* ==========================================
   Fantasy CMS
   News Module
========================================== */


import { openModal } from "../components/modal.js";



/*
    仮データ

    後でGAS接続

    const newsItems =
    await fetchAPI("/news");

*/


const newsItems = [


    {
        id:1,

        date:"2026.07.17",

        title:
        "Grand Openのお知らせ",

        description:
        "Fantasyが新しくオープンしました。",

        content:
        "皆様に愛される店舗を目指して営業してまいります。",

        sort:1

    },


    {
        id:2,

        date:"2026.07.20",

        title:
        "イベント開催のお知らせ",

        description:
        "特別イベントを開催いたします。",

        content:
        "豪華なイベントを予定しております。",

        sort:2

    }


];



/**
 * News 初期化
 */

export function initNews(){


    renderNews();


}



/**
 * News表示
 */

function renderNews(){


    const container =
        document.getElementById(
            "newsList"
        );


    if(!container) return;



    container.innerHTML="";



    newsItems

    .sort(
        (a,b)=>
        a.sort-b.sort
    )


    .forEach(item=>{


        const article =
            document.createElement(
                "article"
            );



        article.className =
            "news-card fade-up";



        article.innerHTML = `


            <time>

                ${item.date}

            </time>


            <h3>

                ${item.title}

            </h3>


            <p>

                ${item.description}

            </p>


            <button>

                詳細を見る

            </button>


        `;



        article
        .querySelector("button")
        .addEventListener(
            "click",
            ()=>{


                openModal({

                    image:
                    "assets/images/common/logo.jpg",

                    title:
                    item.title,

                    description:
                    item.content

                });


            }
        );



        container.appendChild(
            article
        );


    });


}