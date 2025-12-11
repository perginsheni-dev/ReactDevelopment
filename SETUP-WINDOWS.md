# Setup and Run (Windows PowerShell)

If PowerShell reports: `npm.ps1 cannot be loaded` when running `npm`, your execution policy is blocking script execution. Below are safe options to install dependencies and run the dev server.

Quick (no policy change)
```powershell
npm.cmd install
npm run dev
```

Use cmd from PowerShell
```powershell
cmd /c "npm install"
cmd /c "npm run dev"
```

Temporary bypass (single command)
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

Change execution policy for current user (persisted for your user account)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
npm install
npm run dev
```

Security note: prefer the `npm.cmd` or `cmd /c` options to avoid changing system settings unless you understand the implications.

Open `http://localhost:5173` after `npm run dev` to view the app.
