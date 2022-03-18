const { PDFDocument,rgb } = PDFLib;

document
  .getElementById("generate-certi-button")
  .addEventListener("click", modifyPdf);

async function modifyPdf() {
  const bytes = await fetch("certificate-template.pdf").then((res) =>
    res.arrayBuffer()
  );
  const fontBytes = await fetch("Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );
  const value=document.getElementById("name-input").value;
  const pdfDoc = await PDFDocument.load(bytes);
  pdfDoc.registerFontkit(fontkit);
  const Sanchez = await pdfDoc.embedFont(fontBytes);
  const pages = pdfDoc.getPages();

  pages[0].drawText(value, {
    x:(value.length===5)?240:(210) - ((value.length - 5) * 8),
    y:350,
    font: Sanchez,
    size:65,
    color:rgb(0,0.85,0.85),
  });

  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes]), `${value}-certificate.pdf`);
}
