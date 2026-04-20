// src/lib/types/cal-v2.ts

export interface CalSlotsResponse {
	status: 'success' | 'error';
	data: {
		slots: Record<string, CalSlot[]>; // keyed by date: "2024-01-15"
	};
	error?: CalApiError;
}

export interface CalSlot {
	time?: string; // ISO: "2024-01-15T09:00:00.000Z"
	start?: string;
	end?: string;
	attendees?: number;
	bookingUid?: string;
}

export interface CalBookingRequest {
	// Use either eventTypeId OR (eventTypeSlug + username/teamSlug)
	eventTypeId?: number;
	eventTypeSlug?: string;
	username?: string;
	teamSlug?: string; // For team bookings

	start: string; // ISO timestamp (UTC)
	attendee: {
		name: string;
		email: string;
		timeZone: string;
		phoneNumber?: string; // Optional but required if SMS workflow is on
		language?: string; // e.g. "en"
	};
	location?: {
		type: string; // e.g. 'daily_video', 'integrations:google:meet', 'phone'
	};
	bookingFieldsResponses?: Record<string, any>;
	metadata?: Record<string, any>;
	instant?: boolean;
}

export interface CalBookingResponse {
	status: 'success' | 'error';
	data?: {
		id: number; // Numeric internal ID
		uid: string; // String public identifier
		status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
		paymentUid?: string;
		start: string;
		end: string;
		attendee: {
			name: string;
			email: string;
			timeZone: string;
		};
		// Additional fields like meetingUrl may appear here
	};
	error?: CalApiError;
}

interface CalApiError {
	message: string;
	code: string;
}
