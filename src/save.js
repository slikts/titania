const fs = require('fs');
const { convert } = require("./convert");
const komisijas = require("../data/komisijas.json");

const saveCSV = (data) => {
  const csv = data.map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
  fs.writeFileSync('data/komisijas.csv', csv);
}

saveCSV(convert(komisijas));
