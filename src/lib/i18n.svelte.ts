import en from './locales/en.json';
import it from './locales/it.json';
import pl from './locales/pl.json';
// Define a type to satisfy ESLint
export type TranslationSchema = typeof en;

const translations: Record<string, TranslationSchema> = { en, it, pl };

class I18nManager {
	// Initialize with 'en'
	currentLang = $state('en');

	// Use a getter for 't' to ensure it's always looking at the current state
	get t(): TranslationSchema {
		return translations[this.currentLang] || translations['en'];
	}

	setLanguage(newLang: string | undefined) {
		// If lang is undefined (root path), default to 'en'
		const target = newLang || 'en';
		if (translations[target]) {
			this.currentLang = target;
		} else {
			this.currentLang = 'en';
		}
	}
}

export const i18n = new I18nManager();
