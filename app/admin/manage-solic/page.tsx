import { getCertificatesRequests } from "../data";
import { SelectSolicitud } from "@/db/schema";
import { CardSolicitud } from "./components/card-solicitud";

type Solicitudes = SelectSolicitud[];

export default async function ManageSolic() {
    const data: Solicitudes = await getCertificatesRequests();
    return (
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 mx-auto max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Solicita certificado de revisión:</h1>
            {data.map((solicitud, index) => (
                <div className="mb-4" key={index}>
                    <CardSolicitud {...solicitud} />
                </div>
            ))}
        </div>
    )
}
