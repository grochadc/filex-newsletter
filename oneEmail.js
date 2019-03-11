const { send } = require("./lib/emails/send");
const { parseCSS } = require("./parseCSS");

async function main() {
  const parsedHTML = await parseCSS("./newsletter/2muxes.html");

  await send(
    "genbx21@gmail.com",
    {
      host: "smtp.gmail.com",
      auth: { user: "filexnewsletter@gmail.com", pass: "F173x2014" }
    },
    {
      from: "filexnewsletter@gmail.com",
      subject: parsedHTML.title,
      html: parsedHTML.html
    }
  );
  return "Mail sent!";
}

main()
  .then(console.log)
  .catch(console.eror);
