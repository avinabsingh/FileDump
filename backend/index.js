const yargs = require('yargs')
const {hideBin} = require('yargs/helpers')

const {initRepo} = require("./controllers/init")

const {addRepo} = require("./controllers/add")

const {pushRepo} = require("./controllers/push")

const {pullRepo} = require("./controllers/pull")

const {commitRepo} = require("./controllers/commit")

const {revertRepo} = require("./controllers/revert")

yargs(hideBin(process.argv))
.command('init',"Initialise a new repository",{},initRepo)
.command('add <file>',"Add a file to the repository",
    (yargs) => {
        yargs.positional(
            "file",{
                describe : "File to be added to the stagging area",
                type : "string"
            }
        );
    },
    (argv)=>{
        addRepo(argv.file)
    }
)
.command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
        yargs.positional("message",{
            describe : "Commit message",
            type : "string"  
        });
    },
    (argv) => {
        commitRepo(argv.message)
    }
)
.command(
    "push",
    "Push commits to the S3 Bucket",
    {},
    pushRepo
)
.command(
    "pull",
    "Pull the commits from the S3 Bucket",
    {},
    pullRepo
)
.command(
    "revertID",
    "Revert to a specific commit",
    (yargs) => {
        yargs.positional("commitID",{
            describe : "revert message",
            type : "string"
        });
    },
    revertRepo
)
.demandCommand(1,"You need at least one command")
.help().argv;