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
import { logRequestDebug, validateCredentials } from './debug';
import { LEAD_FIELDS } from './fields';

export async function createLead(
	this: IExecuteFunctions,
	index: number,
	credentials: ICredentialDataDecryptedObject,
): Promise<IDataObject> {
	// Validate credentials
	const credentialErrors = validateCredentials(credentials);
	if (credentialErrors.length > 0) {
		throw new NodeOperationError(
			this.getNode(),
			`Erro nas credenciais:\n- ${credentialErrors.join('\n- ')}`,
			{ itemIndex: index },
		);
	}

	const rawExternalId = this.getNodeParameter('externalId', index) as string;
	const externalId =
		typeof rawExternalId === 'string' ? rawExternalId.trim() : String(rawExternalId).trim();
	const value = this.getNodeParameter('value', index) as number;

	// Build fields array from individual parameters
	const fields: CreateLeadField[] = [];
	for (const fieldDef of LEAD_FIELDS) {
		const rawFieldValue = this.getNodeParameter(fieldDef.name, index, '') as string;
		const fieldValue =
			typeof rawFieldValue === 'string' ? rawFieldValue.trim() : String(rawFieldValue).trim();
		const rawFieldId = credentials[fieldDef.credentialField] as string;
		const fieldId = typeof rawFieldId === 'string' ? rawFieldId.trim() : String(rawFieldId).trim();

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
		categoryId: credentials.categoryId as string,
		segmentId: credentials.segmentId as string,
		campaignId: credentials.campaignId as string,
		createdBy: credentials.createdBy as string,
		value,
		fields,
	};

	const baseUrl = credentials.baseUrl as string;
	const fullUrl = `${baseUrl}/auctionable-product`;

	const requestOptions: IHttpRequestOptions = {
		method: 'POST',
		url: fullUrl,
		body,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
			'x-client-id': credentials.clientId as string,
			'x-client-secret': credentials.clientSecret as string,
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

	// Validate credentials
	const credentialErrors = validateCredentials(credentials);
	if (credentialErrors.length > 0) {
		throw new NodeOperationError(
			this.getNode(),
			`Erro nas credenciais:\n- ${credentialErrors.join('\n- ')}`,
			{ itemIndex: index },
		);
	}

	const rawExternalId = this.getNodeParameter('externalIdUpdate', index) as string;
	const externalId =
		typeof rawExternalId === 'string' ? rawExternalId.trim() : String(rawExternalId).trim();

	// Build fields array from individual parameters
	const fields: UpdateLeadField[] = [];
	for (const fieldDef of LEAD_FIELDS) {
		const rawFieldValue = this.getNodeParameter(`update_${fieldDef.name}`, index, '') as string;
		const fieldValue =
			typeof rawFieldValue === 'string' ? rawFieldValue.trim() : String(rawFieldValue).trim();
		const rawFieldId = credentials[fieldDef.credentialField] as string;
		const fieldId = typeof rawFieldId === 'string' ? rawFieldId.trim() : String(rawFieldId).trim();

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

	const baseUrl = credentials.baseUrl as string;
	const fullUrl = `${baseUrl}/auctionable-product`;

	const requestOptions: IHttpRequestOptions = {
		method: 'PUT',
		url: fullUrl,
		body,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
			'x-client-id': credentials.clientId as string,
			'x-client-secret': credentials.clientSecret as string,
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
	// Validate credentials
	const credentialErrors = validateCredentials(credentials);
	if (credentialErrors.length > 0) {
		throw new NodeOperationError(
			this.getNode(),
			`Erro nas credenciais:\n- ${credentialErrors.join('\n- ')}`,
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
		tenantBrandId: credentials.tenantBrandId as string,
	};

	// Only include initialValue if it's provided and valid
	if (initialValue !== undefined && initialValue > 0) {
		body.initialValue = initialValue;
	}

	const baseUrl = credentials.baseUrl as string;
	const fullUrl = `${baseUrl}/auctionable-product/relist`;

	const requestOptions: IHttpRequestOptions = {
		method: 'POST',
		url: fullUrl,
		body,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
			'x-client-id': credentials.clientId as string,
			'x-client-secret': credentials.clientSecret as string,
		},
		skipSslCertificateValidation: false,
		returnFullResponse: false,
	};

	// Log debug info
	logRequestDebug();

	return await this.helpers.httpRequest.call(this, requestOptions);
}
