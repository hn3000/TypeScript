
///<reference path="../compiler/types.ts" />
///<reference path="./compilerTypes.ts" />
///<reference path="./generator.ts" />

module tsgen {


    export interface INodeHandler {
      (n:ts.Node, after:boolean, context:any):boolean;
    }

    export interface INodeWalker {
        Unknown?: INodeHandler;
        EndOfFileToken?: INodeHandler;
        SingleLineCommentTrivia?: INodeHandler;
        MultiLineCommentTrivia?: INodeHandler;
        NewLineTrivia?: INodeHandler;
        WhitespaceTrivia?: INodeHandler;
        // Literals
        NumericLiteral?: INodeHandler;
        StringLiteral?: INodeHandler;
        RegularExpressionLiteral?: INodeHandler;
        NoSubstitutionTemplateLiteral?: INodeHandler;
        // Pseudo-literals
        TemplateHead?: INodeHandler;
        TemplateMiddle?: INodeHandler;
        TemplateTail?: INodeHandler;
        // Punctuation
        OpenBraceToken?: INodeHandler;
        CloseBraceToken?: INodeHandler;
        OpenParenToken?: INodeHandler;
        CloseParenToken?: INodeHandler;
        OpenBracketToken?: INodeHandler;
        CloseBracketToken?: INodeHandler;
        DotToken?: INodeHandler;
        DotDotDotToken?: INodeHandler;
        SemicolonToken?: INodeHandler;
        CommaToken?: INodeHandler;
        LessThanToken?: INodeHandler;
        GreaterThanToken?: INodeHandler;
        LessThanEqualsToken?: INodeHandler;
        GreaterThanEqualsToken?: INodeHandler;
        EqualsEqualsToken?: INodeHandler;
        ExclamationEqualsToken?: INodeHandler;
        EqualsEqualsEqualsToken?: INodeHandler;
        ExclamationEqualsEqualsToken?: INodeHandler;
        EqualsGreaterThanToken?: INodeHandler;
        PlusToken?: INodeHandler;
        MinusToken?: INodeHandler;
        AsteriskToken?: INodeHandler;
        SlashToken?: INodeHandler;
        PercentToken?: INodeHandler;
        PlusPlusToken?: INodeHandler;
        MinusMinusToken?: INodeHandler;
        LessThanLessThanToken?: INodeHandler;
        GreaterThanGreaterThanToken?: INodeHandler;
        GreaterThanGreaterThanGreaterThanToken?: INodeHandler;
        AmpersandToken?: INodeHandler;
        BarToken?: INodeHandler;
        CaretToken?: INodeHandler;
        ExclamationToken?: INodeHandler;
        TildeToken?: INodeHandler;
        AmpersandAmpersandToken?: INodeHandler;
        BarBarToken?: INodeHandler;
        QuestionToken?: INodeHandler;
        ColonToken?: INodeHandler;
        // Assignments
        EqualsToken?: INodeHandler;
        PlusEqualsToken?: INodeHandler;
        MinusEqualsToken?: INodeHandler;
        AsteriskEqualsToken?: INodeHandler;
        SlashEqualsToken?: INodeHandler;
        PercentEqualsToken?: INodeHandler;
        LessThanLessThanEqualsToken?: INodeHandler;
        GreaterThanGreaterThanEqualsToken?: INodeHandler;
        GreaterThanGreaterThanGreaterThanEqualsToken?: INodeHandler;
        AmpersandEqualsToken?: INodeHandler;
        BarEqualsToken?: INodeHandler;
        CaretEqualsToken?: INodeHandler;
        // Identifiers
        Identifier?: INodeHandler;
        // Reserved words
        BreakKeyword?: INodeHandler;
        CaseKeyword?: INodeHandler;
        CatchKeyword?: INodeHandler;
        ClassKeyword?: INodeHandler;
        ConstKeyword?: INodeHandler;
        ContinueKeyword?: INodeHandler;
        DebuggerKeyword?: INodeHandler;
        DefaultKeyword?: INodeHandler;
        DeleteKeyword?: INodeHandler;
        DoKeyword?: INodeHandler;
        ElseKeyword?: INodeHandler;
        EnumKeyword?: INodeHandler;
        ExportKeyword?: INodeHandler;
        ExtendsKeyword?: INodeHandler;
        FalseKeyword?: INodeHandler;
        FinallyKeyword?: INodeHandler;
        ForKeyword?: INodeHandler;
        FunctionKeyword?: INodeHandler;
        IfKeyword?: INodeHandler;
        ImportKeyword?: INodeHandler;
        InKeyword?: INodeHandler;
        InstanceOfKeyword?: INodeHandler;
        NewKeyword?: INodeHandler;
        NullKeyword?: INodeHandler;
        ReturnKeyword?: INodeHandler;
        SuperKeyword?: INodeHandler;
        SwitchKeyword?: INodeHandler;
        ThisKeyword?: INodeHandler;
        ThrowKeyword?: INodeHandler;
        TrueKeyword?: INodeHandler;
        TryKeyword?: INodeHandler;
        TypeOfKeyword?: INodeHandler;
        VarKeyword?: INodeHandler;
        VoidKeyword?: INodeHandler;
        WhileKeyword?: INodeHandler;
        WithKeyword?: INodeHandler;
        // Strict mode reserved words
        ImplementsKeyword?: INodeHandler;
        InterfaceKeyword?: INodeHandler;
        LetKeyword?: INodeHandler;
        PackageKeyword?: INodeHandler;
        PrivateKeyword?: INodeHandler;
        ProtectedKeyword?: INodeHandler;
        PublicKeyword?: INodeHandler;
        StaticKeyword?: INodeHandler;
        YieldKeyword?: INodeHandler;
        // TypeScript keywords
        AnyKeyword?: INodeHandler;
        BooleanKeyword?: INodeHandler;
        ConstructorKeyword?: INodeHandler;
        DeclareKeyword?: INodeHandler;
        GetKeyword?: INodeHandler;
        ModuleKeyword?: INodeHandler;
        RequireKeyword?: INodeHandler;
        NumberKeyword?: INodeHandler;
        SetKeyword?: INodeHandler;
        StringKeyword?: INodeHandler;
        TypeKeyword?: INodeHandler;
        // Parse tree nodes
        Missing?: INodeHandler;
        // Names
        QualifiedName?: INodeHandler;
        // Signature elements
        TypeParameter?: INodeHandler;
        Parameter?: INodeHandler;
        // TypeMember
        Property?: INodeHandler;
        Method?: INodeHandler;
        Constructor?: INodeHandler;
        GetAccessor?: INodeHandler;
        SetAccessor?: INodeHandler;
        CallSignature?: INodeHandler;
        ConstructSignature?: INodeHandler;
        IndexSignature?: INodeHandler;
        // Type
        TypeReference?: INodeHandler;
        FunctionType?: INodeHandler;
        ConstructorType?: INodeHandler;
        TypeQuery?: INodeHandler;
        TypeLiteral?: INodeHandler;
        ArrayType?: INodeHandler;
        TupleType?: INodeHandler;
        UnionType?: INodeHandler;
        ParenType?: INodeHandler;
        // Expression
        ArrayLiteral?: INodeHandler;
        ObjectLiteral?: INodeHandler;
        PropertyAssignment?: INodeHandler;
        ShorthandPropertyAssignment?: INodeHandler;
        PropertyAccess?: INodeHandler;
        IndexedAccess?: INodeHandler;
        CallExpression?: INodeHandler;
        NewExpression?: INodeHandler;
        TaggedTemplateExpression?: INodeHandler;
        TypeAssertion?: INodeHandler;
        ParenExpression?: INodeHandler;
        FunctionExpression?: INodeHandler;
        ArrowFunction?: INodeHandler;
        PrefixOperator?: INodeHandler;
        PostfixOperator?: INodeHandler;
        BinaryExpression?: INodeHandler;
        ConditionalExpression?: INodeHandler;
        TemplateExpression?: INodeHandler;
        TemplateSpan?: INodeHandler;
        OmittedExpression?: INodeHandler;
        // Element
        Block?: INodeHandler;
        VariableStatement?: INodeHandler;
        EmptyStatement?: INodeHandler;
        ExpressionStatement?: INodeHandler;
        IfStatement?: INodeHandler;
        DoStatement?: INodeHandler;
        WhileStatement?: INodeHandler;
        ForStatement?: INodeHandler;
        ForInStatement?: INodeHandler;
        ContinueStatement?: INodeHandler;
        BreakStatement?: INodeHandler;
        ReturnStatement?: INodeHandler;
        WithStatement?: INodeHandler;
        SwitchStatement?: INodeHandler;
        CaseClause?: INodeHandler;
        DefaultClause?: INodeHandler;
        LabeledStatement?: INodeHandler;
        ThrowStatement?: INodeHandler;
        TryStatement?: INodeHandler;
        TryBlock?: INodeHandler;
        CatchBlock?: INodeHandler;
        FinallyBlock?: INodeHandler;
        DebuggerStatement?: INodeHandler;
        VariableDeclaration?: INodeHandler;
        FunctionDeclaration?: INodeHandler;
        FunctionBlock?: INodeHandler;
        ClassDeclaration?: INodeHandler;
        InterfaceDeclaration?: INodeHandler;
        TypeAliasDeclaration?: INodeHandler;
        EnumDeclaration?: INodeHandler;
        ModuleDeclaration?: INodeHandler;
        ModuleBlock?: INodeHandler;
        ImportDeclaration?: INodeHandler;
        ExportAssignment?: INodeHandler;
        // Enum
        EnumMember?: INodeHandler;
        // Top-level nodes
        SourceFile?: INodeHandler;
        Program?: INodeHandler;
        // Synthesized list
        SyntaxList?: INodeHandler;
        // Enum value count
        Count?: INodeHandler;

