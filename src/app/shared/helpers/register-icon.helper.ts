
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_ICON_NAMES } from '@app/shared/constants';

export const registerCustomMaterialIcons = (mir: MatIconRegistry, ds: DomSanitizer) => {
  MATERIAL_ICON_NAMES.forEach((iconName: string) => {
    mir.addSvgIcon(iconName, ds.bypassSecurityTrustResourceUrl(`/assets/img/svg/${ iconName }.svg`));
  });
};
