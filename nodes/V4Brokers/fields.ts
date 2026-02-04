// Field definitions for V4 Brokers
export interface FieldDefinition {
	displayName: string;
	name: string;
	type: 'string' | 'number';
	default?: string | number;
	placeholder?: string;
	credentialField: string;
}

export const LEAD_FIELDS: FieldDefinition[] = [
	{
		displayName: 'Nome Da Empresa',
		name: 'nomeEmpresa',
		type: 'string',
		default: '',
		credentialField: 'fieldIdNomeEmpresa',
	},
	{
		displayName: 'Nome Do Responsável',
		name: 'nomeResponsavel',
		type: 'string',
		default: '',
		credentialField: 'fieldIdNomeResponsavel',
	},
	{
		displayName: 'Documento Da Empresa',
		name: 'documentoEmpresa',
		type: 'string',
		default: '',
		credentialField: 'fieldIdDocumentoEmpresa',
	},
	{
		displayName: 'Faturamento Real',
		name: 'faturamentoReal',
		type: 'string',
		default: '',
		credentialField: 'fieldIdFaturamentoReal',
	},
	{
		displayName: 'Faturamento',
		name: 'faturamento',
		type: 'string',
		default: '',
		credentialField: 'fieldIdFaturamento',
	},
	{
		displayName: 'Canal',
		name: 'canal',
		type: 'string',
		default: '',
		credentialField: 'fieldIdCanal',
	},
	{
		displayName: 'Segmento',
		name: 'segmento',
		type: 'string',
		default: '',
		credentialField: 'fieldIdSegmento',
	},
	{
		displayName: 'Cidade',
		name: 'cidade',
		type: 'string',
		default: '',
		credentialField: 'fieldIdCidade',
	},
	{
		displayName: 'ZIP Code',
		name: 'zipCode',
		type: 'string',
		default: '',
		credentialField: 'fieldIdZipCode',
	},
	{
		displayName: 'Estado',
		name: 'estado',
		type: 'string',
		default: '',
		credentialField: 'fieldIdEstado',
	},
	{
		displayName: 'País',
		name: 'pais',
		type: 'string',
		default: '',
		credentialField: 'fieldIdPais',
	},
	{
		displayName: 'Tipo De Produto',
		name: 'tipoProduto',
		type: 'string',
		default: '',
		credentialField: 'fieldIdTipoProduto',
	},
	{
		displayName: 'E-Mail',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		credentialField: 'fieldIdEmail',
	},
	{
		displayName: 'Telefone',
		name: 'telefone',
		type: 'string',
		default: '',
		credentialField: 'fieldIdTelefone',
	},
	{
		displayName: 'Nível De Urgência',
		name: 'nivelUrgencia',
		type: 'string',
		default: '',
		credentialField: 'fieldIdNivelUrgencia',
	},
	{
		displayName: 'Cargo',
		name: 'cargo',
		type: 'string',
		default: '',
		credentialField: 'fieldIdCargo',
	},
	{
		displayName: 'Descrição',
		name: 'descricao',
		type: 'string',
		default: '',
		credentialField: 'fieldIdDescricao',
	},
	{
		displayName: 'Latitude',
		name: 'latitude',
		type: 'string',
		default: '',
		credentialField: 'fieldIdLatitude',
	},
	{
		displayName: 'Longitude',
		name: 'longitude',
		type: 'string',
		default: '',
		credentialField: 'fieldIdLongitude',
	},
	{
		displayName: 'Data De Cadastro',
		name: 'dataCadastro',
		type: 'string',
		default: '',
		credentialField: 'fieldIdDataCadastro',
	},
];
