const { sendEmail } = require("./sendEmail");
const checkEmail = require("./lib/emails/checkMail");

const baseConfig = {
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
  }
};

require("yargs")
  .usage("$0 <cmd> [args]")
  .command(
    "send",
    "send the email",
    {
      verbose: {
        alias: "v",
        describe: "Verbose mode",
        boolean: true
      },
      test: {
        alias: "t",
        describe: "Test email",
        boolean: true
      },
      ...baseConfig
    },
    function(argv) {
      if (!argv.test) {
        sendEmail(argv).catch(console.error);
      } else {
        //When this func is called without args, a dummy email is sent
        sendEmail().catch(console.error);
      }
    }
  )
  .demandCommand()
  .command(
    "check",
    "Check Inbox for rejected or not found emails",
    {
      ...baseConfig
    },
    function(argv) {
      checkEmail(argv);
    }
  )
  .demandCommand()
  .recommendCommands()
  .strict()
  .help().argv;
