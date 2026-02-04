import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

const defaultConfig = JSON.stringify(
	{
		baseUrl: '',
		clientId: '',
		clientSecret: '',
		categoryId: '',
		segmentId: '',
		campaignId: '',
		createdBy: '',
		tenantBrandId: '',
		fieldIds: {
			nomeEmpresa: '',
			nomeResponsavel: '',
			documentoEmpresa: '',
			faturamentoReal: '',
			faturamento: '',
			canal: '',
			segmento: '',
			cidade: '',
			zipCode: '',
			estado: '',
			pais: '',
			tipoProduto: '',
			email: '',
			telefone: '',
			nivelUrgencia: '',
			cargo: '',
			descricao: '',
			latitude: '',
			longitude: '',
			dataCadastro: '',
		},
	},
	null,
	2,
);

export class V4BrokersApi implements ICredentialType {
	name = 'v4BrokersApi';

	displayName = 'V4 Brokers API';

	icon = { light: 'file:icon-leadbroker.svg', dark: 'file:icon-leadbroker.svg' } as const;

	documentationUrl = 'https://api.brokers.mktlab.app/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'Configuration (JSON)',
			name: 'config',
			type: 'string',
			typeOptions: {
				rows: 30,
			},
			default: defaultConfig,
			required: true,
			description:
				'JSON object with all API configuration. Fill in baseUrl, clientId, clientSecret, categoryId, segmentId, campaignId, createdBy, tenantBrandId, and fieldIds.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-client-id': '={{JSON.parse($credentials.config).clientId}}',
				'x-client-secret': '={{JSON.parse($credentials.config).clientSecret}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{JSON.parse($credentials.config).baseUrl}}',
			url: '/health',
			method: 'GET',
		},
	};
}
