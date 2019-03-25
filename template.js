const fs = require("fs");
const util = require("util");

function parse(template, context) {
  const keys = Object.keys(context);
  const vals = Object.values(context);
  return new Function(...keys, `return \`${template}\`;`)(...vals);
}

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
(async () => {
  const context = {
    title: "FILEX Newsletter #1: Japanese Kabuki Theater",
    body: `<h1>FILEX Newsletter #1: Japanese Kabuki Theater</h1>
  <div class='line'></div>
  <div id='content'>
    <div id='mainText'>
      <h2>Japanese Kabuki Theater: What is it?</h2>
      <img src='https://filex-newsletter-img.netlify.com/1kabuki/main.jpg' class='main' border='0'/>
      <p>Kabuki is an art form rich in movement and sounds. It involves elaborately designed costumes, eye-catching make-up, outlandish<sup>1</sup> wigs,
         and arguably most importantly, the exaggerated actions performed by the actors who are ONLY MEN. The highly-stylized movements serve to convey<sup>2</sup>
         meaning to the audience; this is especially important since an old-fashioned form of Japanese is typically used, which is difficult even for Japanese people to fully understand.</p>
      <p>Dynamic stage sets such as revolving platforms and trapdoors allow for the prompt changing of a scene or the appearance/disappearance of actors. Another
        specialty of the kabuki stage is a footbridge (hanamichi) that leads through the audience, allowing for a dramatic entrance or exit. Ambiance is aided<sup>3</sup>
        with live music performed using traditional instruments. These elements combine to produce a visually stunning<sup>4</sup> and captivating performance.</p>
      <p>Plots are usually based on historical events, dramas, moral conflicts, love stories, tales of tragedy of conspiracy, or other well-known stories. A unique
        feature of a kabuki performance is that what is on show is often only part of an entire story (usually the best part). Therefore, to enhance the enjoyment derived,
        it would be good to read a little about the story before attending<sup>5</sup> the show. At some theaters, it is possible to rent headsets<sup>6</sup> which provide English
        narrations and explanations.</p>
    </div>`,
    vocabulary: `<div id="vocabulary">
        <div><sup>1</sup>Outlandish: Extravagant</div>
        <div><sup>2</sup>Convey: Transmit</div>
        <div><sup>3</sup>Aide: Help</div>
        <div><sup>4</sup>Stunning: Very beautiful</div>
        <div><sup>5</sup>Attend: Go to an event</div>
        <div><sup>6</sup>Headsets: Earphones</div>
    </div>`
  };
  const template = await readFile("./newsletter/0template.html");
  console.log(parse(template, context));
})();
