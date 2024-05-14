const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputFilePath = "telecom_churn.csv";
const outputFilePath = "output.csv";

// Функция для замены цифр
function replaceDigits(input) {
  return input.replace(/\d/g, (match) => {
    const digit = parseInt(match);
    // Замена цифры на другую
    switch (digit) {
      case 0:
        return "9";
      case 1:
        return "8";
      case 2:
        return "7";
      case 3:
        return "6";
      case 4:
        return "5";
      case 5:
        return "4";
      case 6:
        return "3";
      case 7:
        return "2";
      case 8:
        return "1";
      case 9:
        return "0";
      default:
        return match; // Если символ не является цифрой, возвращаем его без изменений
    }
  });
}

// Чтение CSV файла, замена цифр и запись в новый файл
const results = [];
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    for (let key in row) {
      row[key] = replaceDigits(row[key]);
    }
    results.push(row);
  })
  .on("end", () => {
    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: Object.keys(results[0]).map((key) => ({ id: key, title: key })),
    });
    csvWriter.writeRecords(results).then(() => {
      console.log("CSV файл успешно обработан.");
    });
  });
