import { Component, OnInit, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';

export interface Tag {
  name: string;
}
@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
})
export class UploadsComponent implements OnInit {
  url: string = '';
  file: string = '';
  dataAtuall: Date = new Date();
  // tags: string[] = [];
  uploadButtonEnabled = false;
  uploadForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    nomeDoFicheiro: new FormControl('', Validators.required),
    palavrasChave: new FormControl([], Validators.required),
    preco: new FormControl('', Validators.pattern(/^\d+(\.\d{1,2})?$/)),
    description: new FormControl('', Validators.required),
    dataUpload: new FormControl(null, Validators.required),
    show: new FormControl(false),
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Tags: Tag[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  announcer = inject(LiveAnnouncer);

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  onselectfile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.file = event.target.result as string; // image base64
      };
      this.url = '../../assets/img/' + e.target.files[0].name;
    }
  }

  updateImagesListing(): void {
    try {
      let storedImagesString = this.localStorageService.getItem('images');
      if (typeof storedImagesString === null || storedImagesString === 'null') {
        storedImagesString = '{}';
      }
      const storedImages =
        typeof storedImagesString === 'string'
          ? JSON.parse(storedImagesString)
          : storedImagesString;

      const uniqueId = Math.floor(Math.random() * 1000);

      if (storedImages !== null) {
        storedImages[uniqueId] = {
          ...this.uploadForm.value,
          imageData: this.url,
          palavrasChave: Array.isArray(this.uploadForm.value.palavrasChave)
            ? [...this.uploadForm.value.palavrasChave, ...this.Tags]
            : [...this.Tags],
        };
      }

      this.localStorageService.setItem('images', JSON.stringify(storedImages));

      this.uploadForm.reset();
      this.successMessage = 'Upload bem-sucedido!';

      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    } catch (error) {
      this.errorMessage = 'Falha ao adicionar upload: ' + error;
      // console.log('error:', error);
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    }
  }

  finalizarUpload(): void {
    if (this.uploadForm.valid) {
      this.updateImagesListing();
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.Tags.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.Tags.indexOf(tag);

    if (index >= 0) {
      this.Tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.Tags.indexOf(tag);
    if (index >= 0) {
      this.Tags[index].name = value;
    }
  }
}
