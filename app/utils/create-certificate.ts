export const createCertificate = async (element: HTMLElement) => {
  const options = {
    margin: 1,
    filename: "certificadoASHF.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  };
  const { default: html2pdf } = await import("html2pdf.js");
  return html2pdf().set(options).from(element).save();
};
