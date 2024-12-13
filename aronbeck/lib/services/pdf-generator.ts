import jsPDF from 'jspdf';
import type { FormData } from '@/lib/schemas/conceitualizacao-schema';

export const generatePDF = (data: FormData) => {
  const doc = new jsPDF();
  const margin = 20;
  let yPos = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const fullBoxWidth = pageWidth - margin * 2;
  const halfBoxWidth = (fullBoxWidth - 10) / 2;
  const boxSpacing = 10;

  // Calcular altura fija para los campos de la primera página
  const titleHeight = 30; // Espacio para el título
  const footerHeight = 20; // Espacio para el footer
  const availableHeight = pageHeight - margin * 2 - titleHeight - footerHeight;
  const fixedBoxHeight = (availableHeight - boxSpacing * 3) / 4; // Dividir el espacio entre 4 campos

  // Función para dibujar un rectángulo con título y contenido
  const drawBox = (
    title: string,
    content: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    doc.rect(x, y, width, height);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(title, x + 5, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const splitText = doc.splitTextToSize(content, width - 10);
    doc.text(splitText, x + 5, y + 15);
  };

  // Función para agregar el logo centrado
  const addCenteredLogo = () => {
    const logoWidth = 40;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage('images/logo.png', 'PNG', logoX, yPos, logoWidth, logoHeight);
    yPos += logoHeight + 10;
  };

  // Primera página
  addCenteredLogo();

  // Título centrado
  doc.setFontSize(18);
  const title = 'MODELO DE CONCEITUALIZAÇÃO JUDITH BECK';
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, yPos);
  yPos += titleHeight;

  // Dibujar los cuatro campos principales con altura fija
  drawBox(
    'Dados relevantes da história',
    data.dadosHistoria,
    margin,
    yPos,
    fullBoxWidth,
    fixedBoxHeight
  );
  yPos += fixedBoxHeight + boxSpacing;

  drawBox(
    'Crenças Centrais',
    data.crencasCentrais,
    margin,
    yPos,
    fullBoxWidth,
    fixedBoxHeight
  );
  yPos += fixedBoxHeight + boxSpacing;

  drawBox(
    'Crenças-Regra',
    data.crencasRegra,
    margin,
    yPos,
    fullBoxWidth,
    fixedBoxHeight
  );
  yPos += fixedBoxHeight + boxSpacing;

  drawBox(
    'Estratégias Compensatórias ou de Manutenção de Crenças',
    data.estrategiasCompensatorias,
    margin,
    yPos,
    fullBoxWidth,
    fixedBoxHeight
  );

  // Segunda página - Situaciones en paralelo
  doc.addPage();
  yPos = 20;
  addCenteredLogo();

  // Título centrado en segunda página
  doc.setFontSize(18);
  doc.text(title, titleX, yPos);
  yPos += titleHeight;

  // Columnas para situaciones
  const col1X = margin;
  const col2X = margin + halfBoxWidth + 10;
  const situationHeight = 25;

  // Dibujar situaciones en paralelo
  const drawSituationBoxes = (
    situacao: FormData['situacao1'],
    x: number,
    index: number
  ) => {
    drawBox(
      `Situación ${index}`,
      situacao.situacao,
      x,
      yPos,
      halfBoxWidth,
      situationHeight
    );
    yPos += situationHeight + boxSpacing / 2;

    drawBox(
      'Pensamiento Automático',
      situacao.pensamentoAutomatico,
      x,
      yPos,
      halfBoxWidth,
      situationHeight
    );
    yPos += situationHeight + boxSpacing / 2;

    drawBox(
      'Significado do PA',
      situacao.significadoPA,
      x,
      yPos,
      halfBoxWidth,
      situationHeight
    );
    yPos += situationHeight + boxSpacing / 2;

    drawBox('Emoção', situacao.emocao, x, yPos, halfBoxWidth, situationHeight);
    yPos += situationHeight + boxSpacing / 2;

    drawBox(
      'Comportamento',
      situacao.comportamento,
      x,
      yPos,
      halfBoxWidth,
      situationHeight
    );
    yPos += situationHeight + boxSpacing;
  };

  // Dibujar ambas situaciones
  const startY = yPos; // Guardamos la posición inicial
  drawSituationBoxes(data.situacao1, col1X, 1);

  yPos = startY; // Volvemos a la posición inicial para la segunda situación
  drawSituationBoxes(data.situacao2, col2X, 2);

  // Footer
  doc.setFontSize(10);
  doc.text(
    'Fonte: adaptado de BECK (2022)',
    margin,
    doc.internal.pageSize.height - 10
  );

  // Descargar PDF
  doc.save('conceptualizacion-caso.pdf');
};
