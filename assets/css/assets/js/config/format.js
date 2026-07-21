/* ==========================================
   Format
========================================== */

export function formatDate(date){

    return new Intl.DateTimeFormat(

        "ja-JP"

    ).format(new Date(date));

}