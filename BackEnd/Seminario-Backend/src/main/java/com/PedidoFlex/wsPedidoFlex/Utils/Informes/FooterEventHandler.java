package com.PedidoFlex.wsPedidoFlex.Utils.Informes;

import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.kernel.pdf.PdfPage;
import com.itextpdf.kernel.pdf.canvas.parser.PdfCanvasProcessor;
import com.itextpdf.layout.element.Paragraph;

import java.io.IOException;

public class FooterEventHandler implements IEventHandler {
        @Override
        public void handleEvent(Event event) {
            PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
            PdfPage page = docEvent.getPage();
            PdfDocument pdf = docEvent.getDocument();

            // Obtener el número de página
            int pageNumber = pdf.getPageNumber(page);

            //Total de paginas
            int totalPages = pdf.getNumberOfPages();

            // Crear un canvas para el pie de página
            PdfCanvas canvas = new PdfCanvas(page);

            // Configurar el texto del pie de página
            String footerText = "Página " + pageNumber+ " de " + totalPages;
            ;

            // Establecer el font y la posición
            canvas.beginText();
            try {
                canvas.setFontAndSize(PdfFontFactory.createFont(), 10);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            canvas. moveText(300, 30); // Cambia estos valores según sea necesario
            canvas.showText(footerText);
            canvas.endText();
        }
}
