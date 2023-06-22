import { utils, writeFile } from "xlsx";

export const exportToExcel = (tableId, fileName) => {
  const table = document.getElementById(tableId);
  const workbook = utils.table_to_book(table);
  writeFile(workbook, `${fileName}.xlsx`);
};
