#Add-Type -assembly "system.io.compression.filesystem"



$ProjectName="cyber-fedya";
$Build = "bin/Debug/"+$ProjectName+".zip";


Write-Host "Publishing package...";
dotnet build
dotnet publish
Write-Host "Zipping...";
Remove-Item $Build
Add-Type -As System.IO.Compression.FileSystem 
[IO.Compression.ZipFile]::CreateFromDirectory( ('bin/Debug/netcoreapp1.0'), $Build, "Optimal", $true )

Write-Host "Project name : "$ProjectName;

$DeploymentPath="sergii.volodko@13.93.87.76:/home/sergii.volodko";

$DeploymentPathPassword="leia-tries1N";


$RemoteCopyCommand="pscp";
$RemoteCopyCommandParams="-scp -r -pw " + $DeploymentPathPassword;


### Copy files to remote server over SSH
$Command=$RemoteCopyCommand + " " + $RemoteCopyCommandParams + " " +  $Build + " " + $DeploymentPath;
Write-Host "--Executing build command : " + $Command ;
iex $Command;
	
Write-Host "Exe code : "$LASTEXITCODE;

### If last executed procedure output is 0 (no errors)
if ($LASTEXITCODE -eq 0) 
{
    Write-Host "Successfully sent";
}
else
{
	Write-Error "Failed to copy application folder to sending path";
}