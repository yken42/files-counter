import fs from "fs/promises";

async function filesCounter(dir) {
    let filesCount = 0;

    const files = await fs.readdir(dir);
    for (let file of files) {
      const newFilePath = `${dir}/${file}`;
      const stats = await fs.stat(newFilePath);

      if (stats.isDirectory()) {
        filesCount += await filesCounter(newFilePath);
      } else if (stats.isFile()) {
        filesCount++;
      }
    }
    return filesCount;
}


const DIR = "node_modules";
filesCounter(DIR)
  .then((filesCount) => {
    console.log(`Total files: ${filesCount}`);
  })
  .catch((err) => console.error("Error:", err));
