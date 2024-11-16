// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "scaffy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('scaffy.bootstrap', async function () {
		// The code you place here will be executed every time your command is executed
		const folderUri = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			openLabel: 'Select Base Folder',
		  });
	  
		  if (!folderUri || folderUri.length === 0) {
			vscode.window.showErrorMessage('No folder selected!');
			return;
		  }

		//   const basePath = folderUri[0].fsPath; // Get the selected folder path
		const selectedFolderPath = folderUri[0].fsPath; // Get the selected folder path


		// / get project name from the user
		// Prompt user for project name
		const projectName = await vscode.window.showInputBox({
		prompt: 'Enter the project name,dart acceptable name',
		placeHolder: 'my_project_name',
		});
		if (!projectName) {
			vscode.window.showErrorMessage('No project name provided!');
			return;
		  }


		  const basePath = path.join(selectedFolderPath, projectName);
 // Create the project folder
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    } else {
      vscode.window.showWarningMessage(`The folder '${projectName}' already exists. Files will be added inside it.`);
    }
		//   const  = await vscode.window.showInputBox({
		// 	prompt: 'Enter the folder/file structure (e.g., src,src/components/App.js,README.md)',
		//   });
		//   const structure = ''
		  // Predefined folder and file structure
		  // Predefined folder and file structure with content
		  const predefinedStructure = [
			{ path: 'apps', isFolder: true },
			{ path: 'packages', isFolder: true },
			{ 
				path: 'melos.yaml', 
				content: `name: ${projectName}\n\npackages:\n  - apps/**\n  - packages/**\n`
			},
			  {
				path: 'pubspec.yaml',
				content: `name: ${projectName}\n\nenvironment:\n  sdk: '>=3.0.0 <4.0.0'\n`,
			  },
			  		
		  ];
	    // Create folders and files with content
		predefinedStructure.forEach((item) => {
			const fullPath = path.join(basePath, item.path);
	  
			if (item.isFolder) {
			  // Create folder
			  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
			} else {
			  // Create file with content
			  const dir = path.dirname(fullPath);
			  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			  fs.writeFileSync(fullPath, item.content || '', 'utf8'); // Write content or create an empty file
			}
		  });


		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello Vscode from Scaffy!');
		  // Create folders and files with content
		  predefinedStructure.forEach((item) => {
			const fullPath = path.join(basePath, item.path);
	  
			if (item.isFolder) {
			  // Create folder
			  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
			} else {
			  // Create file with content
			  const dir = path.dirname(fullPath);
			  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			  fs.writeFileSync(fullPath, item.content || '', 'utf8'); // Write content or create an empty file
			}
		  });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
