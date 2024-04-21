interface GenerateColorCombinationsOptions {
  types?: string[];
  scenes?: string[];
  shades?: (string | number)[];
  prefix?: string;
}

export function setCssVarName(
  prefix: string,
  type: string,
  scene: string,
  shade: string
) {
  if (type === '') throw new Error('Type must not empty');
  return '--' + [prefix, type, scene, shade].filter(Boolean).join('-');
}

/**
 * 產生 css 變數
 * @param options
 * @returns {Record<string, string>}
 */
export function generateColorCombinations(
  options: GenerateColorCombinationsOptions = {}
): Record<string, string> {
  const {
    types = ['primary', 'info', 'success', 'warning', 'error'],
    scenes = ['hover', 'pressed', 'focus', 'disabled'],
    shades = [],
    prefix = ''
  } = options;
  const result: Record<string, string> = {};

  if (!Array.isArray(types)) {
    throw new TypeError('Types must be an array.');
  }

  if (types.length === 0) {
    throw new TypeError('Types must be not empty.');
  }

  for (const type of types) {
    result[type] = `rgba(var(${setCssVarName(prefix, type, '', '')}))`;
    for (const scene of scenes) {
      result[`${type}-${scene}`] =
        `rgba(var(${setCssVarName(prefix, type, scene, '')}))`;
    }

    for (const shade of shades) {
      result[`${type}-${shade}`] =
        `rgba(var(${setCssVarName(prefix, type, '', shade.toString())}))`;
    }
  }

  return result;
}
