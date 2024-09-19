import cron from 'node-cron';
import { SmallpoxModel } from '../../data/models/smallpox.model';
import { EmailService } from '../services/email.service';
import { generatesmallpoxEmailTemplate } from '../templates/email.template';

const emailService = new EmailService();

export const emailJob = () => {
    cron.schedule("*/10 * * * * *", async () => {
        try {
            const smallpoxs = await SmallpoxModel.find({ isSent: false });
            
            if (!smallpoxs.length) {
                console.log("No hay casos de virulea del mono pendientes por enviar");
                return;
            }

            console.log(`Procesando ${smallpoxs.length} casos de viruela del mono`);

            await Promise.all(
                smallpoxs.map(async (smallpox: { genre: string; age: number; lat: number; lng: number; _id: any; }) => {
                    try {
                        const htmlBody = generatesmallpoxEmailTemplate(
                            smallpox.genre,
                            smallpox.age,
                            smallpox.lat,
                            smallpox.lng
                        );

                        await emailService.sendEmail({
                            to: "donovanvincelara@gmail.com",
                            subject: `Nuevo caso de viruela del mono`,
                            htmlBody: htmlBody,
                        });

                        console.log(`Email enviado para el caso con Id ${smallpox._id}`);

                        await SmallpoxModel.findByIdAndUpdate(smallpox._id, { isSent: true });

                        console.log(`Caso de viruela del mono con Id ${smallpox._id} actualizado como email enviado`);
                    } catch (error) {
                        console.error(`Error al procesar el caso con Id ${smallpox._id}:`, error);
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envío de correos:", error);
        }
    });
};
