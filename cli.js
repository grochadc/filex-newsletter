const { sendEmail } = require("./sendEmail");

require("yargs")
  .usage("$0 <cmd> [args]")
  .command(
    "send",
    "send the email",
    {
      user: {
        alias: "u",
        describe: "user"
      },
      pass: {
        alias: "p",
        describe: "pass"
      },
      server: {
        alias: "s",
        describe: "server"
      },
      verbose: {
        alias: "v",
        describe: "Verbose mode",
        boolean: true
      }
    },
    function(argv) {
      if (argv.user) {
        const { user, pass, server, verbose } = argv;
        sendEmail({
          user,
          pass,
          server,
          verbose
        }).catch(console.error);
      } else {
        sendEmail().catch(console.error);
      }
    }
  )
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv;
