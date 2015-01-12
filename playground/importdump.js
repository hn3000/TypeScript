
var ts = require('../built/local/typescriptGenerator.js');

var modules = [];
var classes = [];


var imports = { };

/*
 interface importDetails
 {
 name: string;
 imports: importDetails[];
 importers: importDetails[];
 }
 */

function addToSet(array, item) {
  if (-1 == array.indexOf(item)) {
    array.push(item);
  }
}

function getImportDetails(name) {
  var result = imports[name];
  if (null == result) {
    result = {
      name: name,
      imports: [],
      importers: []
    };

    result.addImport = function(i) {
      addToSet(result.imports, i);
    }
    result.addImporter = function(i) {
      addToSet(result.importers, i);
    }
    imports[name] = result;
  }
  return result;
}


function filepath(filename, contextPath) {
  var sfn = filename.split('/');
  if (sfn[0] == '' || null == contextPath) {
    return filename;
  }
  var sc = contextPath.split('/');
  var sfp = sc.slice(0, sc.length-1).concat(sfn);
  var i = 1;
  var n = sfp.length;
  do {
    if (sfp[i] == '.') {
      sfp.splice(i,1);
      n-=1;
    } else if(sfp[i] == '..') {
      sfp.splice(i-1,2);
      n-=2;
    } else {
      ++i;
    }
  } while (i < n);

  return sfp.join('/');
}

var importDumper = function(context, node, after) {
  if (node.kind == ts.SyntaxKind.SourceFile) {
    console.log(node.filename);
    var importDetails = getImportDetails(node.filename);

    var files = node.referencedFiles;
    for (var i = 0, len = files.length; i < len; ++i) {
      var fn = filepath(files[i].filename, node.filename);
      console.log('- '+fn);
      var importedFile = getImportDetails(fn);
      importedFile.addImporter(importDetails);
      importDetails.addImport(importedFile);
    }
  }
  return false;
};


var files = ['Geometry.ts'];

if (process.argv.length > 2) {
  files = process.argv.slice(2);
}

//ts.walkProgram(files, structureDumper);

ts.walkProgram(files, importDumper);


//console.log(JSON.stringify(imports));

var INDENT = '                                                                                                                         ';

function printImports(importDetails, levelArg, previousArg) {
  var level = levelArg || 0;
  var previous = previousArg || [];

  var prefix = INDENT.substring(0, level * 4);

  if (-1 != previous.indexOf(importDetails) || importDetails.incycle) {
    console.log(prefix + '-> ' + importDetails.name);
    importDetails.incycle = true;
  } else {
    if (level < 2) {
      console.log(prefix + '-------------');
    }
    console.log(prefix + importDetails.name);

    var imports = importDetails.imports;
    for (var i = 0, n = imports.length; i < n; ++i) {
      var thisOne = imports[i];
      printImports(thisOne, level + 1, previous.concat([importDetails]));
    }
  }
}

(function() {
    console.log("----- import tree");
    for (var k in imports) {
	var thisOne = imports[k];
	
	if (thisOne.importers.length == 0) {
	    printImports(thisOne);
	}
    }
})();
