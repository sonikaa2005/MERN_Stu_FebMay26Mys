//File upload using Multer: with file type , file size restrictions.
// Uploading files using Multer (dest and diskStorage approaches)

//using express
const express = require("express");
const multer = require("multer");

async function main() {
    try {
        const app = express();

        const fileFilter = (req,file,callback) => {//restrict the files
            if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
                callback(null, true);
            }
            else {
                callback(new Error("Only PNG and JGEG images are allowed."), false);
            }
        };

        // Approach 1: using dest:
        const uploadWithDest = multer({
            dest: "uploads/",
            limits: { fileSize: 1024 * 1024 * 2 }, //2MB
            fileFilter
        });

        app.post("/upload-dest",uploadWithDest.single("file"),(req,res)=>{
            res.send({
                message: "Uploaded using dest approach",
                note: "Filename is random, no extention preserved",
                file:req.file
            });
        });

        //Approach 2: using diskStorage:
        const storage = multer.diskStorage({
            //Where to store the file?
            destination: (req,res,callback) => {
                callback(null, "uploads/");
            },
            //How to name the file
            filename:(req,file,callback) => {
                callback(null, Date.now() + "-"+file.originalname);
            }
        });
        const uploadWithDisk= multer({
            storage,
            limits:{fileSize: 1024*1024*2}, //2mb
            fileFilter
        });
        app.post("/upload-disk",uploadWithDisk.single("file"),(req,res)=>{
            res.send({
                message: "Uploaded using diskStorage approach",
                note: "Filename is controlled and extension is preserved",
                file:req.file
            });
        });

        app.listen(3000,()=>{
            console.log("Server started on port http://localhost:3000");
            console.log("POST /upload-dest");
        });
    }
    catch (error) {
        console.log("Error:",error.message);
    }
}
main();