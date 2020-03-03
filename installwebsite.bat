%SystemRoot%\sysnative\WindowsPowerShell\v1.0\powershell.exe -command "Set-ExecutionPolicy Unrestricted -Force"

IF NOT EXIST c:\inetpub\wwwroot\webtest mkdir c:\inetpub\wwwroot\webtest
cd c:\temp

%SystemRoot%\sysnative\WindowsPowerShell\v1.0\powershell.exe -command .\installwebsite.ps1