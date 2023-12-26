import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { SubSink } from 'subsink';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
})
export class UploadsComponent implements OnInit {
  uploadForm!: FormGroup;
  private subs = new SubSink();
  precoValue: number | undefined;
  url: string = '../../assets/img/9.png';
  // dataDeUpload: string =
  //   this.datePipe.transform(new Date(), 'dd/MM/yyyy') ?? 'Data não disponível';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.uploadForm = this.fb.group({
    //   titulo: ['', Validators.required],
    //   descricao: ['', Validators.required],
    //   preco: [
    //     '',
    //     [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    //   ],
    //   nomeDoFicheiro: [{ value: '', disabled: true }, Validators.required],
    //   palavrasChave: this.fb.array([], Validators.required),
    //   criadoEm: [new Date(), Validators.required],
    // });
    // Example subscription
    // this.subs.sink = this.uploadForm.valueChanges.subscribe((value) => {
    //   // Handle form value changes
    //   console.log(value);
    // });
  }

  // setimage(img: any) {
  //   console.log(img);
  //   this.url = img[0].name;
  // }

  onselectfile(e: any) {
    console.log(e);
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  // onSubmit() {
  //   if (this.uploadForm.valid) {
  //     // Handle form submission
  //   }
  // }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
