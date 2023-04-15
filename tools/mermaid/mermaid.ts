import * as ts from 'typescript';
import * as fs from 'fs';

function generateSequenceDiagram(entryMethodName: string, sourceCode: string): string {
  const sourceFile = ts.createSourceFile('temp.ts', sourceCode, ts.ScriptTarget.ES2015, true);
  let diagram = `sequenceDiagram\n`;

  function visit(node: ts.Node, currentMethod: string) {
    if (ts.isCallExpression(node)) {
      const methodName = node.expression.getText(sourceFile);
      diagram += `${currentMethod} ->> ${methodName}: call\n`;
  
      // Follow the called method
      const calledMethodDeclaration = findMethodDeclaration(methodName);
      if (calledMethodDeclaration) {
        visitNodeChildren(calledMethodDeclaration, methodName);
      }
    }
    ts.forEachChild(node, child => visit(child, currentMethod));
  }  

  function visitNodeChildren(node: ts.Node, currentMethod: string) {
    ts.forEachChild(node, child => visit(child, currentMethod));
  }

  function findMethodDeclaration(methodName: string): ts.FunctionDeclaration | ts.MethodDeclaration | null {
    let found: ts.FunctionDeclaration | ts.MethodDeclaration | null = null;
  
    function visit(node: ts.Node) {
      if (
        (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) &&
        node.name?.getText(sourceFile) === methodName
      ) {
        found = node;
      } else if (ts.isObjectLiteralExpression(node)) {
        node.properties.forEach((property) => {
          if (ts.isMethodDeclaration(property) && property.name?.getText(sourceFile) === methodName) {
            found = property;
          }
        });
      } else {
        ts.forEachChild(node, visit);
      }
    }
  
    ts.forEachChild(sourceFile, visit);
    return found;
  }  

  const entryMethodDeclaration = findMethodDeclaration(entryMethodName);
  if (entryMethodDeclaration) {
    visitNodeChildren(entryMethodDeclaration, entryMethodName);
  }

  return diagram;
}

const sourceCode = fs.readFileSync('path/to/your/source-file.ts', 'utf8');
const entryMethodName = 'yourMethodToStart';
const sequenceDiagram = generateSequenceDiagram(entryMethodName, sourceCode);

const outputFile = 'output.mmd';
fs.writeFileSync(outputFile, sequenceDiagram, 'utf8');
console.log(`Mermaid sequence diagram saved to ${outputFile}`);

