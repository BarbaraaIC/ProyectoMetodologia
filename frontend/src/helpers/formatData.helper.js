import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatEventData(event) {
    return {
        ...event,
        titulo: startCase(event.titulo),
        tipo: startCase(event.tipo),
        lugar: startCase(event.lugar),
        fecha: formatTempo(event.fecha, "DD-MM-YYYY")
    };
}