
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subject } from 'rxjs';
import { EditImageTypes } from '@app/shared/constants';

export interface EditImageConfig<T> { formDataTitle: T; }

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageComponent implements OnInit, OnDestroy {

  @Output() saveAvatar: EventEmitter<any> = new EventEmitter();

  public showCropper = false;
  public imageChangedEvent: Event;
  public croppedImage: string;
  public clearFile$: Subject<void> = new Subject();
  private imageBase64: string;
  private formDataTitle: EditImageTypes = EditImageTypes.image;

  constructor(
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) data: EditImageConfig<EditImageTypes>) {
    this.formDataTitle = data.formDataTitle || this.formDataTitle;
  }

  ngOnInit(): void {
  }

  public onFileChange(event): void {
    const image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.imageBase64 = btoa(e.target.result); };
      reader.readAsBinaryString(image);

      this.imageChangedEvent = event;
      this.showCropper = true;
    }
  }

  public onImageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  public onClearFile(): void {
    this.imageChangedEvent = null;
    this.showCropper = false;
    this.clearFile$.next();
  }

  public onSave(): void {
    const fd = new FormData();
    fd.append(this.formDataTitle, this.croppedImage || this.imageBase64);
    this.dialogRef.close(this.imageChangedEvent ? fd : null);
  }

  ngOnDestroy(): void {
    this.clearFile$.complete();
  }

}
