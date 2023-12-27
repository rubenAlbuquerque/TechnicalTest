import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  // NgControl,
} from '@angular/forms';
import { SubSink } from 'subsink';
import { DatePipe } from '@angular/common';
// import { TagInputComponent } from '../tag-input/tag-input.component';
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
  // uploadForm!: FormGroup;
  url: string = ''; // '../../assets/img/9.png';
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

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    // this.uploadForm = new FormGroup({
    //   titulo: new FormControl('', Validators.required),
    //   nomeDoFicheiro: new FormControl('', Validators.required),
    //   palavrasChave: new FormControl([], Validators.required),
    //   preco: new FormControl('', Validators.pattern(/^\d+(\.\d{1,2})?$/)),
    //   description: new FormControl('', Validators.required),
    //   dataUpload: new FormControl(null, Validators.required),
    // });
  }

  onselectfile(e: any) {
    // console.log(e);
    if (e.target.files) {
      var reader = new FileReader();

      // console.log('1-->', e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result as string; // image base64
        // console.log('-2->', this.url);
      };
      // this.url = url;
      // this.url =
      // console.log('-3->', typeof this.url);
      // console.log('-4->', reader.result);
      // console.log('Caminho da Imagem:', this.url);

      this.url = '../../assets/img/' + e.target.files[0].name;
      // const webkitRelativePath = e.target.files[0].webkitRelativePath || '';
      // const file = e.target.files[0];
      // console.log(
      //   'Caminho Relativo no Sistema de Arquivos:',
      //   webkitRelativePath,
      //   this.url
      // );
      // reader.readAsDataURL(e.target.files[0]);
    }
  }

  // updateImagesListing(): void {
  //   // Recupera as imagens armazenadas no local storage ou inicializa um objeto vazio
  //   const storedImagesString = this.localStorageService.getItem('images');
  //   const storedImages = storedImagesString
  //     ? JSON.parse(storedImagesString)
  //     : {};

  //   console.log('Stored Images T:', typeof storedImages);
  //   console.log('Stored Images:', storedImages);

  //   // Converte o novo formulário para uma string JSON
  //   const formData = this.uploadForm.value;

  //   console.log('--->', typeof formData);
  //   console.log('--->', formData);

  //   // Gera um ID único para a nova imagem (por exemplo, usando a data de upload e um número aleatório)
  //   const uniqueId =
  //     formData.dataUpload + '_' + Math.floor(Math.random() * 1000);

  //   // Adiciona o novo formulário ao objeto existente usando o ID único
  //   storedImages[uniqueId] = formData;

  //   // Salva o objeto atualizado de volta no local storage
  //   this.localStorageService.setItem('images', JSON.stringify(storedImages));

  //   console.log('Stored Images Count:', Object.keys(storedImages).length);
  // }

  updateImagesListing(): void {
    try {
      // Recupera as imagens armazenadas no local storage ou inicializa um objeto vazio
      let storedImagesString = this.localStorageService.getItem('images');
      console.log('typeof:', typeof storedImagesString);
      console.log('typeof:', storedImagesString);
      if (typeof storedImagesString === null || storedImagesString === 'null') {
        storedImagesString = '{}';
        console.log('storedImagesString:', storedImagesString);
      }
      console.log('storedImagesString:', storedImagesString);
      // const storedImages = storedImagesString
      //   ? JSON.parse(storedImagesString)
      //   : {};
      const storedImages =
        typeof storedImagesString === 'string'
          ? JSON.parse(storedImagesString)
          : storedImagesString;
      // const storedImages = storedImagesString || {};
      console.log('typeof:', storedImages);
      // const formData = { ...this.uploadForm.value, imageData: this.url };
      // const formData = this.uploadForm.value;
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

      console.log('--storedImages-->', storedImages);

      // this.Tags.forEach((tag) =>
      //   this.uploadForm.value.palavrasChave?.push(new FormControl(tag))
      // );

      // const palavrasChaveFormArray = this.uploadForm.valuethis.uploadForm.value.get(
      //   'palavrasChave'
      // ) as new Array();
      // console.log('---->', palavrasChaveFormArray);

      // console.log('---->', this.uploadForm.value, this.Tags);
      this.localStorageService.setItem('images', JSON.stringify(storedImages));
      // console.log('Stored Images Count:', Object.keys(storedImages).length);

      this.uploadForm.reset();
      this.successMessage = 'Upload bem-sucedido!';

      setTimeout(() => {
        this.successMessage = null; // Limpa a mensagem de sucesso após 3 segundos
      }, 3000);
    } catch (error) {
      this.errorMessage = 'Falha ao adicionar upload: ' + error;
      console.log('error:', error);
      setTimeout(() => {
        this.errorMessage = null; // Limpa a mensagem de erro após 3 segundos
      }, 3000);
    }
  }

  finalizarUpload(): void {
    if (this.uploadForm.valid) {
      // const imagesListingContent = /* Serialize the content of the images listing grid */;
      // localStorage.setItem('imagesListingID', JSON.stringify(imagesListingContent));
      this.updateImagesListing();
    }
  }

  onSubmit() {
    console.log('this.uploadForm.value');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.Tags.push({ name: value });
    }

    // Clear the input value
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

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.Tags.indexOf(tag);
    if (index >= 0) {
      this.Tags[index].name = value;
    }
  }
}
