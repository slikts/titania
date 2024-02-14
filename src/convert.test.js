const {
  convert,
  expandRow,
  splitRow,
  fillExpandedRow,
  convertLastCells,
} = require("./convert");

describe("convert", () => {
  it("splits row", () => {
    expect(splitRow(["a", "b", "\n"])).toEqual([["a"], ["b"], [""]]);
  });

  it("expands row", () => {
    expect(expandRow(["a", "b\nc", "\n\nd"])).toEqual([
      ["a", "b", ""],
      ["", "c", "d"],
    ]);
    expect(expandRow(["a", "b\nc\ne", "\n\nd\nf"])).toEqual([
      ["a", "b", ""],
      ["", "c", "d"],
      ["", "e", "f"],
    ]);

    expect(expandRow(["a", "b", "\n"])).toEqual([["a", "b", ""]]);
  });

  it("fills expanded row", () => {
    expect(
      fillExpandedRow([
        ["a", "b", ""],
        ["", "c", "d"],
      ])
    ).toEqual([
      ["a", "b", ""],
      ["a", "c", "d"],
    ]);

    expect(
      fillExpandedRow([
        ["a", "b", ""],
        ["", "", "d"],
      ])
    ).toEqual([
      ["a", "b", ""],
      ["a", "b", "d"],
    ]);
  });

  it("converts last cells", () => {
    expect(convertLastCells(["a", "b", "1.2.3", "4.5.6"])).toEqual([
      "a",
      "b",
      "=DATE(3, 2, 1)",
      "=DATE(6, 5, 4)",
    ]);
  });

  it("converts", () => {
    expect(convert(fixture)).toMatchSnapshot();
  });
});

const fixture = {
  "Ārlietu komisija": [
    ["Vārds, uzvārds", "Nosaukums", "Amats", "No", "Līdz"],
    [
      "Rihards Kols",
      "NA",
      "Priekšsēdētājs\nDeputāts",
      "23.11.2022\n23.11.2022",
      "\n\n23.11.2022",
    ],
    [
      "Irma Kalniņa",
      "JV",
      "Priekšsēdētāja biedre\nSekretāre\nDeputāte",
      "27.09.2023\n23.11.2022\n23.11.2022",
      "\n\n27.09.2023\n23.11.2022",
    ],
    [
      "Juris Viļums",
      "AS",
      "Sekretārs\nPriekšsēdētāja biedrs\nDeputāts",
      "27.09.2023\n23.11.2022\n23.11.2022",
      "\n\n27.09.2023\n23.11.2022",
    ],
    ["Edmunds Cepurītis", "PRO", "Deputāts", "21.09.2023", "\n"],
    ["Jānis Dombrava", "NA", "Deputāts", "21.09.2023", "\n"],
    ["Zanda Kalniņa-Lukaševica", "JV", "Deputāte", "23.11.2022", "\n"],
    ["Dmitrijs Kovaļenko", "ST!", "Deputāts", "23.11.2022", "\n"],
    ["Edvards Smiltēns", "AS", "Deputāts", "23.11.2022", "\n"],
    ["Ričards Šlesers", "LPV", "Deputāts", "23.11.2022", "\n"],
    ["Jānis Vucāns", "ZZS", "Deputāts", "21.09.2023", "\n"],
  ],
  "Budžeta un finanšu (nodokļu) komisija": [
    ["Vārds, uzvārds", "Nosaukums", "Amats", "No", "Līdz"],
    [
      "Jānis Reirs",
      "JV",
      "Priekšsēdētājs\nDeputāts",
      "15.12.2022\n15.12.2022",
      "\n\n15.12.2022",
    ],
    [
      "Andris Šuvajevs",
      "PRO",
      "Priekšsēdētāja biedrs\nDeputāts",
      "27.09.2023\n23.11.2022",
      "\n\n27.09.2023",
    ],
    [
      "Aiva Vīksna",
      "AS",
      "Sekretāre\nDeputāte",
      "23.11.2022\n23.11.2022",
      "\n\n23.11.2022",
    ],
    [
      "Artūrs Butāns",
      "NA",
      "Deputāts\nPriekšsēdētāja biedrs\nDeputāts",
      "27.09.2023\n23.11.2022\n23.11.2022",
      "\n\n27.09.2023\n23.11.2022",
    ],
    ["Raimonds Čudars", "JV", "Deputāts", "21.09.2023", "\n"],
  ],
};
