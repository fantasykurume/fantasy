/* ==========================================
   Fantasy CMS
   Dashboard Admin
========================================== */


export function initDashboardAdmin(){


    document.querySelector(".content").innerHTML = `


    <h2>
        Dashboard
    </h2>


    <div class="dashboard">


        <div class="dashboard-card">

            <h3>
                Fantasy CMS
            </h3>

            <p>
                管理画面へようこそ
            </p>

        </div>



        <div class="dashboard-card">

            <h3>
                管理項目
            </h3>

            <p>
                店舗情報・Gallery・Castなどを管理できます
            </p>

        </div>



        <div class="dashboard-card">

            <h3>
                API Status
            </h3>

            <p id="apiStatus">
                確認中...
            </p>

        </div>


    </div>


    `;


    checkAPI();


}




async function checkAPI(){


    const status =
        document.getElementById(
            "apiStatus"
        );


    try{


        const response =
            await fetch(
                "https://fantasy-api.fantasykurume0820.workers.dev/"
            );


        const result =
            await response.json();



        if(result.status==="ok"){


            status.innerHTML =
            "🟢 API ONLINE";


        }else{


            status.innerHTML =
            "🔴 API ERROR";


        }



    }catch(e){


        status.innerHTML =
        "🔴 通信エラー";


    }


}