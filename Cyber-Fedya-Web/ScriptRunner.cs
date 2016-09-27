using System.Diagnostics;

namespace Cyber_Fedya_Web
{
    public class ScriptResult
    {
        public int ExitCode { get; set; }
        public string Output { get; set; }
    }

    public interface IBashScriptRunner
    {
        ScriptResult Run(string bashCommand);
    }

    public class BashScriptRunner : IBashScriptRunner
    {
        private ProcessStartInfo startInfo;
        public BashScriptRunner()
        {
            startInfo = new ProcessStartInfo();
            startInfo.FileName = "/usr/bin/bash";
            startInfo.UseShellExecute = false;
            startInfo.RedirectStandardError = true;
            startInfo.RedirectStandardInput = true;
            startInfo.RedirectStandardOutput = true;
        }

        public ScriptResult Run(string bashCommand)
        {
            startInfo.Arguments = bashCommand;
            
            var process = Process.Start(startInfo);

            process.WaitForExit();

            var output = process.StandardOutput.ReadToEnd();

            return new ScriptResult
            {
                ExitCode = process.ExitCode,
                Output = output
            };
        }
    }
}
