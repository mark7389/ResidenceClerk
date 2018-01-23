require("child_process").spawn("npm",
["run test"], 
{
    stdio:"inherit",
    cwd: "client",
    shell: true
});