const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const resizeImg = await (ruta) => {
  // acá tengo que ver la libreria
}
const recorrerDirectorio = async (rutaDir) => {
  const rutas = await fs.readdir(rutaDir);
  for (let index = 0; index < rutas.length; index++) {
    const rutaAbsoluta = path.join(rutaDir, rutas[index]);
    try {
      await procesarRuta(rutaAbsoluta);
    } catch (_) {}
  }
};

const procesarRuta = async (ruta) => {
  const stats = await fs.stat(ruta);
  if (stats.isDirectory()) {
    return recorrerDirectorio(ruta);
  } else if (stats.isFile()) {
    return resizeImg(ruta);
  }
};

(async (_) => {
  try {
    const ordenesPath = path.normalize(process.argv[2]);
    const ordenesPathAbsoluto = path.isAbsolute(ordenesPath)
      ? ordenesPath
      : path.join(process.cwd(), ordenesPath);
    //await procesarPath(ordenesPathAbsoluto)
    process.stdout.cursorTo(0);
    console.log(ordenesPathAbsoluto);
  } catch (error) {
    process.stdout.cursorTo(0);
    console.log(`ERROR: ${error.message}`);
  }
})();