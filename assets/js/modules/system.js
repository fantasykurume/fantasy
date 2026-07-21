/* ==========================================
   Fantasy CMS
   System Module
========================================== */


import {
    fetchAPI
}
from "../api/api.js";



/**
 * System 初期化
 */

export async function initSystem(){


    const result =

        await fetchAPI(
            "system"
        );



    if(
        !result ||
        result.status !== "success"
    ){

        console.error(
            "System API Error"
        );

        return;

    }



    const systems =

        result.data

        .filter(
            item =>
            item.status === "公開"
        )

        .sort(
            (a,b)=>
            Number(a.sort) -
            Number(b.sort)
        );



    const keep =

        systems.filter(
            item =>
            item.type === "keep"
        );



    const noKeep =

        systems.filter(
            item =>
            item.type === "no_keep"
        );



    renderSystem(
        "systemKeep",
        keep
    );



    renderSystem(
        "systemNoKeep",
        noKeep
    );


}



/**
 * System表示
 */

function renderSystem(
    target,
    items
){


    const area =

        document.getElementById(
            target
        );



    if(!area){

        return;

    }



    area.innerHTML = "";



    items.forEach(
        item=>{


            const card =

                document.createElement(
                    "div"
                );



            card.className =
                "system-item";



            card.innerHTML = `


                <h4>

                    ${item.name}

                </h4>


                <p class="price">

                    ${item.price}

                </p>


                <p>

                    ${item.description || ""}

                </p>


            `;



            area.appendChild(
                card
            );


        }
    );


}