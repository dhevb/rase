import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const input =
  process.argv[2] ??
  "C:/Users/LENOVO/Downloads/Shiksha Mahakumbh 6.0 deaft.pdf";
const output =
  process.argv[3] ?? path.join("scripts", "pdf-deaft-extract.txt");

const buf = fs.readFileSync(input);
const data = await pdf(buf);
fs.writeFileSync(
  output,
  `PAGES=${data.numpages}\n\n${data.text}`,
  "utf8"
);
console.log(JSON.stringify({ pages: data.numpages, chars: data.text.length, output }));
