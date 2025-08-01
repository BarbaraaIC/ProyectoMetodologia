import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/upload/");
  },
  filename: function (req, file, cb) {
    // Reemplazo de espacios en blanco en por guiones en los nombres de los archivos
    const fileName = file.originalname.replace(/\s+/g, "-");
    cb(null, fileName + ".pdf");
  }
});

// Filtro para aceptar solo archivos que sean .pdf
const fileFilter = (req, file, cb) => {
  // Verifica si el archivo es un .pdf
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error("Solo se permiten archivos .pdf"), false); // Rechaza el archivo
  }
};

// Configuración de Multer y el filtro de archivos
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB de límite de tamaño de archivo
  },
  fileFilter: fileFilter
});

// Middleware para manejar el errores de límite de tamaño de archivo
const handleFileSizeLimit = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: "El tamaño del archivo excede el límite de 5 MB" });
  } else if (err) {
    // Manejar errores de validación de tipo de archivo
    res.status(400).json({ message: err.message });
  } else {
    next();
  }
};

export { upload, handleFileSizeLimit };