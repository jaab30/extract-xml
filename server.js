const util = require('util');
const decompress = require('decompress');
const decompressTargz = require('decompress-targz');
const csv = require('csvtojson');

// This example will extract the files from the LSR tar.gz file 
// and save inside a folder called "/assets/extracted"
const extractTar = async () => {
    try {
        await decompress('./assets/comp-files/EFUS-LSR-INC-A.tar.gz', './assets/extracted', { plugins: [decompressTargz()]});
        console.log('Files decompressed');
    } catch(err) {
        console.log(err);
    }
}
// extractTar();

// This example will extract the files from the LSR tar.gz file 
// and save inside a folder called "/assets/extracted"
// read folder inside extracted and convert csv files to JSON
// console log JSON
const extractTarAndConvertCsv = async() => {
    try {
        // Decompress tar.gz file
        await decompress('./assets/comp-files/EFUS-LSR-INC-A.tar.gz', './assets/extracted', { plugins: [decompressTargz()]});
        // Read name for new folder containing CSV files
        const newFolderName = fs.readdirSync('./assets/extracted');
        // Get names of CSV files
        const files = fs.readdirSync('./assets/extracted/' + newFolderName);
        // Loop and convert csv to json
        files.forEach(file => {
            csv()
                .fromFile('./assets/extracted/' + newFolderName + '/' + file)
                .then((jsonObj)=>{
                    // console log json from each file
                    console.log(jsonObj);
                })
          });

    } catch(err) {
        console.log(err);
    }
}
// extractTarAndConvertCsv();

// This example will extract the .gz file
// Read it's content
// Convert to JSON
const fs = require('fs');
const path = require('path');
const gunzip = require('gunzip-file')
const parser = require('xml2json');
var xml2js = require('xml2js');

const compFolder = path.join(__dirname, 'assets/comp-files/');
const decompFolder = path.join(__dirname, 'assets/decomp-files/');
const gzip = util.promisify(gunzip)

const extractAndConvertA = async (fileName) => {
    try {
        // extract .gz file
        await gzip(compFolder + fileName, decompFolder + 'extract.xml')
        // Read converted File
        const data = fs.readFileSync(decompFolder + 'extract.xml')
        // Convert xml to JSON
        console.log('converting to JSON...');
        var json = parser.toJson(data, {object: true});
        // Console log content
        console.log(util.inspect(json, false, null))
        // console.log(JSON.stringify(json, null, 2));

    } catch(err) {
        console.log(err);
    }
}
   
// extractAndConvertA('EFUS-RelNotes-A.xml.gz');
// This one take a bit longer since it is a big file
// extractAndConvertA('EFUS-INC-A.xml.gz');



//******** USING ANOTHER PACKAGE "xml2js" TO CONVERT TO JSON */

const extractAndConvertB = async (fileName) => {
    try {
        // extract .gz file
        await gzip(compFolder + fileName, decompFolder + 'extract.xml')
        // Read converted File
        const data = fs.readFileSync(decompFolder + 'extract.xml')
        // Convert xml to JSON
        console.log('converting to JSON...');
        let parser = new xml2js.Parser(/* options */);
        let result = await parser.parseStringPromise(data)
        // Console log content
        console.log(util.inspect(result, false, null))
        // console.dir(result);
        // console.log(JSON.stringify(result, null, 2));
    } catch(err) {
        console.log(err);
    }
}
// extractAndConvertB('EFUS-RelNotes-A.xml.gz');
// extractAndConvertB('EFUS-INC-A.xml.gz');


// Run Bash scripts using NodeJs built-in module "child_process"
const { exec } = require('child_process');

const runShellScript = () => {
    // execute command to run .sh file
    const myShellScript = exec('sh scripts/start.sh');
    
    myShellScript.stdout.on('data', (data)=>{
        console.log(data); 
    });
    myShellScript.stderr.on('data', (data)=>{
        console.error(data);
    });
    myShellScript.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });
}

runShellScript();
