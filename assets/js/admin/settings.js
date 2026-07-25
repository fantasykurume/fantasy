/* ==========================================
   Fantasy CMS
   Settings
========================================== */

import { CONFIG } from "../config/config.js";
import { adminGet } from "./api.js";
import { openModal, closeModal } from "./modal.js";
import { adminPost } from "./api.js";

export async function initSettings(user){

    document.querySelector(".content").innerHTML=`

    <h2>Settings</h2>

    <div class="tabMenu">

        ${
            user.role==="owner" || user.role==="admin"
            ?
            `<button class="tab active" data-tab="admins">管理者</button>`
            :""
        }

        <button class="tab ${user.role==="staff"?"active":""}" data-tab="account">
            アカウント
        </button>

        ${
            user.role==="owner" || user.role==="admin"
            ?
            `
            <button class="tab" data-tab="system">
                システム
            </button>

            <button class="tab" data-tab="seo">
                SEO
            </button>
            `
            :""
        }

    </div>

    ${
        user.role==="owner" || user.role==="admin"
        ?
        `
        <div class="tabContent active" id="admins">

            <div class="toolbar">

                <button
                    id="addAdminBtn"
                    class="primary">
                    ＋ 管理者追加
                </button>

            </div>

            <div id="adminList">
                読み込み中...
            </div>

        </div>
        `
        :""
    }

    <div
        class="tabContent ${user.role==="staff"?"active":""}"
        id="account">

        <div class="admin-card">

            <h3>パスワード変更</h3>

            <div class="form-group">
                <label>現在のパスワード</label>
                <input
                    type="password"
                    id="currentPassword">
            </div>

            <div class="form-group">
                <label>新しいパスワード</label>
                <input
                    type="password"
                    id="newPassword">
            </div>

            <div class="form-group">
                <label>確認</label>
                <input
                    type="password"
                    id="confirmPassword">
            </div>

            <button
                id="changePasswordBtn"
                class="primary">
                パスワード変更
            </button>

        </div>

    </div>

    ${
        user.role==="owner" || user.role==="admin"
        ?
        `
        <div class="tabContent" id="system">

            <div class="admin-card">

                <h3>システム情報</h3>

                <table class="admin-table">

                    <tr>
                        <th>項目</th>
                        <th>状態</th>
                    </tr>

                    <tr>
                        <td>Fantasy CMS</td>
                        <td>${CONFIG.VERSION}</td>
                    </tr>

                    <tr>
                        <td>Worker</td>
                        <td id="workerStatus">確認中...</td>
                    </tr>

                    <tr>
                        <td>GAS</td>
                        <td id="gasStatus">確認中...</td>
                    </tr>

                    <tr>
                        <td>Cloudinary</td>
                        <td>接続済み</td>
                    </tr>

                </table>

            </div>

        </div>

        <div class="tabContent" id="seo">

            <div class="admin-card">

                <h3>SEO</h3>

                <p>準備中</p>

            </div>

        </div>
        `
        :""
    }

    `;

    initTabs();

    if(user.role==="owner" || user.role==="admin"){
        loadAdmins();
        checkSystem();
    }

    document
        .querySelector("#changePasswordBtn")
        .addEventListener("click",changePassword);

}

/* ==========================================
   タブ切替
========================================== */

function initTabs(){

    document
        .querySelectorAll(".tab")
        .forEach(button=>{

            button.onclick=()=>{

                document
                    .querySelectorAll(".tab")
                    .forEach(tab=>tab.classList.remove("active"));

                document
                    .querySelectorAll(".tabContent")
                    .forEach(tab=>tab.classList.remove("active"));

                button.classList.add("active");

                document
                    .getElementById(button.dataset.tab)
                    .classList.add("active");

            };

        });

}

/* ==========================================
   管理者一覧
========================================== */

async function loadAdmins(){

    const area=document.querySelector("#adminList");

    area.innerHTML="読込み中...";

    try{

        const result=await adminGet("admins");

        if(!result.success){

            area.innerHTML=result.message;
            return;

        }

        let html=`

        <table class="admin-table">

            <tr>
                <th>名前</th>
                <th>ID</th>
                <th>権限</th>
                <th>状態</th>
                <th>操作</th>
            </tr>

        `;

        result.admins.forEach(admin=>{

            html+=`

            <tr>

                <td>${admin.name}</td>

                <td>${admin.username}</td>

                <td>${admin.role}</td>

                <td>${admin.status}</td>

                <td>

                    <button
                        class="editAdmin"
                        data-id="${admin.id}">
                        編集
                    </button>

                </td>

            </tr>

            `;

        });

        html+=`</table>`;

        area.innerHTML=html;

    }catch(e){

        area.innerHTML="取得できませんでした。";

    }

}

/* ==========================================
   システム確認
========================================== */

function checkSystem(){

    document.querySelector("#workerStatus").textContent="OK";
    document.querySelector("#gasStatus").textContent="OK";

}

/* ==========================================
   パスワード変更
========================================== */

function changePassword(){

    alert("実装予定");

}
