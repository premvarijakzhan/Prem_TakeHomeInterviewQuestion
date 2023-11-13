"use strict";
/**
 * This script processes a given string of TypeScript code to find and format
 * template literals marked with a 'tsx' comment. It uses Babel to parse the
 * code into an Abstract Syntax Tree (AST), traverses the AST to locate
 * template literals, formats them using Prettier, and then reconstructs
 * the original code string with these formatted literals.
 *
 * The script demonstrates an example usage with a sample code string
 * containing a template literal. It showcases asynchronous operations, AST
 * manipulation, and string formatting techniques in TypeScript.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 The script provided is intended to process a TypeScript file, extract template literals prefixed with `tsx*`, format them using Prettier, and then write the formatted literals to a separate file. Let’s identify the edge cases and analyze the time and space complexity of this solution.

### Edge Cases

1. **Non-Existent or Inaccessible Files**:
If the input file doesn't exist or the script lacks permissions to read/write files, it will throw an error.

2. **Incorrect File Format**:
If the input file is not properly formatted as TypeScript or contains syntax errors, the parser might fail.

3. **Nested Template Literals**: T
he script does not account for nested template literals. If a `tsx ` comment is inside a nested template literal, it might not be processed correctly.

4. **Improper Comment Placement**:
If the `tsx` comments are not correctly placed immediately before the template literals, the script won't identify and process them.

5. **Large Files**: Processing very large files could be resource-intensive, possibly leading to performance issues or memory constraints.

6. **Concurrent File Writing**:
If the output file path is the same as the input file (or if multiple instances of the script run simultaneously with the same output file), it could lead to file access conflicts or data corruption.

7. **Comment Ambiguity**:
The script assumes that `tsx` is used exclusively to mark template literals for formatting. If this comment is used in different contexts, it might lead to unintended behavior.

### Time Complexity

The time complexity of the script is influenced by several operations:

1. **Parsing (O(n))**:
Parsing the code into an AST has a linear time complexity relative to the size of the input code.

2. **AST Traversal (O(n))**:
The time complexity for traversing the AST is also linear in the size of the AST, which is closely related to the size of the input code.

3. **Formatting (O(m))**:
The time complexity of formatting each template literal depends on the complexity of Prettier's formatting algorithm. Assuming it's linear for each literal, the overall complexity depends on the total length of all literals (m).

Overall, the time complexity is approximately O(n + m), where n is the length of the input code and m is the combined length of all template literals to be formatted.

### Space Complexity

The space complexity is mainly driven by the storage of the AST and the formatted code:

1. **AST Storage (O(n))**:
The size of the AST is proportional to the size of the input code.

2. **Formatted Code Storage (O(m))**:
Storing the formatted code requires space proportional to the total length of formatted template literals.

The total space complexity is thus O(n + m), where n is the size of the input code and m is the combined size of the formatted literals.

In conclusion, while this script is effective for its intended purpose, the outlined edge cases should be considered, especially for use in more complex or larger-scale applications. The time and space complexity indicate that the script is generally efficient for reasonably sized files but may encounter issues with very large inputs.
*/
// Import necessary modules from babel and prettier
var parser = require("@babel/parser");
var traverse_1 = require("@babel/traverse");
var prettier = require("prettier");
var fs_1 = require("fs"); // File System module for reading and writing files
function lint(code) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(prettier.format(code, { parser: 'babel-ts' }));
                    }, Math.random() * 1000);
                })];
        });
    });
}
function processCode(inputCode) {
    return __awaiter(this, void 0, void 0, function () {
        var ast, formattedLiterals;
        return __generator(this, function (_a) {
            ast = parser.parse(inputCode, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript'],
            });
            formattedLiterals = [];
            (0, traverse_1.default)(ast, {
                TemplateLiteral: function (path) {
                    var _a, _b, _c;
                    if ((_a = path.node.leadingComments) === null || _a === void 0 ? void 0 : _a.some(function (comment) { return comment.value.includes('tsx'); })) {
                        var start = (_b = path.node.start) !== null && _b !== void 0 ? _b : 0;
                        var end = (_c = path.node.end) !== null && _c !== void 0 ? _c : inputCode.length;
                        var rawCode = inputCode.slice(start, end);
                        var formattedCodePromise = lint(rawCode);
                        formattedLiterals.push(formattedCodePromise);
                    }
                }
            });
            return [2 /*return*/, Promise.all(formattedLiterals)];
        });
    });
}
function processFile(inputFilePath, outputFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var codeString, formattedLiterals, outputContent, outputFileContent, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fs_1.promises.readFile(inputFilePath, 'utf8')];
                case 1:
                    codeString = _a.sent();
                    return [4 /*yield*/, processCode(codeString)];
                case 2:
                    formattedLiterals = _a.sent();
                    outputContent = formattedLiterals.join('\n');
                    return [4 /*yield*/, fs_1.promises.writeFile(outputFilePath, outputContent, 'utf8')];
                case 3:
                    _a.sent();
                    console.log("Formatted literals written to ".concat(outputFilePath));
                    return [4 /*yield*/, fs_1.promises.readFile(outputFilePath, 'utf8')];
                case 4:
                    outputFileContent = _a.sent();
                    console.log("Contents of the Output File:");
                    console.log(outputFileContent);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error processing the file:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Specify the path to the original file and the path for the new output file
processFile('string.jsx', 'Processed/output.tsx');
/*
// Define an interface for replacement objects
interface Replacement {
  start: number;
  end: number;
  formattedCode: string;
}

// Async function to format code using prettier
async function lint(code: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prettier.format(code, { parser: 'babel-ts' }));
    }, Math.random() * 1000); // Simulate a random delay
  });
}

// Main function to process the input code
async function processCode(inputCode: string): Promise<string> {
  // Parse the input code into an AST (Abstract Syntax Tree)
  const ast = parser.parse(inputCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  // Array to hold promises for each template literal replacement
  const formattedLiterals: Promise<Replacement>[] = [];

  // Traverse the AST to find template literals
  traverse(ast, {
    TemplateLiteral(path) {
      // Check for the 'tsx' comment indicating a template to format
      if (path.node.leadingComments?.some(comment => comment.value.includes('tsx'))) {
        const start = path.node.start ?? 0; // Fallback to 0 if start is undefined
        const end = path.node.end ?? 0;     // Fallback to 0 if end is undefined
        const rawCode = inputCode.slice(start, end); // Extract the raw template literal
        const formattedCodePromise = lint(rawCode).then(formattedCode => ({ start, end, formattedCode }));

        // Add the lint promise to the array
        formattedLiterals.push(formattedCodePromise);
      }
    }
  });

  // Wait for all formatting operations to complete
  const replacements = await Promise.all(formattedLiterals);
  let outputCode = inputCode;

  // Apply the replacements to the original code
  replacements.reverse().forEach(({ start, end, formattedCode }) => {
    outputCode = outputCode.slice(0, start) + formattedCode + outputCode.slice(end);
  });

  return outputCode; // Return the modified code
}

// Example usage of the processCode function

const codeString = `const myTypescriptString = /*tsx*/ /*\`console.log(\${myText})\``;

// Execute the function and log the formatted code
processCode(codeString).then(formattedCode => {
  console.log(formattedCode);
});
*/
