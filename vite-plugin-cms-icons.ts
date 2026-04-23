import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function cmsIconsPlugin(): Plugin {
	const virtualModuleId = 'virtual:cms-icons';
	const resolvedVirtualModuleId = '\0' + virtualModuleId;

	function getIconNames(): string[] {
		// Read the CMS JSON files
		const icons = new Set<string>();

		const dataDir = path.resolve('./src/lib/locales/');
		if (!fs.existsSync(dataDir)) return [];

		const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));

		for (const file of files) {
			try {
				const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
				// Recursively find all "icon" string values
				extractIcons(content, icons);
			} catch (e) {
				console.error(`[cms-icons] Error parsing ${file}:`, e);
			}
		}

		return [...icons].filter(Boolean);
	}

	function extractIcons(obj: unknown, icons: Set<string>): void {
		if (!obj || typeof obj !== 'object') return;
		if (Array.isArray(obj)) {
			obj.forEach((v) => extractIcons(v, icons));
			return;
		}
		for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
			if (key === 'icon' && typeof value === 'string' && value) {
				icons.add(value);
			} else {
				extractIcons(value, icons);
			}
		}
	}

	return {
		name: 'cms-icons',
		resolveId(id) {
			if (id === virtualModuleId) return resolvedVirtualModuleId;
		},
		load(id) {
			if (id !== resolvedVirtualModuleId) return;

			const iconNames = getIconNames();
			console.log(`[cms-icons] Found icons in JSON:`, iconNames);

			// Generate static imports for each icon used in the jsons
			// Using virtual:icons prefix for consistency with Approach.svelte
			const imports = iconNames
				.map((name, i) => `import icon_${i} from 'virtual:icons/tabler/${name}';`)
				.join('\n');

			const mapEntries = iconNames.map((name, i) => `  "${name}": icon_${i}`).join(',\n');

			return `
${imports}

export const icons = {
${mapEntries}
};

export function getIcon(name) {
  if (!name) return null;
  return icons[name] ?? null;
}
`;
		},
		// Re-run when JSON data changes in dev
		configureServer(server) {
			const dataDir = path.resolve('./src/lib/locales/');
			server.watcher.add(dataDir);
			server.watcher.on('change', (file) => {
				if (file.includes('src/lib/locales')) {
					console.log(`[cms-icons] Locale changed, invalidating virtual module...`);
					const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
					if (mod) {
						server.moduleGraph.invalidateModule(mod);
						server.ws.send({ type: 'full-reload' });
					}
				}
			});
		}
	};
}
