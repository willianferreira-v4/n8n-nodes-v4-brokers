// Field definitions for V4 Brokers
export interface FieldDefinition {
	displayName: string;
	name: string;
	type: 'string' | 'number';
	default?: string | number;
	placeholder?: string;
	fieldIdKey: string; // Key in the fieldIds JSON object
}

export const LEAD_FIELDS: FieldDefinition[] = [
	{
		displayName: 'Nome Da Empresa',
		name: 'nomeEmpresa',
		type: 'string',
		default: '',
		fieldIdKey: 'nomeEmpresa',
	},
	{
		displayName: 'Nome Do Responsável',
		name: 'nomeResponsavel',
		type: 'string',
		default: '',
		fieldIdKey: 'nomeResponsavel',
	},
	{
		displayName: 'Documento Da Empresa',
		name: 'documentoEmpresa',
		type: 'string',
		default: '',
		fieldIdKey: 'documentoEmpresa',
	},
	{
		displayName: 'Faturamento Real',
		name: 'faturamentoReal',
		type: 'string',
		default: '',
		fieldIdKey: 'faturamentoReal',
	},
	{
		displayName: 'Faturamento',
		name: 'faturamento',
		type: 'string',
		default: '',
		fieldIdKey: 'faturamento',
	},
	{
		displayName: 'Canal',
		name: 'canal',
		type: 'string',
		default: '',
		fieldIdKey: 'canal',
	},
	{
		displayName: 'Segmento',
		name: 'segmento',
		type: 'string',
		default: '',
		fieldIdKey: 'segmento',
	},
	{
		displayName: 'Cidade',
		name: 'cidade',
		type: 'string',
		default: '',
		fieldIdKey: 'cidade',
	},
	{
		displayName: 'ZIP Code',
		name: 'zipCode',
		type: 'string',
		default: '',
		fieldIdKey: 'zipCode',
	},
	{
		displayName: 'Estado',
		name: 'estado',
		type: 'string',
		default: '',
		fieldIdKey: 'estado',
	},
	{
		displayName: 'País',
		name: 'pais',
		type: 'string',
		default: '',
		fieldIdKey: 'pais',
	},
	{
		displayName: 'Tipo De Produto',
		name: 'tipoProduto',
		type: 'string',
		default: '',
		fieldIdKey: 'tipoProduto',
	},
	{
		displayName: 'E-Mail',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		fieldIdKey: 'email',
	},
	{
		displayName: 'Telefone',
		name: 'telefone',
		type: 'string',
		default: '',
		fieldIdKey: 'telefone',
	},
	{
		displayName: 'Nível De Urgência',
		name: 'nivelUrgencia',
		type: 'string',
		default: '',
		fieldIdKey: 'nivelUrgencia',
	},
	{
		displayName: 'Cargo',
		name: 'cargo',
		type: 'string',
		default: '',
		fieldIdKey: 'cargo',
	},
	{
		displayName: 'Descrição',
		name: 'descricao',
		type: 'string',
		default: '',
		fieldIdKey: 'descricao',
	},
	{
		displayName: 'Latitude',
		name: 'latitude',
		type: 'string',
		default: '',
		fieldIdKey: 'latitude',
	},
	{
		displayName: 'Longitude',
		name: 'longitude',
		type: 'string',
		default: '',
		fieldIdKey: 'longitude',
	},
	{
		displayName: 'Data De Cadastro',
		name: 'dataCadastro',
		type: 'string',
		default: '',
		fieldIdKey: 'dataCadastro',
	},
];

// Helper type for the fieldIds JSON structure
export interface FieldIdsConfig {
	nomeEmpresa?: string;
	nomeResponsavel?: string;
	documentoEmpresa?: string;
	faturamentoReal?: string;
	faturamento?: string;
	canal?: string;
	segmento?: string;
	cidade?: string;
	zipCode?: string;
	estado?: string;
	pais?: string;
	tipoProduto?: string;
	email?: string;
	telefone?: string;
	nivelUrgencia?: string;
	cargo?: string;
	descricao?: string;
	latitude?: string;
	longitude?: string;
	dataCadastro?: string;
}

// Full config structure from credentials
export interface V4BrokersConfig {
	baseUrl: string;
	clientId: string;
	clientSecret: string;
	categoryId: string;
	segmentId: string;
	campaignId: string;
	createdBy: string;
	tenantBrandId: string;
	fieldIds: FieldIdsConfig;
}
