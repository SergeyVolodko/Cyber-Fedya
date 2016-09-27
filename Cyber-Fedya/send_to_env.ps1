$ProjectName="paves";
$Environment="stable";
$Build = "D:\Release\update_service_"+$ProjectName+"_"+$Environment+"_1.7.26.3.zip";


Write-Host "Project name : "$ProjectName ", environment : " $Environment;

###early
#$DeploymentPath="rcadmin@10.0.7.18:/home/rcadmin/";
####stable
#$DeploymentPath="rcadmin@10.0.5.96:/home/rcadmin/";
$DeploymentPath="rcadmin@10.0.5.59:/home/rcadmin/";

$DeploymentPathPassword="33paverc";


$RemoteCopyCommand="pscp";
$RemoteCopyCommandParams="-scp -r -pw " + $DeploymentPathPassword;


### Copy files to remote server over SSH
$Command=$RemoteCopyCommand + " " + $RemoteCopyCommandParams + " " +  $Build + " " + $DeploymentPath;
Write-Host "--Executing build command : " + $Command ;
iex $Command;
	
Write-Host "Exe code : "$LASTEXITCODE;

### If last executed procedure output is 0 (no errors)
If ($LASTEXITCODE -eq 0) 
{
	Write-Host "--Successfully sent";
}
else
{
	Write-Error "Failed to copy application folder to sending path";
}
