
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FileInputModule } from '../file-input/file-input.module';
import { CloseModalBtnModule } from '../buttons/close-modal-btn/close-modal-btn.module';
import { EditImageComponent } from './edit-image/edit-image.component';
import { MATERIAL_MODULES } from './constants';

@NgModule({
  declarations: [
    EditImageComponent
  ],
  imports: [
    CommonModule,
    FileInputModule,
    ImageCropperModule,
    CloseModalBtnModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    EditImageComponent
  ]
})
export class EditImageModule { }
