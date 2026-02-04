import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	IDataObject,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type {
	CreateLeadRequest,
	CreateLeadField,
	UpdateLeadRequest,
	UpdateLeadField,
	RelistLeadRequest,
} from './types';
import { logRequestDebug, validateConfig } from './debug';
import { LEAD_FIELDS, type FieldIdsConfig, type V4BrokersConfig } from './fields';

// Helper function to parse config from credentials
function parseConfig(credentials: ICredentialDataDecryptedObject): V4BrokersConfig {
	const configRaw = credentials.config;

	if (typeof configRaw === 'string') {
		try {
			return JSON.parse(configRaw) as V4BrokersConfig;
		} catch {
			throw new Error('Invalid JSON in credentials config');
		}
	}

	if (typeof configRaw === 'object' && configRaw !== null) {
		return configRaw as unknown as V4BrokersConfig;
	}

	throw new Error('Credentials config is missing or invalid');
}

export async function createLead(
	this: IExecuteFunctions,
	index: number,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Parse config from credentials
	const config = parseConfig(credentials);

	// Validate config
	const configErrors = validateConfig(config);
	if (configErrors.length > 0) {
		throw new NodeOperationError(
			this.getNode(),
			`Erro nas credenciais:\n- ${configErrors.join('\n- ')}`,
			{ itemIndex: index },
		);
	}

	const rawExternalId = this.getNodeParameter('externalId', index) as string;
	const externalId =
		typeof rawExternalId === 'string' ? rawExternalId.trim() : String(rawExternalId).trim();
	const value = this.getNodeParameter('value', index) as number;

	// Get fieldIds from config
	const fieldIds = config.fieldIds || {};

	// Build fields array from individual parameters
	const fields: CreateLeadField[] = [];
	for (const fieldDef of LEAD_FIELDS) {
		const rawFieldValue = this.getNodeParameter(fieldDef.name, index, '') as string;
		const fieldValue =
			typeof rawFieldValue === 'string' ? rawFieldValue.trim() : String(rawFieldValue).trim();

		// Get fieldId from the fieldIds JSON object
		const fieldId = (fieldIds[fieldDef.fieldIdKey as keyof FieldIdsConfig] || '').trim();

		// Only include field if value is provided and fieldId is configured
		if (fieldValue !== '' && fieldId !== '') {
			fields.push({
				fieldId,
				name: fieldDef.displayName,
				value: fieldValue,
				type: 'text', // Default type
			});
		}
	}

	const body: CreateLeadRequest = {
		externalId,
		categoryId: config.categoryId,
		segmentId: config.segmentId,
		campaignId: config.campaignId,
		createdBy: config.createdBy,
		value,
		fields,
	};

	const fullUrl = `${config.baseUrl}/auctionable-product`;

	const requestOptions: IHttpRequestOptions = {
		method: 'POST',
		url: fullUrl,
		body,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
			'x-client-id': config.clientId,
			'x-client-secret': config.clientSecret,
		},
		skipSslCertificateValidation: false,
		returnFullResponse: false,
	};

	// Log debug info
	logRequestDebug();

	return await this.helpers.httpRequest.call(this, requestOptions);
}

export async function updateLead(this: IExecuteFunctions, index: number): Promise<IDataObject> {
	const credentials = await this.getCredentials('v4BrokersApi');

	// Parse config from credentials
	const config = parseConfig(credentials);

	// Validate config
	const configErrors = validateConfig(config);
	if (configErrors.length > 0) {
		throw new NodeOperationError(
			this.getNode(),
			`Erro nas credenciais:\n- ${configErrors.join('\n- ')}`,
			{ itemIndex: index },
		);
	}

	const rawExternalId = this.getNodeParameter('externalIdUpdate', index) as string;
	const externalId =
		typeof rawExternalId === 'string' ? rawExternalId.trim() : String(rawExternalId).trim();

	// Get fieldIds from config
	const fieldIds = config.fieldIds || {};

	// Build fields array from individual parameters
	const fields: UpdateLeadField[] = [];
	for (const fieldDef of LEAD_FIELDS) {
		const rawFieldValue = this.getNodeParameter(`update_${fieldDef.name}`, index, '') as string;
		const fieldValue =
			typeof rawFieldValue === 'string' ? rawFieldValue.trim() : String(rawFieldValue).trim();

		// Get fieldId from the fieldIds JSON object
		const fieldId = (fieldIds[fieldDef.fieldIdKey as keyof FieldIdsConfig] || '').trim();

		// Only include field if value is provided and fieldId is configured
		if (fieldValue !== '' && fieldId !== '') {
			fields.push({
				fieldId,
				value: fieldValue,
			});
		}
	}

	const body: UpdateLeadRequest = {
		externalId,
		fields,
	};

	const fullUrl = `${config.baseUrl}/auctionable-product`;

	const requestOptions: IHttpRequestOptions = {
		method: 'PUT',
		url: fullUrl,
		body,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
			'x-client-id': config.clientId,
			'x-client-secret': config.clientSecret,
		},
		skipSslCertificateValidation: false,
		returnFullResponse: false,
	};

	// Log debug info
	logRequestDebug();

	return await this.helpers.httpRequest.call(this, requestOptions);
}

export async function relistLead(
	this: IExecuteFunctions,
	index: number,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Parse config from credentials
	const config = parseConfig(credentials);

	// Validate config
	const configErrors = validateConfig(config);
	if (configErrors.length > 0) {
		throw new NodeOperationError(
			this.getNode(),
			`Erro nas credenciais:\n- ${configErrors.join('\n- ')}`,
			{ itemIndex: index },
		);
	}

	const rawExternalId = this.getNodeParameter('externalIdRelist', index) as string;
	const externalId =
		typeof rawExternalId === 'string' ? rawExternalId.trim() : String(rawExternalId).trim();

	// Get initialValue, treating empty/0 as "not provided"
	let initialValue: number | undefined;
	try {
		const rawValue = this.getNodeParameter('initialValue', index, '') as number | string;
		if (rawValue !== '' && rawValue !== null && rawValue !== undefined) {
			const numValue = typeof rawValue === 'string' ? parseFloat(rawValue) : rawValue;
			if (!isNaN(numValue) && numValue > 0) {
				initialValue = numValue;
			}
		}
	} catch {
		// initialValue is optional, ignore errors
	}

	const body: RelistLeadRequest = {
		externalId,
		tenantBrandId: config.tenantBrandId,
	};

	// Only include initialValue if it's provided and valid
	if (initialValue !== undefined && initialValue > 0) {
		body.initialValue = initialValue;
	}

	const fullUrl = `${config.baseUrl}/auctionable-product/relist`;

	const requestOptions: IHttpRequestOptions = {
		method: 'POST',
		url: fullUrl,
		body,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
			'x-client-id': config.clientId,
			'x-client-secret': config.clientSecret,
		},
		skipSslCertificateValidation: false,
		returnFullResponse: false,
	};

	// Log debug info
	logRequestDebug();

	return await this.helpers.httpRequest.call(this, requestOptions);
}
