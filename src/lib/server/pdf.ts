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
		acknowledgement: string;
		heading: string;
	};
}

export async function generateConsentPDF(data: ConsentData): Promise<Uint8Array> {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	const name = `${data.firstName} ${data.lastName}`;

	// Header
	doc.setFont('times', 'bold');
	doc.setFontSize(10);
	doc.text(data.labels.heading, margin, 15);
	doc.setDrawColor(200, 200, 200);
	doc.line(margin, 18, pageWidth - margin, 18);

	// Title
	doc.setFont('times', 'bold');
	doc.setFontSize(16);
	const splitTitle = doc.splitTextToSize(data.title.toUpperCase(), pageWidth - margin * 2);
	doc.text(splitTitle, pageWidth / 2, 30, { align: 'center' });

	// Patient Info Box
	let currentY = 40;
	doc.setDrawColor(230, 230, 230);
	doc.setFillColor(249, 249, 249);
	doc.rect(margin, currentY, pageWidth - margin * 2, 55, 'FD');

	doc.setFontSize(9);
	const addInfoField = (label: string, value: string, y: number) => {
		doc.setFont('helvetica', 'bold');
		doc.text(`${label}:`, margin + 5, y);
		doc.setFont('helvetica', 'normal');
		doc.text(value || '-', margin + 45, y);
	};

	addInfoField(data.labels.patient, name, currentY + 8);
	addInfoField(data.labels.email, data.email, currentY + 14);
	if (data.phone) addInfoField(data.labels.phone, data.phone, currentY + 20);
	addInfoField(data.labels.birthCity, data.birthCity || '', currentY + 26);
	addInfoField(data.labels.birthDate, data.birthDate || '', currentY + 32);
	addInfoField(
		data.labels.addressResidence,
		`${data.addressResidence || ''}, ${data.cityResidence || ''}`,
		currentY + 38
	);
	addInfoField(data.labels.taxId, data.taxId || '', currentY + 44);
	addInfoField(data.labels.date, data.date, currentY + 50);

	currentY += 75; //text sapce from initial field

	// Legal Text Processing
	const lines: { text: string; font: string; size: number; spacing: number }[] = [];
	const rawLines = data.legalText.split('\n');

	for (let line of rawLines) {
		line = line.trim();
		// Skip empty lines or horizontal rules
		if (!line || line === '---' || line === '***' || line === '___') {
			lines.push({ text: '', font: 'times', size: 10, spacing: 5 });
			continue;
		}

		// Check for Headers
		if (line.startsWith('#')) {
			let level = 0;
			while (line[level] === '#') level++;
			const cleanHeader = line
				.replace(/^#+\s*/, '')
				.replace(/\*\*/g, '')
				.replace(/\*/g, '')
				.replace(/__/g, '')
				.replace(/_/g, '');

			// Add extra space BEFORE the header
			lines.push({ text: '', font: 'times', size: 10, spacing: 9 });

			const fontSize = level === 1 ? 14 : level === 2 ? 12 : 11;
			// Reduced spacing AFTER the header
			lines.push({ text: cleanHeader, font: 'times', size: fontSize, spacing: 6 });
		} else {
			const cleanLine = line
				.replace(/\*\*/g, '')
				.replace(/\*/g, '')
				.replace(/__/g, '')
				.replace(/_/g, '');
			const splitLines = doc.splitTextToSize(cleanLine, pageWidth - margin * 2);
			for (const s of splitLines) {
				lines.push({ text: s, font: 'times', size: 10, spacing: 5 });
			}
		}
	}

	// Add Acknowledgement
	lines.push({ text: '', font: 'times', size: 10, spacing: 10 });
	const ackLines = doc.splitTextToSize(data.labels.acknowledgement, pageWidth - margin * 2);
	for (const al of ackLines) {
		lines.push({ text: al, font: 'times', size: 10, spacing: 5 });
	}

	// Intelligent Page Splitting
	const bottomLimit = pageHeight - 40;
	const pageLines: (typeof lines)[] = [[]];
	let currentPageIndex = 0;
	let tempY = currentY;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (tempY + line.spacing > bottomLimit) {
			pageLines.push([]);
			currentPageIndex++;
			tempY = margin + 20; // Start new page with some top margin
		}
		pageLines[currentPageIndex].push(line);
		tempY += line.spacing;
	}

	// Content Balancing: If second page is too sparse, move lines from first page
	if (pageLines.length === 2 && pageLines[1].length < 5) {
		const moveCount = Math.min(pageLines[0].length - 10, 5 - pageLines[1].length + 2);
		if (moveCount > 0) {
			const moved = pageLines[0].splice(-moveCount);
			pageLines[1] = [...moved, ...pageLines[1]];
		}
	}

	// Render Pages
	for (let p = 0; p < pageLines.length; p++) {
		if (p > 0) {
			doc.addPage();
			currentY = margin + 20;
		}
		for (const line of pageLines[p]) {
			if (line.text) {
				doc.setFont(line.font, line.size > 10 ? 'bold' : 'normal');
				doc.setFontSize(line.size);
				doc.text(line.text, margin, currentY);
			}
			currentY += line.spacing;
		}
	}

	// Signature Section (must be on the last page)
	currentY += 40;
	if (currentY > pageHeight - 40) {
		doc.addPage();
		currentY = margin + 30;
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
			console.error('Error adding signature:', e);
		}
	} else if (data.signatureType === 'type' && data.typedSignature) {
		doc.setFont('times', 'italic');
		doc.setFontSize(20);
		doc.text(data.typedSignature, margin + 5, currentY - 5);
	}

	// Footer (on every page)
	const totalPages = (doc as any).internal.getNumberOfPages();
	for (let i = 1; i <= totalPages; i++) {
		doc.setPage(i);
		doc.setFontSize(8);
		doc.setFont('helvetica', 'italic');
		doc.setDrawColor(200, 200, 200);
		doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
		doc.text(
			'This document was signed electronically on wardalpsy.com and is legally binding.',
			pageWidth / 2,
			pageHeight - 10,
			{ align: 'center' }
		);
	}

	return new Uint8Array(doc.output('arraybuffer'));
}
