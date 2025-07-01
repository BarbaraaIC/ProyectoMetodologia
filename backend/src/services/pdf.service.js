import PDFdocument from 'pdfkit-table'; //generara el pdf con la informacion de la BD
import {getUsersServices} from './user.services.js'; //listar todos los usuarios creados

export async function generatePDF(){
    try{
        //CREAR PDF
        const doc = new PDFdocument({margin: 20, size: 'Carta'});
        let usersData, error;
        [usersData, error] = await getUsersServices();

        if(error){
            return [null, error];
        }

        const pdfBuffer = await new Promise ((resolve, reject) => {
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);

            const table = {
                title: {label: 'Resultado Votaciones', color: 'green'},
                headers: ['Nombre', 'Rut'],
                rows: usersData.map(user => [user.nombreCompleto, user.Rut])
            };

            doc.table(table, {starY:50});
            doc.end();
        });
            return [pdfBuffer, null];
    }catch (error) {
        return [null, error.message || 'Error al crear PDF'];
    }
}

