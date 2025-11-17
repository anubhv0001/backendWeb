const path=require("path");
function getFileInfo(filepath){
    return {
        fileName:path.basename(filepath),
        extension:path.extname(filepath),
         directory: path.dirname(filePath)
    }
}

module.exports = getFileInfo;