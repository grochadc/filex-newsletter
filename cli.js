const { sendEmail } = require("./sendEmail");

require("yargs")
  .usage("$0 <cmd> [args]")
  .command(
    "send",
    "send the email",
    {
      user: {
        alias: "u"
      },
      pass: {
        alias: "p"
      },
      server: {
        alias: "s"
      }
    },
    function(argv) {
      if (argv.user) {
        sendEmail({
          user: argv.user,
          pass: argv.pass,
          server: argv.server
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
