import type { IExecuteFunctions, INodeExecutionData, INodeType } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { V4BrokersOperation } from './types';
import { nodeDescription } from './description';
import { createLead, updateLead, relistLead } from './operations';
import { handleError } from './errorHandler';

export class V4Brokers implements INodeType {
	description = {
		...nodeDescription,
		icon: 'file:icon-leadbroker.svg' as const,
		usableAsTool: true as const,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as V4BrokersOperation;
		const credentials = await this.getCredentials('v4BrokersApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				switch (operation) {
					case V4BrokersOperation.CreateLead:
						responseData = await createLead.call(this, i, credentials);
						break;

					case V4BrokersOperation.UpdateLead:
						responseData = await updateLead.call(this, i);
						break;

					case V4BrokersOperation.RelistLead:
						responseData = await relistLead.call(this, i, credentials);
						break;

					default:
						throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`, {
							itemIndex: i,
						});
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message || 'Erro desconhecido',
							details: error.description || '',
						},
						pairedItem: { item: i },
					});
					continue;
				}
				handleError(error, this.getNode(), i);
			}
		}

		return [returnData];
	}
}
