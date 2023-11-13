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
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as prettier from 'prettier';
import { promises as fs } from 'fs'; // File System module for reading and writing files


async function lint(code: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prettier.format(code, { parser: 'babel-ts' }));
    }, Math.random() * 1000);
  });
}

async function processCode(inputCode: string): Promise<string[]> {
  const ast = parser.parse(inputCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const formattedLiterals: Promise<string>[] = [];

  traverse(ast, {
    TemplateLiteral(path) {
      if (path.node.leadingComments?.some(comment => comment.value.includes('tsx'))) {
        const start = path.node.start ?? 0;
        const end = path.node.end ?? inputCode.length;
        const rawCode = inputCode.slice(start, end);
        const formattedCodePromise = lint(rawCode);
        formattedLiterals.push(formattedCodePromise);
      }
    }
  });

  return Promise.all(formattedLiterals);
}

async function processFile(inputFilePath: string, outputFilePath: string): Promise<void> {
  try {
    const codeString = await fs.readFile(inputFilePath, 'utf8');
    const formattedLiterals = await processCode(codeString);

    // Join all formatted literals with a newline (or another separator if preferred)
    const outputContent = formattedLiterals.join('\n');

    await fs.writeFile(outputFilePath, outputContent, 'utf8');
    console.log(`Formatted literals written to ${outputFilePath}`);
    
    // Read and log the content of the output file
    const outputFileContent = await fs.readFile(outputFilePath, 'utf8');
    console.log("Contents of the Output File:");
    console.log(outputFileContent);


  } catch (error) {
    console.error('Error processing the file:', error);
  }
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
