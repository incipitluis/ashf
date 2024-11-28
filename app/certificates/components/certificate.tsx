"use client";

interface CertificateProps {
  articulo: string;
  autor: string;
  year: string;
  certificateRef: React.RefObject<HTMLDivElement>;
  isChecked: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({
  articulo,
  autor,
  year,
  certificateRef,
  isChecked,
}) => {
  const date = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div
      className="w-[310mm] h-[230mm] p-14 bg-white text-black flex flex-col items-center"
      ref={certificateRef}
    >
      <div className="w-full flex justify-center mb-8">
        <img
          src="/filosofia-y-sociedad.jpg"
          alt="UCM Logo"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
      <h1 className="text-2xl font-bold mb-8">
        Anales del Seminario de Historia de la Filosofía
      </h1>

      <p className="text-xl mb-8">
        Certifico que, tras recibir los informes favorables correspondientes, la
        Revista Anales del Seminario de Historia de la Filosofía, ISSN:
        1998-2564, ha decidido con fecha {date} ACEPTAR para su publicación el
        siguiente estudio de{" "}
        <span className="font-bold" data-field="autor">
          {autor}
        </span>
        :
      </p>
      <p className="text-xl mb-8">
        <span className="font-bold" data-field="titulo">
          {articulo}
        </span>
        ,{" "}
        <span className="font-bold" data-field="year">
          {year}
        </span>
      </p>
      <p className="text-xl mb-8">
        La Revista Anales del Seminario de Historia de la Filosofía es una
        publicación de periodicidad cuatrimestral, que pertenece al Departamento
        de Filosofía y Sociedad, de la Facultad de Filosofía de la Universidad
        Complutense de Madrid. En sus páginas se editan investigaciones sobre
        problemas historiográficos de la Filosofía y sobre cuestiones
        filosóficas desde la antigüedad hasta la actualidad. Ocupa una posición
        Q2 en SJR y cuenta con el sello de calidad de la FECYT.
      </p>
      {!isChecked && (
        <>
          <p className="text-red-500 mb-2">
            Este certificado no ha sido verificado y no tiene validez oficial.
          </p>
          <p className="text-red-500 mb-2">
            Click en descargar para verificar el certificado.
          </p>
        </>
      )}

      <p className="mb-8">En Madrid, a la fecha de la firma,</p>
      <p>Nombre del secretario</p>
      <p>Secretario de redacción</p>
    </div>
  );
};
