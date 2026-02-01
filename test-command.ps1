# 测试扩展命令是否可用
Write-Host "Testing ChatGPT and Grok extension command..."

# 启动 VSCode 并尝试执行命令
Start-Process "code" -ArgumentList "--new-window", "."

# 等待 VSCode 启动
Start-Sleep -Seconds 3

# 模拟命令面板操作（这里只是演示，实际需要手动测试）
Write-Host "VSCode 已启动，请手动测试命令："
Write-Host "1. 按下 Ctrl+Shift+P 打开命令面板"
Write-Host "2. 输入 'Open ChatGPT and Grok'"
Write-Host "3. 选择该命令并执行"
Write-Host "4. 观察是否成功打开 webview 面板"

Write-Host "\n如果命令可用，则扩展安装成功！"
Write-Host "如果命令不可用，请检查扩展是否正确激活。"
