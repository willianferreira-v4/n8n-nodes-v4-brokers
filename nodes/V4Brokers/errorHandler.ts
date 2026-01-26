import type { INode } from 'n8n-workflow';
import { NodeOperationError, NodeApiError } from 'n8n-workflow';

interface ErrorDetails {
	message: string;
	description?: string;
	httpCode?: number;
}

interface ApiError {
	message?: string;
	code?: string;
	config?: { baseURL?: string };
	response?: {
		status: number;
		data?: { message?: string; error?: string };
	};
}

function isApiError(error: unknown): error is ApiError {
	return typeof error === 'object' && error !== null;
}

function getErrorMessage(error: unknown): string {
	if (isApiError(error) && typeof error.message === 'string') {
		return error.message;
	}
	return 'Erro desconhecido';
}

export function handleError(error: unknown, node: INode, itemIndex: number): never {
	let errorDetails: ErrorDetails = {
		message: 'Erro ao executar operação',
	};

	const err = isApiError(error) ? error : null;
	const errorMessage = getErrorMessage(error);

	// Invalid URL error
	if (errorMessage.includes('Invalid URL')) {
		errorDetails = {
			message: 'URL da API inválida',
			description:
				'Verifique se a "API Base URL" está configurada corretamente nas credenciais. Exemplo: https://api.brokers.mktlab.app',
		};
	}
	// JSON parsing errors
	else if (errorMessage.includes('Invalid JSON')) {
		errorDetails = {
			message: 'Formato JSON inválido no campo "Fields"',
			description:
				'O campo "Fields" deve conter um JSON válido. Exemplo: [{"fieldId": "123", "name": "Nome", "value": "João", "type": "text"}]',
		};
	}
	// Network errors
	else if (err?.code === 'ECONNREFUSED' || err?.code === 'ENOTFOUND') {
		errorDetails = {
			message: 'Não foi possível conectar à API',
			description:
				'Verifique se a URL da API está correta e se o servidor está acessível. URL configurada: ' +
				(err?.config?.baseURL ?? 'não definida'),
		};
	}
	// Authentication errors
	else if (err?.response?.status === 401 || err?.response?.status === 403) {
		errorDetails = {
			message: 'Erro de autenticação',
			description: 'Verifique se o "Client ID" e "Client Secret" estão corretos nas credenciais.',
			httpCode: err.response.status,
		};
	}
	// API validation errors
	else if (err?.response?.status === 400) {
		const apiMessage = err.response.data?.message || err.response.data?.error;
		errorDetails = {
			message: 'Dados inválidos enviados para a API',
			description: apiMessage
				? `Mensagem da API: ${apiMessage}`
				: 'Verifique se todos os campos obrigatórios estão preenchidos corretamente.',
			httpCode: 400,
		};
	}
	// API not found errors
	else if (err?.response?.status === 404) {
		errorDetails = {
			message: 'Recurso não encontrado',
			description: 'O lead especificado não foi encontrado ou o endpoint não existe.',
			httpCode: 404,
		};
	}
	// Server errors
	else if (err?.response?.status !== undefined && err.response.status >= 500) {
		errorDetails = {
			message: 'Erro no servidor da API',
			description: `A API retornou erro ${err.response.status}. Tente novamente mais tarde.`,
			httpCode: err.response.status,
		};
	}
	// Generic API errors
	else if (err?.response) {
		const apiMessage = err.response.data?.message || err.response.data?.error;
		errorDetails = {
			message: `Erro na API (${err.response.status})`,
			description: apiMessage || 'Erro desconhecido retornado pela API.',
			httpCode: err.response.status,
		};
	}
	// Unknown errors
	else {
		errorDetails = {
			message: errorMessage,
			description: 'Um erro inesperado ocorreu. Verifique os logs para mais detalhes.',
		};
	}

	// Build error message
	let fullMessage = errorDetails.message;
	if (errorDetails.httpCode) {
		fullMessage = `[${errorDetails.httpCode}] ${fullMessage}`;
	}
	if (errorDetails.description) {
		fullMessage += `\n\n${errorDetails.description}`;
	}

	// Throw appropriate error type
	if (err?.response) {
		throw new NodeApiError(node, error as Error, {
			message: fullMessage,
			itemIndex,
		});
	} else {
		throw new NodeOperationError(node, fullMessage, {
			itemIndex,
		});
	}
}
