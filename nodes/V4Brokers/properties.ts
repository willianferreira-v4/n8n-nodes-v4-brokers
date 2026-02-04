import type { INodeProperties } from 'n8n-workflow';
import { V4BrokersOperation } from './types';
import { LEAD_FIELDS } from './fields';

export const operationProperty: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	default: 'createLead',
	noDataExpression: true,
	options: [
		{
			name: 'Create Lead',
			value: V4BrokersOperation.CreateLead,
			description: 'Create a new auctionable lead',
			action: 'Create a new lead',
		},
		{
			name: 'Update Lead',
			value: V4BrokersOperation.UpdateLead,
			description: 'Update an existing lead',
			action: 'Update a lead',
		},
		{
			name: 'Relist Lead',
			value: V4BrokersOperation.RelistLead,
			description: 'Relist a lead for auction',
			action: 'Relist a lead',
		},
	],
};

export const createLeadProperties: INodeProperties[] = [
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		displayOptions: {
			show: {
				operation: [V4BrokersOperation.CreateLead],
			},
		},
		default: '',
		required: true,
		description: 'External identifier for the lead',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		displayOptions: {
			show: {
				operation: [V4BrokersOperation.CreateLead],
			},
		},
		default: 0,
		required: true,
		description: 'Initial value for the lead auction',
	},
	...LEAD_FIELDS.map(
		(field): INodeProperties => ({
			displayName: field.displayName,
			name: field.name,
			type: field.type,
			displayOptions: {
				show: {
					operation: [V4BrokersOperation.CreateLead],
				},
			},
			default: '',
			description: `Value for ${field.displayName}. Leave empty to not send this field.`,
		}),
	),
];

export const updateLeadProperties: INodeProperties[] = [
	{
		displayName: 'External ID',
		name: 'externalIdUpdate',
		type: 'string',
		displayOptions: {
			show: {
				operation: [V4BrokersOperation.UpdateLead],
			},
		},
		default: '',
		required: true,
		description: 'External identifier of the lead to update',
	},
	...LEAD_FIELDS.map(
		(field): INodeProperties => ({
			displayName: field.displayName,
			name: `update_${field.name}`,
			type: field.type,
			displayOptions: {
				show: {
					operation: [V4BrokersOperation.UpdateLead],
				},
			},
			default: '',
			description: `Value for ${field.displayName}. Leave empty to not update this field.`,
		}),
	),
];

export const relistLeadProperties: INodeProperties[] = [
	{
		displayName: 'External ID',
		name: 'externalIdRelist',
		type: 'string',
		displayOptions: {
			show: {
				operation: [V4BrokersOperation.RelistLead],
			},
		},
		default: '',
		required: true,
		description: 'External identifier of the lead to relist',
	},
	{
		displayName: 'Initial Value',
		name: 'initialValue',
		type: 'number',
		displayOptions: {
			show: {
				operation: [V4BrokersOperation.RelistLead],
			},
		},
		default: 0,
		description:
			'Optional initial value for the relist. Leave as 0 or empty to not send this field.',
	},
];
