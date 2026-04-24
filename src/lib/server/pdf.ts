import { jsPDF } from 'jspdf';

export interface ConsentData {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	birthCity?: string;
	birthDate?: string;
	addressResidence?: string;
	cityResidence?: string;
	taxId?: string;
	notMinor?: boolean;
	signature?: string; // base64
	typedSignature?: string;
	signatureType: 'draw' | 'type';
	date: string;
	legalText: string;
	title: string;
	labels: {
		patient: string;
		email: string;
		phone: string;
		date: string;
		birthCity: string;
		birthDate: string;
		addressResidence: string;
		cityResidence: string;
		taxId: string;
		notMinor: string;
	};
}

export async function generateConsentPDF(data: ConsentData): Promise<Uint8Array> {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	const name = `${data.firstName} ${data.lastName}`;

	// Header/Logo Placeholder
	doc.setFont('times', 'bold');
	doc.setFontSize(10);
	doc.text('Dr. Patrycja Wardal - wardalpsy.com', margin, 15);
	doc.setDrawColor(200, 200, 200);
	doc.line(margin, 18, pageWidth - margin, 18);

	// Title
	doc.setFont('times', 'bold');
	doc.setFontSize(16);
	const splitTitle = doc.splitTextToSize(data.title.toUpperCase(), pageWidth - margin * 2);
	doc.text(splitTitle, pageWidth / 2, 30, { align: 'center' });

	// Patient Info Box
	let infoY = 40;
	doc.setDrawColor(230, 230, 230);
	doc.setFillColor(249, 249, 249);
	doc.rect(margin, infoY, pageWidth - margin * 2, 55, 'FD');

	doc.setFontSize(9);
	const addInfoField = (label: string, value: string, y: number) => {
		doc.setFont('helvetica', 'bold');
		doc.text(`${label}:`, margin + 5, y);
		doc.setFont('helvetica', 'normal');
		doc.text(value || '-', margin + 45, y);
	};

	addInfoField(data.labels.patient, name, infoY + 8);
	addInfoField(data.labels.email, data.email, infoY + 14);
	if (data.phone) addInfoField(data.labels.phone, data.phone, infoY + 20);
	addInfoField(data.labels.birthCity, data.birthCity || '', infoY + 26);
	addInfoField(data.labels.birthDate, data.birthDate || '', infoY + 32);
	addInfoField(data.labels.addressResidence, `${data.addressResidence || ''}, ${data.cityResidence || ''}`, infoY + 38);
	addInfoField(data.labels.taxId, data.taxId || '', infoY + 44);
	addInfoField(data.labels.date, data.date, infoY + 50);

	// Legal Text
	doc.setFontSize(10);
	doc.setFont('times', 'normal');
	
	const cleanText = data.legalText
		.replace(/###?\s/g, '')
		.replace(/\*\*/g, '')
		.replace(/\*/g, '')
		.replace(/---/g, '');

	const splitText = doc.splitTextToSize(cleanText, pageWidth - margin * 2);
	
	let currentY = infoY + 65;
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
