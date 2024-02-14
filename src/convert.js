const splitRow = (row) =>
  row.map((cell) => cell.replace(/^\n/, "").split(/\n/));

const expandRow = (row) => {
  const splitted = splitRow(row);
  const max = Math.max(...splitted.map((cell) => cell.length));
  const filled = splitted.map((cell) => [
    ...cell,
    ...Array(max - cell.length).fill(""),
  ]);
  return Array(max)
    .fill()
    .map((_, i) => filled.map((cell) => cell[i]));
};

const fillExpandedRow = (expandedRow) =>
  expandedRow.map((row) =>
    row.map((cell, i) =>
      cell === "" && i !== row.length - 1 ? expandedRow[0][i] : cell
    )
  );

const convertLastCells = (row) => row.map((cell, i) => row.length - i <= 2 ? convertToDate(cell) : cell); 

const convert = (data) => {
  const headers = ["Komisija", ...data[Object.keys(data)[0]][0]].map((cell) => cell === 'Nosaukums' ? 'Partija' : cell);

  const rows = Object.entries(data).map(([title, rows]) =>
    rows
      .slice(1)
      .map(expandRow)
      .map(fillExpandedRow)
      .flat()
      .map(convertLastCells)
      .map((row) => [title, ...row])
  ).flat();
  return [headers, ...rows];
};

const convertToDate = (dateString) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split(".");
  return `=DATE(${year}, ${month}, ${day})`;
}

module.exports = {
  convertLastCells,
  fillExpandedRow,
  splitRow,
  convert,
  expandRow,
};
