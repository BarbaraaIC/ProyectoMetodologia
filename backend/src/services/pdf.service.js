import PDFDocument from 'pdfkit';
import 'pdfkit-table';
import { getUsersService } from './user.service.js';

export async function generatePDF() {
    const [usersData, error] = await getUsersService();

    if (error) {
    throw new Error(error);
    }

    if (!usersData || usersData.length === 0) {
    throw new Error("No hay usuarios para generar el PDF");
    }

    const validUsers = usersData.filter(user => user && user.username && user.rut);

    if (validUsers.length === 0) {
    throw new Error('No hay usuarios válidos para generar el PDF');
    }

    const rows = validUsers.map(user => [user.username, user.rut]);

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    const pdfBuffer = await new Promise((resolve, reject) => {
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', (err) => reject(err));

    const table = {
        title: { label: 'Informe de Votaciones', color: 'blue' },
        headers: ['Nombre de usuario', 'Rut'],
        rows,
    };

    doc.table(table, { startY: 50 });
    doc.end();
    });

    return pdfBuffer;
}
