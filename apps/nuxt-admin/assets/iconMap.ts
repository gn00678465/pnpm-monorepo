import type { FunctionalComponent } from 'vue'
import MaterialSymbolsDesignServicesOutlineRounded from '~icons/material-symbols/design-services-outline-rounded';
import MaterialSymbolsPaletteOutline from '~icons/material-symbols/palette-outline';
import MaterialSymbolsDashboard from '~icons/material-symbols/dashboard';

export const iconMap: Record<string, FunctionalComponent> = {
  'material-symbols:design-services-outline-rounded': MaterialSymbolsDesignServicesOutlineRounded,
  'material-symbols:palette-outline': MaterialSymbolsPaletteOutline,
  'material-symbols:dashboard': MaterialSymbolsDashboard
}