using System.Collections.Specialized;
using System.Diagnostics;

namespace Cyber_Fedya
{
    public class ScriptResult
    {
        public int ExitCode { get; set; }
        public StringDictionary Variables { get; set; }
        public string Output { get; set; }
    }

    public interface IBashScriptRunner
    {
        ScriptResult Run(string scriptPath, StringDictionary envVariables);
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

        public ScriptResult Run(string scriptPath, StringDictionary envVariables)
        {
            startInfo.Arguments = scriptPath;

            startInfo.EnvironmentVariables.Clear();
            foreach (string key in envVariables.Keys)
            {
                startInfo.EnvironmentVariables[key.ToUpper()] = envVariables[key];
            }

            var process = Process.Start(startInfo);

            process.WaitForExit();

            var output = process.StandardOutput.ReadToEnd();

            return new ScriptResult
            {
                ExitCode = process.ExitCode,
                Variables = startInfo.EnvironmentVariables,
                Output = output
            };
        }
    }
}
