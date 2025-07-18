import { generatePDF } from "../services/pdf.service.js";
import { generatePDFVotos } from "../services/pdf.service.js";

export const generatePDFController = async (req, res) => {
    try{
        const pdfBuffer = await generatePDF();
        
        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition",`attachment; filename="InformeVotaciones.pdf"`);
        
        res.end(pdfBuffer);

    } catch (error) {
    console.error("Error al generar el pdf:", error);
    return res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
};

export const generatePDFControllerVotos = async (req, res) => {
    try {
        const pdfBuffer = await generatePDFVotos();
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="Listado Participantes Activos.pdf"`);
        
        res.end(pdfBuffer);
    } catch (error) {
        console.error("Error al generar el pdf:", error);
        return res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
}