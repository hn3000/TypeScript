
/// <reference path="../compiler/types.ts"/>
/// <reference path="../compiler/core.ts"/>
/// <reference path="../compiler/scanner.ts"/>
/// <reference path="../compiler/parser.ts"/>
/// <reference path="../compiler/checker.ts"/>
/// <reference path="../compiler/program.ts"/>

/// <reference path="../compiler/sys.ts"/>

module ts {

    function __createCompilerHost(options: CompilerOptions): CompilerHost {
        var currentDirectory: string;
        var existingDirectories: Map<boolean> = {};

        function getSourceFile(filename: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
            try {
                var text = sys.readFile(filename, options.charset);
            }
            catch (e) {
                if (onError) {
                    onError(e.message);
                }
                text = "";
            }
            return text !== undefined ? createSourceFile(filename, text, languageVersion) : undefined;
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark:boolean, onError?: (message: string) => void) {
            // not interested in writing files here
            /*
            function directoryExists(directoryPath: string): boolean {
                if (hasProperty(existingDirectories, directoryPath)) {
                    return true;
                }
                if (sys.directoryExists(directoryPath)) {
                    existingDirectories[directoryPath] = true;
                    return true;
                }
                return false;
            }

            function ensureDirectoriesExist(directoryPath: string) {
                if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
                    var parentDirectory = getDirectoryPath(directoryPath);
                    ensureDirectoriesExist(parentDirectory);
                    sys.createDirectory(directoryPath);
                }
            }

            try {
                ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));
                sys.writeFile(fileName, data);
            }
            catch (e) {
                if (onError) onError(e.message);
            }
            */
        }

        function getCanonicalFileName(fileName: string): string {
            // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
            // otherwise use toLowerCase as a canonical form.
            return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }

        return {
            getSourceFile: getSourceFile,
	    getDefaultLibFileName: (compilerOptions:CompilerOptions) => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), "lib.d.ts"),
            writeFile: writeFile,
            getCurrentDirectory: () => currentDirectory || (currentDirectory = sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName: getCanonicalFileName,
            getNewLine: () => sys.newLine
        };
    }

    export function getDefaultCompilerOptions(): CompilerOptions {
        // Set "ES5" target by default for this service
        return {
            target: ScriptTarget.ES5,
            module: ModuleKind.None
        };
    }

    function reportDiagnostic(diagnostic: Diagnostic) {
        var output = "";

        if (diagnostic.file) {
	    var loc = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);

            output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
	}

        var category = DiagnosticCategory[diagnostic.category].toLowerCase();
	output += `${ category } TS${ diagnostic.code }: ${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }${ sys.newLine }`;

        sys.write(output);
    }

    function reportDiagnostics(diagnostics: Diagnostic[]) {
        for (var i = 0; i < diagnostics.length; i++) {
            reportDiagnostic(diagnostics[i]);
        }
    }

    export interface WalkerContext {
        sourcefile: SourceFile;
        checker: TypeChecker;
    }

    export function walkProgram(filenames:string[], nodeWalker:(context:WalkerContext, node:Node, after:boolean) => boolean) {
        var options = getDefaultCompilerOptions(),
            host = createCompilerHost(options),
            program = createProgram(filenames, options, host);

        // First get any syntactic errors.
        var diagnostics = program.getSyntacticDiagnostics();
        reportDiagnostics(diagnostics);

        // If we didn't have any syntactic errors, then also try getting the global and
        // semantic errors.
        if (diagnostics.length === 0) {
            var diagnostics = program.getGlobalDiagnostics();
            reportDiagnostics(diagnostics);

            if (diagnostics.length === 0) {
                var diagnostics = program.getSemanticDiagnostics();
                reportDiagnostics(diagnostics);
            }
        }

        var emitResult = program.emit(),
            emitErrors = emitResult.diagnostics,
            checker = program.getTypeChecker(),
            sourceFiles = program.getSourceFiles(),
            walker = function(context:WalkerContext, node:Node) {
                var descend = nodeWalker(context, node, false);
                if (descend) {
                    forEachChild(node, walker.bind(null, context));
                    nodeWalker(context, node, true);
                }
                return false;
            };

        if (emitErrors && emitErrors.length) {
            reportDiagnostics(emitErrors);
        }

        for (var i = 0, n = sourceFiles.length; i < n; ++i) {
            var thisOne = sourceFiles[i];
            if (-1 == thisOne.fileName.indexOf('.d.ts')) {
                var context = {
                    sourcefile: thisOne,
                    checker: checker
                };

                walker(context, thisOne);
            }
        }
    }

}
