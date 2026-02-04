import type { V4BrokersConfig } from './fields';

export function logRequestDebug(): void {
	// Debug stub - implementation can be added when needed
}

export function validateConfig(config: V4BrokersConfig): string[] {
	const errors: string[] = [];

	if (!config.baseUrl) {
		errors.push('Base URL não configurada');
	} else if (typeof config.baseUrl !== 'string') {
		errors.push('Base URL deve ser uma string');
	} else if (!config.baseUrl.startsWith('http')) {
		errors.push('Base URL deve começar com http:// ou https://');
	}

	if (!config.clientId) {
		errors.push('Client ID não configurado');
	}

	if (!config.clientSecret) {
		errors.push('Client Secret não configurado');
	}

	if (!config.categoryId) {
		errors.push('Category ID não configurado');
	}

	if (!config.segmentId) {
		errors.push('Segment ID não configurado');
	}

	if (!config.campaignId) {
		errors.push('Campaign ID não configurado');
	}

	if (!config.createdBy) {
		errors.push('Created By não configurado');
	}

	if (!config.tenantBrandId) {
		errors.push('Tenant Brand ID não configurado');
	}

	return errors;
}
