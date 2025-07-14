import PDFDocument from 'pdfkit-table';
import { getResultadosVotacion } from '../services/votation.service.js';

export async function generatePDF() {

    const resultados = await getResultadosVotacion();
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Tabla de candidatos postulados y votos
    const candidatosRows = resultados.candidatos.map(c => [c.id, c.nombre, c.apellido, c.cargo, c.cantidad_votos]);

    const table = {
        title: { label: 'Informe de Votaciones', color: 'blue' },
        headers: ['ID', 'Nombre', 'Apellido', 'Cargo', 'Votos'],
        rows: candidatosRows,
    };

    const pdfBuffer = await new Promise((resolve, reject) => {
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => reject(err));

        doc.table(table, { startY: 50 });
        doc.end();
    });

    return pdfBuffer;
}
