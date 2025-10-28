# Software Engineering Demo - Loopstack AI

This is a simple demo for using a custom loopstack automation to plan and implement code improvements recommended by AI.

The process can be triggered from within VSCode. Follow the steps below for setup.

## Installation
```
npm install
```

## Start the Service
```
docker compose up -d
npm run start
```

## VSCode Setup

Create a `.idea/task.yaml` file in your VSCode project.

The task makes a http request to your local loopstack instance to trigger the automation run. 

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Loopstack: Improve File",
      "type": "process",
      "command": "node",
      "args": [
        "-e",
        "const fs = require('fs'); const http = require('http'); const path = process.argv[1]; const content = fs.readFileSync(path, 'utf8'); const payload = JSON.stringify({ path, content }); const req = http.request({ hostname: 'localhost', port: 8000, path: '/improve-file', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } }, res => { let data = ''; res.on('data', chunk => data += chunk); res.on('end', () => console.log(data)); }); req.on('error', err => console.error('Error:', err.message)); req.write(payload); req.end();",
        "${file}"
      ],
      "presentation": {
        "reveal": "always",
        "panel": "new",
        "focus": true,
        "echo": false
      }
    }
  ]
}
```

## Use in VSCode

1. Open a file in VSCode
2. Hit `CMD + Shift + P` (OSX)
3. Select `Task: Run Task`
4. Then select, `Loopstack: Improve File`.
5. Click on the link in the terminal.

 