        default?: INodeHandler;
	operator?: INodeHandler;
	binaryOperator?: INodeHandler;
    }


    export function getNodeKind(n:ts.Node):string {
        return tsgen.SyntaxKind[n.kind];
    }

    interface IGenericWalker {
        [k:string]:tsgen.INodeHandler;
	default:tsgen.INodeHandler;
	binaryOperator:tsgen.INodeHandler;
    }

    export function walkProgram(filenames:string[], nodeHandler:(context: any, node: any, after: boolean) => boolean) {
        ts.walkProgram(filenames, (c,n,a) => nodeHandler(c,n,a));
    }

    export function walkProgramNodes(filenames:string[], nodeWalker:tsgen.INodeWalker) {

    	var walker:IGenericWalker = <IGenericWalker>nodeWalker;
	var sk = tsgen.SyntaxKind;

	for (var i = 0; i < sk.Count; ++i) {
	  var k = sk[i];
	  if (null == walker[k]) {
	    if (i >= sk.FirstBinaryOperator && i <= sk.LastBinaryOperator) {
	      walker[k] = walker.binaryOperator || walker.default;
	    } else {
              walker[k] = walker.default;
	    }
	  }
	}
        ts.walkProgram(filenames, (context, node, after)=>walker[sk[node.kind]](node, after, context));
    }


    interface IGenericVisitor {
      [k:string]: (n:ts.Node)=>void;
    }

    class NodeVisitor {
      walk(n:ts.Node):boolean {
        this.visit(n);
	return false;
      }
      visit(n:ts.Node) {
        var k = getNodeKind(n);
	var m = (<IGenericVisitor><any>this)[k];
	if (m) m.call(this,n);

      }
    }
}

/** for node.js: */
declare var module: {
	exports: any;
        require(id: string): any;
	id: string;
	filename: string;
	loaded: boolean;
	parent: any;
	children: any[];
};

(module).exports = tsgen;
