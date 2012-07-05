function getFileNameExtension(fileName) {
    return fileName.substring(fileName.lastIndexOf("."));
}

module.exports.onPackageStart = function(callback, config, packageFileObject) {
    var ext = getFileNameExtension(packageFileObject.path);

    packageFileObject.content += "//***MULTI-PART";

    callback();
};

module.exports.onFileStart = function(callback, config, packageFileObject) {
	packageFileObject.content += "\n//kj0U8ZfQ5x";
	packageFileObject.content += "\n//LOGICAL-PATH:" + packageFileObject.currentFile.path;
	packageFileObject.content += "\n//kj0U8ZfQ5x\n";
    callback();
};