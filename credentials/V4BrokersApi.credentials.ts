import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class V4BrokersApi implements ICredentialType {
	name = 'v4BrokersApi';

	displayName = 'V4 Brokers API';

	icon = { light: 'file:icon-leadbroker.svg', dark: 'file:icon-leadbroker.svg' } as const;

	documentationUrl = 'https://api.brokers.mktlab.app/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
			description: 'Base URL of the V4 Brokers API',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Client ID for authentication (x-client-id)',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Client Secret for authentication (x-client-secret)',
		},
		{
			displayName: 'Category ID',
			name: 'categoryId',
			type: 'string',
			default: '',
			required: true,
			description: 'Default Category ID for lead creation',
		},
		{
			displayName: 'Segment ID',
			name: 'segmentId',
			type: 'string',
			default: '',
			required: true,
			description: 'Default Segment ID for lead creation',
		},
		{
			displayName: 'Campaign ID',
			name: 'campaignId',
			type: 'string',
			default: '',
			required: true,
			description: 'Default Campaign ID for lead creation',
		},
		{
			displayName: 'Created By',
			name: 'createdBy',
			type: 'string',
			default: '',
			required: true,
			description: 'Default Created By identifier for lead creation',
		},
		{
			displayName: 'Tenant Brand ID',
			name: 'tenantBrandId',
			type: 'string',
			default: '',
			required: true,
			description: 'Tenant Brand ID for relist operation',
		},
		{
			displayName: 'Field ID - Nome da Empresa',
			name: 'fieldIdNomeEmpresa',
			type: 'string',
			default: '',
			description: 'Field ID for company name',
		},
		{
			displayName: 'Field ID - Nome do Responsável',
			name: 'fieldIdNomeResponsavel',
			type: 'string',
			default: '',
			description: 'Field ID for responsible person name',
		},
		{
			displayName: 'Field ID - Documento da Empresa',
			name: 'fieldIdDocumentoEmpresa',
			type: 'string',
			default: '',
			description: 'Field ID for company document',
		},
		{
			displayName: 'Field ID - Faturamento Real',
			name: 'fieldIdFaturamentoReal',
			type: 'string',
			default: '',
			description: 'Field ID for real revenue',
		},
		{
			displayName: 'Field ID - Faturamento',
			name: 'fieldIdFaturamento',
			type: 'string',
			default: '',
			description: 'Field ID for revenue',
		},
		{
			displayName: 'Field ID - Canal',
			name: 'fieldIdCanal',
			type: 'string',
			default: '',
			description: 'Field ID for channel',
		},
		{
			displayName: 'Field ID - Segmento',
			name: 'fieldIdSegmento',
			type: 'string',
			default: '',
			description: 'Field ID for segment',
		},
		{
			displayName: 'Field ID - Cidade',
			name: 'fieldIdCidade',
			type: 'string',
			default: '',
			description: 'Field ID for city',
		},
		{
			displayName: 'Field ID - ZIP Code',
			name: 'fieldIdZipCode',
			type: 'string',
			default: '',
			description: 'Field ID for ZIP code',
		},
		{
			displayName: 'Field ID - Estado',
			name: 'fieldIdEstado',
			type: 'string',
			default: '',
			description: 'Field ID for state',
		},
		{
			displayName: 'Field ID - País',
			name: 'fieldIdPais',
			type: 'string',
			default: '',
			description: 'Field ID for country',
		},
		{
			displayName: 'Field ID - Tipo de Produto',
			name: 'fieldIdTipoProduto',
			type: 'string',
			default: '',
			description: 'Field ID for product type',
		},
		{
			displayName: 'Field ID - E-mail',
			name: 'fieldIdEmail',
			type: 'string',
			default: '',
			description: 'Field ID for email',
		},
		{
			displayName: 'Field ID - Telefone',
			name: 'fieldIdTelefone',
			type: 'string',
			default: '',
			description: 'Field ID for phone',
		},
		{
			displayName: 'Field ID - Nível de Urgência',
			name: 'fieldIdNivelUrgencia',
			type: 'string',
			default: '',
			description: 'Field ID for urgency level',
		},
		{
			displayName: 'Field ID - Cargo',
			name: 'fieldIdCargo',
			type: 'string',
			default: '',
			description: 'Field ID for position',
		},
		{
			displayName: 'Field ID - Descrição',
			name: 'fieldIdDescricao',
			type: 'string',
			default: '',
			description: 'Field ID for description',
		},
		{
			displayName: 'Field ID - Latitude',
			name: 'fieldIdLatitude',
			type: 'string',
			default: '',
			description: 'Field ID for latitude',
		},
		{
			displayName: 'Field ID - Longitude',
			name: 'fieldIdLongitude',
			type: 'string',
			default: '',
			description: 'Field ID for longitude',
		},
		{
			displayName: 'Field ID - Data de Cadastro',
			name: 'fieldIdDataCadastro',
			type: 'string',
			default: '',
			description: 'Field ID for registration date',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-client-id': '={{$credentials.clientId}}',
				'x-client-secret': '={{$credentials.clientSecret}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/health',
			method: 'GET',
		},
	};
}
