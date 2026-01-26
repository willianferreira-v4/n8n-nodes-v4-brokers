import type { ICredentialDataDecryptedObject } from 'n8n-workflow';

export function logRequestDebug(): void {
	// Debug stub - implementation can be added when needed
}

export function validateCredentials(credentials: ICredentialDataDecryptedObject): string[] {
	const errors: string[] = [];

	if (!credentials.baseUrl) {
		errors.push('Base URL não configurada');
	} else if (typeof credentials.baseUrl !== 'string') {
		errors.push('Base URL deve ser uma string');
	} else if (!credentials.baseUrl.startsWith('http')) {
		errors.push('Base URL deve começar com http:// ou https://');
	}

	if (!credentials.clientId) {
		errors.push('Client ID não configurado');
	}

	if (!credentials.clientSecret) {
		errors.push('Client Secret não configurado');
	}

	if (!credentials.categoryId) {
		errors.push('Category ID não configurado');
	}

	if (!credentials.segmentId) {
		errors.push('Segment ID não configurado');
	}

	if (!credentials.campaignId) {
		errors.push('Campaign ID não configurado');
	}

	if (!credentials.createdBy) {
		errors.push('Created By não configurado');
	}

	if (!credentials.tenantBrandId) {
		errors.push('Tenant Brand ID não configurado');
	}

	return errors;
}
