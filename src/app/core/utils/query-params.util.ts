export function buildQueryParams(
    page: number = 1,
    size: number = 10,
    filters: { [key: string]: string | number | undefined } = {},
    orderBy?: string
  ): Record<string, string> {
    const params: Record<string, string> = {
      _page: page.toString(),
      _size: size.toString()
    };
  
    if (orderBy) {
        params['_order'] = orderBy;
    }
  
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value.toString().trim() !== '') {
        params[key] = value.toString();
      }
    }
  
    return params;
  }
