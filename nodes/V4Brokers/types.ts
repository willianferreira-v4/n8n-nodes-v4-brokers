// Types for V4 Brokers API

export interface CreateLeadField {
	fieldId: string;
	name: string;
	value: string;
	type: string;
	predefined?: string;
}

export interface CreateLeadRequest {
	externalId: string;
	categoryId: string;
	segmentId: string;
	campaignId: string;
	createdBy: string;
	value: number;
	fields: CreateLeadField[];
}

export interface UpdateLeadField {
	fieldId: string;
	value: string;
}

export interface UpdateLeadRequest {
	externalId: string;
	fields: UpdateLeadField[];
}

export interface RelistLeadRequest {
	externalId: string;
	initialValue?: number;
	tenantBrandId: string;
}

export enum V4BrokersOperation {
	CreateLead = 'createLead',
	UpdateLead = 'updateLead',
	RelistLead = 'relistLead',
}
