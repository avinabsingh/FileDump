
const fs = require("fs").promises
const path = require("path")


async function addRepo(filePath){

    const repoPath = path.resolve(process.cwd(),".FileDump");
    const staggingPath = path.join(repoPath,"stagging");


    try{

        await fs.mkdir(staggingPath, {recursive : true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(staggingPath, fileName));
        console.log(`File ${fileName} added to the stagging area`);
        
    }catch(err){
        console.log("Error in adding the file to the stagging area");
    }
    
    // console.log("File added");
}

module.exports  = {addRepo};