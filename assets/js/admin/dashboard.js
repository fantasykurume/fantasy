/* ==========================================
   Fantasy CMS
   Dashboard Admin
========================================== */


export function initDashboardAdmin(){


    document
    .querySelector(".content")
    .innerHTML = `


        <h2>
            Dashboard
        </h2>



        <div class="dashboard-grid">



            <div class="dashboard-card">

                <h3>
                    🏢 店舗情報
                </h3>

                <p>
                    店舗設定管理
                </p>

            </div>




            <div class="dashboard-card">

                <h3>
                    📷 Gallery
                </h3>

                <p>
                    画像管理
                </p>

            </div>




            <div class="dashboard-card">

                <h3>
                    👩 Cast
                </h3>

                <p>
                    キャスト管理
                </p>

            </div>




            <div class="dashboard-card">

                <h3>
                    💰 System
                </h3>

                <p>
                    料金管理
                </p>

            </div>



        </div>




        <div class="dashboard-info">


            <h3>
                Fantasy CMS
            </h3>


            <p>
                店舗ホームページ管理システム
            </p>


        </div>



    `;


}