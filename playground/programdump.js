
var ts = require('../built/local/typescriptGenerator.js');

var modules = [];
var classes = [];

function typename(node, context) {
  var typeNode = node.type;

  var typeString = null;

  if (node.symbol) {
    var type = context.checker.getTypeOfSymbol(node.symbol);

    if (type && type.callSignatures && type.callSignatures.length && type.callSignatures[0].resolvedReturnType) {
      type = type.callSignatures[0].resolvedReturnType;
    }

    if (type) {
      if (type.intrinsicName) {
        typeString = type.intrinsicName;
      } else if (type.symbol && type.symbol.name) {
        typeString = type.symbol.name;
      } else if (type.symbol && type.symbol.getName) {
        typeString = type.symbol.getName();
      } else {
        typeString = '**'+type.flags+'*'+JSON.stringify(type);
      }
    }
  }

  /*
  if (!typeNode) {
    switch (node.kind) {
      case ts.SyntaxKind.GetAccessor:
        if (node.type) {
          typeNode = node.type;
        }

        break;
      case ts.SyntaxKind.SetAccessor:
        if (typeNode.type) {
          typeNode = typeNode.type;
        }
        break;
    }

  }

  if (typeNode) {
    switch (typeNode.kind) {
      case ts.SyntaxKind.TypeReference:
          if (typeNode.typeName && typeNode.typeName.text) {
            typeString = typeNode.typeName.text;
          }
        break;

      default:
        typeString = ts.tokenToString(typeNode.kind);
        break;
    }
  }
  */

  if (!typeString) {
    if (typeNode) {
      typeString = '*'+context.checker.typeToString(typeNode);
    }
  }
  if (!typeString) {
    if (typeNode) {
      typeString = '#' + ts.SyntaxKind[typeNode.kind] + '#';
    } else {
      typeString = '##' + ts.SyntaxKind[node.kind] + '##';
    }
  }

  return typeString;
  //return typeNode.typeName ? typeNode.typeName.symbol.name : null;
}

function parameterList(parameters, context) {
  var params = [], p, type;
  for (var i = 0, n = parameters.length; i < n; ++i) {
    p = parameters[i];
    type = typename(p, context);
    params.push(''+p.name.text+ (type? (':'+ type) : ''));
  }

  return params.join(',');
}

var structureDumper = function(context, n, after) {
  var descend = false;
  if (n.kind == ts.SyntaxKind.ClassDeclaration) {
    descend = true;
    if (!after) {
      var fullname = (modules.length ? (modules.join('.') + '.') : '') + n.name.text;
      classes.push(fullname);
      console.log("class "+ fullname + '   ('+context.sourcefile.filename+')');
    } else {
      classes.pop();
    }
  } else if (n.kind == ts.SyntaxKind.InterfaceDeclaration) {
    descend = true;
    if (!after) {
      var fullname = (modules.length ? (modules.join('.') + '.') : '') + n.name.text;
      classes.push(fullname);
      console.log("interface "+ fullname + '   ('+context.sourcefile.filename+')');
    } else {
      classes.pop();
    }
  } else if (n.kind == ts.SyntaxKind.ModuleDeclaration) {
    if (!after) {
      modules.push(n.name.text);
      console.log("module "+ modules[modules.length-1] + '   ('+context.sourcefile.filename+')');

      descend = true;
    } else {
      console.log("/module "+ modules[modules.length-1]);
      modules.pop();
    }
  } else if (n.kind == ts.SyntaxKind.Constructor) {
    if (!after) {
      console.log('  - constructor('+parameterList(n.parameters, context)+')');
    }
  } else if (n.kind == ts.SyntaxKind.Method) {
    if (!after) {
      console.log('  - '+ n.name.text+'('+parameterList(n.parameters, context)+')'+':'+ typename(n, context));
    }
  } else if (n.kind == ts.SyntaxKind.Property) {
    if (!after) {
      console.log('  + '+ n.name.text+':'+ typename(n, context));
    }
  } else if (n.kind == ts.SyntaxKind.GetAccessor) {
    if (!after) {
      console.log('  get '+ n.name.text+':'+ typename(n, context));
    }
  } else if (n.kind == ts.SyntaxKind.SetAccessor) {
    if (!after) {
      console.log('  set '+ n.name.text+':'+ typename(n, context));
    }
  } else if (n.kind == ts.SyntaxKind.ModuleBlock) {
    descend = true;
  } else if (n.kind == ts.SyntaxKind.TypeReference) {
    if (n.typeName && n.typeName.text) {
      console.log('    < '+n.typeName.text);
    }
  } else if (n.kind == ts.SyntaxKind.Identifier) {
    descend = false;
  } else {
    console.log('    #'+ ts.SyntaxKind[n.kind]);
  }

  return descend;
};


var importDumper = function(context, n, after) {
  if (n.kind == ts.SyntaxKind.SourceFile) {
    console.log(n.filename);
    var files = n.referencedFiles;
    for (var i = 0, n = files.length; i < n; ++i) {
      console.log('- '+files[i].filename);
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
