export function openUpload(callback){

    cloudinary.openUploadWidget(

        {

            cloudName: "pr4dm1pw",

            uploadPreset: "fantasy_gallery",

            sources: [

                "local",

                "camera"

            ],

            multiple:false

        },

        (error,result)=>{

            if(error){

                console.error(error);

                return;

            }

            if(
                result &&
                result.event==="success"
            ){

                callback(result.info.secure_url);

            }

        }

    );

}