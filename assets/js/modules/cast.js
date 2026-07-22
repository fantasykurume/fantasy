import { fetchAPI } from "../api/api.js";

export async function initCast(){

    const result =
        await fetchAPI("cast");

    if(result.status!=="success") return;

    const grid =
        document.getElementById("castGrid");

    grid.innerHTML="";

    result.data

        .filter(item=>item.status==="公開")

        .sort((a,b)=>a.sort-b.sort)

        .forEach(item=>{

            grid.innerHTML+=`

            <article class="cast-card">

                <img
                    src="${item.image_url}"
                    alt="${item.name}">

                <h3>${item.name}</h3>

            </article>

            `;

        });

}