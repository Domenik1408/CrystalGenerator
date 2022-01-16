const request = require("request");
const ProxyAgent = require("socks-proxy-agent");
const RandExp = require("randexp");
const fs = require("fs");
const chalk = require("chalk");

class Generator {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;

    this.retries = 0;
    this.work = 0;

    this.int = setInterval(() => {
      this.create();
    }, 0);
  }

  create() {
    var gendervalue = ["male", "female"];
    var gender = gendervalue[Math.floor(Math.random() * gendervalue.length)];
    var domain = ["@gmail.com", "@hotmail.com", "@yahoo.com", "@gmx.de", "@mail.ru", "@rambler.ru", "@outlook.com", "@zdomenik.net", "@mail.de", "@freenet.de", "@einfach-schneller.de", "@telekom.de", "@febanhd.de", "@galaxy.de", "@vodafone.de"];
    var email =
      new RandExp(/([a-zA-Z0-9]{20})/).gen() +
      domain[Math.floor(Math.random() * domain.length)];
    var password = new RandExp(/([a-zA-Z0-9_-]{15})$/).gen();

    var proxies = fs
      .readFileSync("./data/proxies.txt", "utf-8")
      .replace(/\r/gi, "")
      .split("\n");
    let proxy = proxies[~~(Math.random() * proxies.length)];
    let agent = new ProxyAgent("socks4://" + proxy);

    let req = request.defaults({
      agent,
      jar: request.jar(),
    });

    req.post(
      "https://spclient.wg.spotify.com/signup/public/v1/account",
      {
        headers: {
          "User-agent":
            "S4A/2.0.15 (com.spotify.s4a; build:201500080; iOS 13.4.0) Alamofire/4.9.0",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept: "application/json, text/plain;q=0.2, */*;q=0.1",
          "App-Platform": "IOS",
          "Spotify-App": "S4A",
          "Accept-Language": "en-TZ;q=1.0",
          "Spotify-App-Version": "2.0.15",
        },
        body: `birth_day=24&birth_month=12&birth_year=2000&collect_personal_info=undefined&creation_flow=&creation_point=https%3A%2F%2Fwww.spotify.com%2Fuk%2F&displayname=${this.name}&gender=${gender}&iagree=1&key=a1e486e2729f46d6bb368d6b2bcda326&platform=www&referrer=&send-email=1&thirdpartyemail=0&email=${email}&password=${password}&password_repeat=${password}&fb=0`,
      },
      (err, res, body) => {
        if (res && res.statusCode === 200) {
          if (/"status":1,"/.exec(body)) {
            this.work++;
            console.log(
              chalk.hex("#ff0000")(
                `[LOCKED] ${chalk.white(
                  "%s:%s"
                  )} | CrystalGenerator `
              ),
              email,
              password
            );
            fs.appendFile(
              "./data/locked.txt",
              email + ":" + password + "\n",
              (err) => {}
            );
            if (this.work == this.amount) {
              console.log("");
              console.log(
                chalk.hex("00FF00")(
                  `[DONE] ${chalk.white("Generated and saved")} ${
                    this.amount
                  } ${chalk.white(
                    "accounts succesfully, check your txt file!"
                  )}`
                )
              );
              return process.exit();
            }
          } else if (/"status":20,"/.exec(body)) {
            console.log(email);
            console.log(chalk.hex("FFFF00")("Email Registered"));
          }
        } else {
          this.retries++;
        }
      }
    );
    process.title = `Crystal Generator - Spotify | Created but get locked after some hours: ${this.work} | Retries: ${this.retries} [Generator is patched by Spotify]`;
  }
}

module.exports = Generator;

// This tool was originally part of the Crystal project, but the source code has been released since the project has ended. This tool was programmed by Domenik and you are not allowed to remove the credits.
