import { generatePDF } from "../services/pdf.service.js";

export const generatePDFController = async (req, res) => {
    try{
        const [pdfBuffer, error] = await generatePDF();

        if(error){
            return res.status(500).json({message: error});
        }

        res.setHeader("Content-Type", "application/pdf");
        //Nombre del archivo a descargar
        res.setHeader("Content-Disposition", `attachament; filename="report.pdf"`);
        res.send(pdfBuffer);
    }catch (error) {
        console.error("Error al generar PDF:", error);
        return res.status(500).json ({message: "Error interno del servidor"});
    }
}