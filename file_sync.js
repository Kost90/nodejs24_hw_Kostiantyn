const fs = require("fs");
const path = require("path");
const logger = require("./utils/logger")("file_sync entry");

const sourceDir = path.join(__dirname, "source");
const targetDir = path.join(__dirname, "target");

function start(srcDir, trgDir) {
  // Передаємо путь до корня каталогів (source та target)
  fs.readdir(srcDir, { recursive: true }, (error, files) => {
    if (error) {
      logger.error("cannot read source folder content", error);
      return;
    }
    // етеруємося по масивву назв файлів та вкладених каталогів з папки source
    files.forEach((file) => {
      // створюємо шляхи які включають корнєвий шлях папки та імя файлу або вкладеної папки з массиву назв папки source
      const srcPath = path.join(srcDir, file);
      const trgPath = path.join(trgDir, file);
      //   перевірка чи названа з масиву є папкою
      if (fs.statSync(srcPath).isDirectory()) {
        // створення вкладеної папки у каталозі target
        fs.mkdir(trgPath, (error) => {
          if (error) {
            logger.error(error);
            return;
          }
        });
        // рекурсивно викликаємо цю ж функцію для ітерації спочатку
        start(srcPath, trgPath);
      } else {
        // перевіряємо чи наявний такий самий файл у папці target
        if (fs.existsSync(trgPath)) {
          logger.warn(`${trgPath} is exists`);
        } else {
          //копіюємо файл з папки source до target
          fs.copyFile(srcPath, trgPath, (error) => {
            if (error) throw error;
            logger.info(`${file} is copied`);
          });
        }
      }
    });
  });
}

function getStart() {
  return {
    start: () => start(sourceDir, targetDir),
  };
}

module.exports = getStart;
