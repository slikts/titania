// https://titania.saeima.lv/Personal/Deputati/Saeima14_DepWeb_Public.nsf/structureview?readform&type=3&lang=LV

it("scrape komisijas", () => {
  cy.visit(
    "/Personal/Deputati/Saeima14_DepWeb_Public.nsf/structureview?readform&type=3&lang=LV"
  );
  const results = {};
  cy.get("[name=expandTarget]")
    .each(($el) => {
      const title = $el.text();
      cy.log(title);
      cy.wrap($el)
        .click()
        .then(() => {
          const tr = $el.closest("tr").next("tr");
          cy.wrap(tr)
            .contains("div", "Esošais sastāvs")
            .next("table")
            .then(($table) => {
              const rows = $table.find("tr");
              const data = [];

              cy.wrap(rows)
                .each(($row, i) => {
                  const cells = $row.find("td");
                  const rowData = [];

                  cells.each((index, cell) => {
                    rowData.push(cell.innerText);
                  });

                  data[i] = rowData;
                })
                .then(() => {
                  results[title] = data;
                });
            });
        });
    })
    .then(() => {
      cy.log(results);
      cy.writeFile("data/komisijas.json", JSON.stringify(results, null, 2));
    });
});
