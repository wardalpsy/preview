import { jsPDF } from 'jspdf';

export interface ConsentData {
	firstName: string;
	lastName: string;
	email: string;
	signature?: string; // base64
	typedSignature?: string;
	signatureType: 'draw' | 'type';
	date: string;
	legalText: string;
	title: string;
}

export async function generateConsentPDF(data: ConsentData): Promise<Uint8Array> {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	const name = `${data.firstName} ${data.lastName}`;

	// Header/Logo Placeholder (Optional, using text for now)
	doc.setFont('times', 'bold');
	doc.setFontSize(10);
	doc.text('Dr. Patrycja Wardal - wardalpsy.com', margin, 15);
	doc.setDrawColor(200, 200, 200);
	doc.line(margin, 18, pageWidth - margin, 18);

	// Title (Dynamic from translation)
	doc.setFont('times', 'bold');
	doc.setFontSize(16);
	const splitTitle = doc.splitTextToSize(data.title.toUpperCase(), pageWidth - margin * 2);
	doc.text(splitTitle, pageWidth / 2, 30, { align: 'center' });

	// Patient Info Box
	doc.setDrawColor(230, 230, 230);
	doc.setFillColor(249, 249, 249);
	doc.rect(margin, 40, pageWidth - margin * 2, 25, 'FD');

	doc.setFontSize(10);
	doc.setFont('helvetica', 'bold');
	doc.text('Patient:', margin + 5, 48);
	doc.setFont('helvetica', 'normal');
	doc.text(name, margin + 25, 48);

	doc.setFont('helvetica', 'bold');
	doc.text('Email:', margin + 5, 54);
	doc.setFont('helvetica', 'normal');
	doc.text(data.email, margin + 25, 54);

	doc.setFont('helvetica', 'bold');
	doc.text('Date:', margin + 5, 60);
	doc.setFont('helvetica', 'normal');
	doc.text(data.date, margin + 25, 60);

	// Legal Text (The exact MD content)
	doc.setFontSize(10);
	doc.setFont('times', 'normal');
	
	// Clean up markdown markers for cleaner PDF text
	const cleanText = data.legalText
		.replace(/###?\s/g, '') // Remove headers
		.replace(/\*\*/g, '')   // Remove bold
		.replace(/\*/g, '')    // Remove italics
		.replace(/---/g, '');   // Remove horizontal rules

	const splitText = doc.splitTextToSize(cleanText, pageWidth - margin * 2);
	
	// Handle multi-page if text is too long
	let currentY = 75;
	const lineHeight = 5;
	
	for (let i = 0; i < splitText.length; i++) {
		if (currentY > pageHeight - 60) {
			doc.addPage();
			currentY = margin;
		}
		doc.text(splitText[i], margin, currentY);
		currentY += lineHeight;
	}

	// Signature Section
	currentY = Math.max(currentY + 10, pageHeight - 70);
	
	// Check if we need a new page for the signature
	if (currentY > pageHeight - 40) {
		doc.addPage();
		currentY = margin + 10;
	}

	doc.setDrawColor(0, 0, 0);
	doc.line(margin, currentY, margin + 80, currentY);
	
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(10);
	doc.text('Patient Digital Signature', margin, currentY + 5);

	if (data.signatureType === 'draw' && data.signature) {
		try {
			doc.addImage(data.signature, 'PNG', margin, currentY - 25, 50, 20);
		} catch (e) {
			console.error('Error adding signature to PDF:', e);
		}
	} else if (data.signatureType === 'type' && data.typedSignature) {
		doc.setFont('times', 'italic');
		doc.setFontSize(20);
		doc.text(data.typedSignature, margin + 5, currentY - 5);
	}

	// Footer
	doc.setFontSize(8);
	doc.setFont('helvetica', 'italic');
	doc.setDrawColor(200, 200, 200);
	doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
	doc.text('This document was signed electronically on wardalpsy.com and is legally binding.', pageWidth / 2, pageHeight - 10, { align: 'center' });

	return new Uint8Array(doc.output('arraybuffer'));
}
