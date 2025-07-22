import PDFDocument from 'pdfkit-table';
import { getResultadosVotacion } from '../services/votation.service.js';
import { getResultadosVotacionActivos } from '../services/votation.service.js';

// PDF GENERA CANDIDATOS CON VOTOS RESPECTIVOS
export async function generatePDF() {

    const resultados = await getResultadosVotacion();
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Tabla de candidatos postulados y votos
    const candidatosRows = resultados.candidatos.map(c => [c.rut, c.nombre, c.apellido, c.cargo, c.cantidad_votos]);

    const table = {
        title: { label: 'Informe de Votaciones', color: 'blue' },
        headers: ['Rut', 'Nombre', 'Apellido', 'Cargo', 'Votos'],
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

// PDF GENERA LISTA DE PARTCIPANTES ACTIVOS SI VOTARON O NO
export async function generatePDFVotos() {
    const resultados = await getResultadosVotacionActivos();
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Tabla de votos
    const votosRows = resultados.votos.map(v => [v.rut, v.nombre, v.apellido, v.voto]);

    const table = {
        title: { label: 'Listado Participantes Activos', color: 'green' },
        headers: ['Rut', 'Nombre', 'Apellido', 'Voto'],
        rows: votosRows,
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