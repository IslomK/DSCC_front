%SystemRoot%\sysnative\WindowsPowerShell\v1.0\powershell.exe -command "Set-ExecutionPolicy Unrestricted -Force"

IF NOT EXIST c:\inetpub\wwwroot\webtest mkdir c:\inetpub\wwwroot\webtest

IF NOT EXIST c:\inetpub\wwwroot\webtest\css mkdir c:\inetpub\wwwroot\webtest\css

IF NOT EXIST c:\inetpub\wwwroot\webtest\fonts mkdir c:\inetpub\wwwroot\webtest\fonts

IF NOT EXIST c:\inetpub\wwwroot\webtest\img mkdir c:\inetpub\wwwroot\webtest\img

cd c:\temp

%SystemRoot%\sysnative\WindowsPowerShell\v1.0\powershell.exe -command ".\installwebsite.ps1"