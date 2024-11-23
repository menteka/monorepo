import { defaultConfig, defaultProfile } from './defaults';
import type { Config } from './types';

const activeProfileKey = 'activeProfile';

let config: Config = $state(defaultConfig);
let availableProfiles: { name: string; id: string }[] = $state([]);
let activeProfile: string = $state(defaultProfile);

export const possibleProfiles = ['1', '2', '3', '4', '5', '6'];

function profileSettingsKey(profileId: string) {
	return `settings${profileId}`;
}

export function initConfig() {
	const cachedProfile = localStorage.getItem(activeProfileKey);
	if (cachedProfile) {
		activeProfile = cachedProfile;
	} else {
		localStorage.setItem(activeProfileKey, activeProfile);
	}

	const key = profileSettingsKey(activeProfile);
	const cachedConfig = localStorage.getItem(key);

	if (cachedConfig) {
		config = JSON.parse(cachedConfig);
	} else {
		localStorage.setItem(key, JSON.stringify(config));
	}

	//Get profile names
	availableProfiles = possibleProfiles
		.map((id) => {
			const config = localStorage.getItem(profileSettingsKey(id));
			if (!config) return;
			return { id: id, name: JSON.parse(config).name };
		})
		.filter((e) => e !== undefined);
}

export function accessConfig() {
	function put(newConfig: Config) {
		config = newConfig;
	}

	function update<T extends keyof Config>(key: T, val: Config[T]) {
		config[key] = val;
	}

	return {
		get config() {
			return config;
		},
		get activeProfile() {
			return activeProfile;
		},
		get availableProfiles() {
			return availableProfiles;
		},
		get theme() {
			return config.theme;
		},
		put,
		update
	};
}
