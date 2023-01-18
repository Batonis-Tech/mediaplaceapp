const API_URI: string = 'http://178.128.253.62/backend';

export const CLIENT_ID = 'HQhhKyRwRuSEhU5NrD9Hfco94ciyNCh1RWWKhiTG';
export const CLIENT_SECRET =
  'IvndcDE7i6ejCwxkovduOgeGZtQuJMHf1DKzaAdQugIS6xxxR8BpqgroHdwcPERLM8lNo79VoVD1OywntVXp7NQIy5stNN2AxfMqmEvgiArN12ghVTVJnlHZIEL6x0Uz';

export function Url(url: string): string {
  return `${API_URI}${url}`;
}

export const ApiEndpoints = {
  SignIn: Url('/o/token/'),
  GetMe: Url('/api/v1/users/me'),
  GetProviders: Url('/api/v1/providers/my'),

  GetBillMy: Url('/api/v1/billing/account/my'),
  GetBillProvider: (id: string) =>
    Url(`/api/v1/billing/account/my?provider_id=${id}`),

  GetOrdersMy: (id: string) => Url(`/api/v1/products/orders/?user=${id}`),
  GetOrdersProvider: (id: string) =>
    Url(`/api/v1/products/orders/?provider=${id}`),

  GetOrderDetails: (id: string) => Url(`/api/v1/products/orders/${id}?`),
  // search
} as const;
