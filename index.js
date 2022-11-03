const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { createHash } = require("node:crypto");

const fileData = fs.readFileSync(
  "./input_csv/NFT Naming csv - All Teams.csv",
  "utf-8"
);

const dataArr = fileData
  .split("\n")
  .map((el) => el.split(","))
  .map((el, i) => (i !== 0 ? el : null))
  .filter((el) => {
    if (el !== null) {
      return el;
    }
  });

let dataArrCsv = [...fileData.split("\n").map((el) => el.split(","))];

// console.log(dataArr);

// const createHashedFileCSV = (data) => {
//   return;
// };

const createJsonFiles = (data) => {
  data.forEach((el, i) => {
    let objJson = {
      format: "CHIP-0007",
      id: uuidv4(),
      name: el[1]
        .split("-")
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(" "),
      filename: el[1],
      description: "",
      minting_tool: "Matanmi SuperMint",
      sensitive_content: false,
      series_number: el[0],
      series_total: dataArr.length + "",
      collection: {
        name: "Zuri Hng NFT Collection",
        id: el[2].slice(0, -2),
      },
    };
    let writeData = JSON.stringify(objJson);
    let hashFile = `${el[1]}.${createHash("sha256")
      .update(el[1])
      .digest("hex")}.csv`;

    dataArrCsv[i].push(hashFile);

    fs.writeFileSync(`${__dirname}/json/${el[1]}.json`, writeData, "utf-8");
  });
};
createJsonFiles(dataArr);
dataArrCsv[0] = ["S/N", "Filename", "UUID", "Output File Name"];
dataArrCsv = dataArrCsv
  .map((el) => el.join(","))
  .map((el) => el.replace("\r", ""));

// console.log(dataArrCsv.join("\n"));
let outputCSV = dataArrCsv.join("\n");

fs.writeFileSync("./output_csv/output-nft-naming.csv", outputCSV, "utf-8");
// const createCSVfile = (data) => {};
