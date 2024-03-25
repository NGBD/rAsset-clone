/**
 * Convert a flat object to a query string
 * @param parameters A flat object
 * @param prefix Defaults to '?'
 */
export const convertObjectToQueryString = (
  parameters: { [key: string]: any } = {},
  prefix = "?"
): string => {
  const query: string = Object.keys(parameters)
    .map((key: string) => {
      let value = parameters[key];

      if (typeof value === "boolean") value = value ? 1 : 0;

      return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    })
    .join("&");

  return prefix + query;
};
