/* ==========================================
   Fantasy CMS
   System Module
========================================== */


/*
    仮データ

    後でGASへ変更

    const systemData =
    await fetchAPI("/system");

*/


const systemData = {


    keepBottle: [

        {
            name:"セット料金",

            price:"¥10,000"

        },

        {
            name:"延長60分",

            price:"¥8,000"

        },

        {
            name:"ボトル料金",

            price:"別途"

        },

        {
            name:"サービス料",

            price:"20%"

        }

    ],



    noKeepBottle: [

        {
            name:"セット料金",

            price:"¥15,000"

        },

        {
            name:"延長60分",

            price:"¥10,000"

        },

        {
            name:"飲み放題",

            price:"あり"

        },

        {
            name:"サービス料",

            price:"20%"

        }

    ]

};



/**
 * System 初期化
 */

export function initSystem(){


    renderSystem(
        "systemKeep",
        systemData.keepBottle
    );


    renderSystem(
        "systemNoKeep",
        systemData.noKeepBottle
    );


}




/**
 * System表示
 */

function renderSystem(
    targetId,
    data
){


    const container =
        document.getElementById(
            targetId
        );


    if(!container) return;



    container.innerHTML="";



    data.forEach(item=>{


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "system-row";



        row.innerHTML = `


            <span>

                ${item.name}

            </span>


            <strong>

                ${item.price}

            </strong>


        `;



        container.appendChild(
            row
        );


    });


}