import archiver from "archiver";
import fs from "node:fs";

export const zipDirectory = (source: string, output: string) => {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(output);

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
};
