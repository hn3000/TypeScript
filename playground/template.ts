
module template {
  var visitRE = /\$\(([^)]*?)\)/;
  var exprRE = /\$\{([^}]*?)\}/;
  //var loopRE = /\$\[([^}]*?)\]\{(.*?)\}/;

  export interface IStringFun extends Function {
    (x:any, y?:any):string;
  }

  export function funcify(s:string):IStringFun {
    return <IStringFun>(function() { return s; });
  }
  export function evalify(e:string, a?:string):IStringFun {
    return <IStringFun>new Function(a || 'x','return ('+e+');');
  }
  export function visitify(e:string, a?:string):IStringFun {
    return <IStringFun>new Function(a || 'x','return this.visit('+e+');');
  }
  export function loopify(c:string, e:string) {
    var cf = evalify(c);
    var ef = evalify(e, 'x,i');
    return function(x:any) {
      var result:string[] = [];
      var cc = cf.apply(this,x);
      for (var i = 0, n = cc.length; i < n; ++i) {
        result.push(ef.call(this, cc[i], i));
      }
      return result.join('');
    };
  }

  export function template(s:string) : (x:any)=>string {
    var re = new RegExp([visitRE.source, exprRE.source, /*loopRE.source,*/ '$'].join('|'), 'g');
    var last=0, result:IStringFun[]=[];
    do {
      var m = re.exec(s);
      if (m) {
        if (last != m.index) {
          result.push(funcify(s.substring(last,m.index)));
        }
        if (m[1] && m[1].length) {
          result.push(visitify(m[1]));
        } else if (m[2] && m[2].length) {
          result.push(evalify(m[2]));
        } else if (m[3] && m[3].length) {
          result.push(loopify(m[3], m[4]));
        }
        last = m.index + m[0].length;
      }
    } while (m && m[0]);

    return function(x) {
      var xx = result.map((f)=>f.call(this,x));
      return xx.join('');
    };
  }
}

// declare module so we can be used with require in node
declare var module: {
  exports: any;
  require(id: string): any;
  id: string;
  filename: string;
  loaded: boolean;
  parent: any;
  children: any[];
};

if (module) module.exports = template;
