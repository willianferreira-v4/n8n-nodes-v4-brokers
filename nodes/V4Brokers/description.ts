/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type { INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import {
	operationProperty,
	createLeadProperties,
	updateLeadProperties,
	relistLeadProperties,
} from './properties';

export const nodeDescription: INodeTypeDescription = {
	displayName: 'V4 Brokers',
	name: 'v4Brokers',
	icon: 'file:icon-leadbroker.svg',
	group: ['transform'],
	version: 1,
	subtitle: '={{$parameter["operation"]}}',
	description: 'Integração com a API do Brokers',
	defaults: {
		name: 'V4 Brokers',
	},
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
	credentials: [
		{
			name: 'v4BrokersApi',
			required: true,
		},
	],
	requestDefaults: {
		baseURL: '={{$credentials.baseUrl}}',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
		},
	},
	properties: [
		operationProperty,
		...createLeadProperties,
		...updateLeadProperties,
		...relistLeadProperties,
	],
};
