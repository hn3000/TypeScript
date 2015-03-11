///<reference path="./typings/node/node.d.ts"/>
///<reference path="./typescriptGenerator.d.ts"/>
///<reference path="./template.ts"/>

module x {

    var ts = require('./typescriptGenerator.js');
    var tt = require('./template.js');

    function descend(node:ts.Node) {
        return true;
    }

    interface INodePrinter {
        (n:ts.Node, isAfter?:boolean):boolean;
    }

    function template(s:string):INodePrinter {
        var tf = tt.template(s);

        return function(n:ts.Node, a?:boolean) {
            this.print(tf.call(this, n));
            return false;
        }
    }

    function surround(before:string, after:string, indent:boolean=true):INodePrinter {
        var bf = tt.template(before);
        var af = tt.template(after);
        return function(n:ts.Node, isAfter:boolean) {
            if (!isAfter && indent) {
                this.incIndent(1);
            }
            this.print(!isAfter ? bf.call(this, n) : af.call(this, n));
            if (isAfter && indent) {
                this.incIndent(-1);
            }
            return true;
        }
    }

    class Dumper implements tsgen.INodeWalker {
        private _buffer:string = null;

        print(s:string) {
            if (null != this._buffer) {
                this._buffer += s;
            } else {
                console.log(this.indent()+s);
            }
        }

    [k:string]:any;
        visit(n:ts.Node):string {
            var k = this.kind(n);
            var m = this[k];
            if (null != m) {
                this._buffer = '';
                m.call(this, n);
                var buffer = this._buffer;
                this._buffer = null;
                return buffer;
            } else {
                this.print('/* unknown node '+n.kind+' */');
            }
            return '##';
        }

        private _indent:string='';
        incIndent(x:number) {
            while (x > 0) { --x; this._indent += '  '; }
            while (x < 0) { ++x; this._indent = this._indent.substr(0, this._indent.length - 2); }
        }
        indent() { return this._indent; }

        kind(n:ts.Node) {
            return ts.getNodeKind(n);
        }

        SourceFile = surround("/* ${this.kind(x)} ${x.filename}*/", "/* /${this.kind(x)}*/", false);
        ModuleDeclaration = surround('/* module $(x.name) */','/* /module $(x.name) */', false);

        ClassDeclaration = surround('class $(x.name) {', '}', true);
        Identifier = template('${x.text}');

        default = surround("/* ${this.kind(x)} */", "/* /${this.kind(x)} */");

    }

    var dumper = new Dumper();

    var files = ['Geometry.ts'];

    if (process.argv.length > 2) {
        files = process.argv.slice(2);
    }

    ts.walkProgramNodes(files, dumper);

}
