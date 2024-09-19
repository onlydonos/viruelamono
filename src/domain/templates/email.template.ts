import { envs } from "../../config/envs.plugin";

export function generatesmallpoxEmailTemplate(genre: string, age: number, lat: number, lng: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng)
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notificación de Incidente Sanitario - Viruela del Mono</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
            
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #f4f0f8;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 2px solid #9c89b8;
            }
            .header {
                background-color: #9c89b8;
                color: #ffffff;
                padding: 30px;
                text-align: center;
                position: relative;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .header::after {
                content: url('https://example.com/health-icon.png'); /* Ícono de sanidad */
                position: absolute;
                top: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
            }
            .content {
                padding: 25px;
                font-size: 16px;
                line-height: 1.7;
            }
            .content p {
                margin: 15px 0;
            }
            .content strong {
                color: #9c89b8;
            }
            .map-container {
                text-align: center;
                margin-top: 20px;
            }
            .map-img {
                width: 100%;
                height: auto;
                border-radius: 10px;
                border: 2px solid #9c89b8;
            }
            .footer {
                background-color: #ece1f8;
                color: #555;
                padding: 15px;
                text-align: center;
                font-size: 12px;
            }
            .highlight {
                background-color: #dfd6f0;
                padding: 5px;
                border-radius: 5px;
            }
            .alert-banner {
                background-color: #b48bd8;
                color: white;
                font-size: 14px;
                padding: 10px;
                text-align: center;
                font-weight: bold;
                text-transform: uppercase;
            }
            @media (max-width: 768px) {
                .container {
                    margin: 20px auto;
                }
                .header h1 {
                    font-size: 22px;
                }
                .content {
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Notificación de Incidente Sanitario</h1>
                <p>Viruela del Mono</p>
            </div>
            <div class="alert-banner">
                Incidente reciente en tu área
            </div>
            <div class="content">
                <p><strong>Datos del caso confirmado:</strong></p>
                <p><strong>Género del paciente:</strong> <span class="highlight">${genre}</span></p>
                <p><strong>Edad del paciente:</strong> <span class="highlight">${age} años</span></p>
                <p><strong>Ubicación geográfica aproximada:</strong> Latitud ${lat}, Longitud ${lng}</p>
                <div class="map-container">
                    <img class="map-img" src="${mapboxUrl}" alt="Ubicación del incidente"/>
                </div>
                <p>Se recomienda seguir las pautas establecidas por las autoridades sanitarias y mantenerse informado a través de canales oficiales. Para más información sobre las medidas preventivas y de seguridad, visite el sitio web de su institución de salud local.</p>
            </div>
            <div class="footer">
                <p>Este mensaje es generado automáticamente con fines informativos. Por favor, no responda a este correo.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 13;
    const width = 800;
    const height = 500;

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}