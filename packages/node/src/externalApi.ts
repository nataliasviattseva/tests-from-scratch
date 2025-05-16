// src/externalApi.ts
export interface ExternalData { extra: string; }
export async function fetchUserData(id: number): Promise<ExternalData> {
    // Imaginons un appel HTTP externe...
    // Dans la réalité, on ferait fetch axios.get(...)
    /* istanbul ignore next */
    return { extra: `données pour user ${id}` };
}