import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('ChatGPT and Grok extension is activating...');
    
    let configureApiKeyCommand = vscode.commands.registerCommand('extension.configureApiKey', async () => {
        console.log('Configure API Key command triggered');
        try {
            const apiKey = await vscode.window.showInputBox({
                placeHolder: '请输入API密钥',
                password: true,
                prompt: '请输入您的 ChatGPT 或 Grok API 密钥'
            });

            if (apiKey) {
                const config = vscode.workspace.getConfiguration('chatgptAndGrok');
                await config.update('apiKey', apiKey, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage('API 密钥已更新');
                console.log('API key updated successfully');
            }
        } catch (error) {
            console.error('Error configuring API key:', error);
            vscode.window.showErrorMessage('配置 API 密钥时出错: ' + error);
        }
    });

    context.subscriptions.push(configureApiKeyCommand);

    let disposable = vscode.commands.registerCommand('extension.openChatGptAndGrok', () => {
        console.log('Open ChatGPT and Grok command triggered');
        try {
            const config = vscode.workspace.getConfiguration('chatgptAndGrok');
            const chatGptUrl = config.get<string>('chatGPTUrl', 'https://chat.openai.com');
            const grokUrl = config.get<string>('grokUrl', 'https://grok.com');
            const apiKey = config.get<string>('apiKey', '');

            console.log('Creating webview panel with URLs:', { chatGptUrl, grokUrl });

            const panel = vscode.window.createWebviewPanel(
                'chatGptAndGrok',
                'ChatGPT & Grok',
                vscode.ViewColumn.Two,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true
                }
            );

            const htmlContent = `
                <html>
                    <head>
                        <title>ChatGPT & Grok web</title>
                        <style>
                            body { margin: 0; padding: 0; overflow: hidden; }
                            iframe { width: 100%; height: 50%; border: none; }
                        </style>
                    </head>
                    <body>
                        <iframe src="${chatGptUrl}" title="ChatGPT"></iframe>
                        <iframe src="${grokUrl}" title="Grok"></iframe>
                    </body>
                </html>
            `;

            panel.webview.html = htmlContent;
            console.log('Webview panel created successfully');
        } catch (error) {
            console.error('Error opening ChatGPT and Grok:', error);
            vscode.window.showErrorMessage('打开 ChatGPT 和 Grok 时出错: ' + error);
        }
    });

    context.subscriptions.push(disposable);

    vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('chatgptAndGrok')) {
            vscode.window.showInformationMessage('配置已更新');
            console.log('Configuration updated');
        }
    });
    
    console.log('ChatGPT and Grok extension activated successfully');
}

export function deactivate() {}
