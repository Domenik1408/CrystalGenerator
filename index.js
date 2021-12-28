const readline = require("readline");
const chalk = require("chalk");
const Generator = require("./structures/Generator");

let name = "CrystalGenerator"; // Here you can enter the name of the accounts that should be generated.
let amount = "999999999"; // If you want, you can specify a number of accounts to be generated.

process.title = "Crystal Generator - Spotify";

        new Generator(name, amount);

// This tool was originally part of the Crystal project, but the source code has been released since the project has ended. This tool was programmed by Domenik and you are not allowed to remove the credits.
