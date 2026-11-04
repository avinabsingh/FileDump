
const fs = require('fs').promises;
const path = require('path')
const {v4 : uuidv4} = require("uuid")

async function commitRepo(message){

    // console.log("File commited");
    const repoPath = path.resolve(process.cwd(),".FileDump");
    const staggedPath = path.join(repoPath,"stagging");
    const commitPath = path.join(repoPath,"commits");


    try{

        const commitID = uuidv4();
        const commitDir = path.join(commitPath,commitID);
        await fs.mkdir(commitDir, {recursive : true});

        const files =  await fs.readdir(staggedPath);
        for(const file of files){
            await fs.copyFile(
                path.join(staggedPath,file),
                path.join(commitDir,file)
            );
        }

        await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({
            message,
            date:new Date().toISOString()
        }));

        console.log(`Commit done with the commit Id ${commitID}`)

    }catch(err){
        console.log("Error in commiting the files",err);
    }

}

module.exports = {commitRepo}