import { fetchAPI } from "../api/api.js";


export async function initCast(){

    const result =
        await fetchAPI("cast");


    if(result.status!=="success") return;


    const grid =
        document.getElementById("castGrid");


    if(!grid) return;


    grid.innerHTML="";


    result.data

        .filter(item=>item.status==="公開")

        .sort((a,b)=>a.sort-b.sort)

        .forEach(item=>{


            grid.innerHTML+=`

            <article class="cast-card">


                <button class="cast-name">

                    ${item.name}

                </button>


                <div class="cast-photo">


                    <img
                        src="${item.image_url}"
                        alt="${item.name}">


                </div>


            </article>

            `;

        });



    const buttons =
        document.querySelectorAll(".cast-name");


    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const photo =
                    button.nextElementSibling;


                button.addEventListener(
    "click",
    ()=>{

        const photo =
            button.nextElementSibling;


        photo.classList.toggle("open");

        button.classList.toggle("active");

    }
);


            }
        );


    });


}