import  multer from 'multer';
export const filetype={
    image:['image/png','image/jpeg','image/gif','image/webp'],
    pdf:['application/pdf']
};
function fileupload(customTypes=[]){
    const storage = multer.diskStorage({});
    function fileFilter(req,file,cb){
        if(customTypes.includes(file.mimetype)){
            cb(null,true);

        }
        else{
            cb("invalid format",false);
        }
    }
    const upload=multer({fileFilter,storage});
    return upload;
}

export default fileupload;