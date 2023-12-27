import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { YourDataService } from 'path-to-your-data-service';
import { Subject } from 'rxjs';

import { DataSearchService } from '../data-search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl();
  images: any[] = [];
  keyword!: string;
  imgs: any;

  constructor(private dataSearchService: DataSearchService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Aguarda 300 milissegundos após a última alteração
        distinctUntilChanged(), // Garante que só ocorra se o valor for diferente do anterior
        switchMap((keyword) => this.dataSearchService.getFilteredData(keyword))
      )
      .subscribe((filteredImages) => {
        this.imgs = filteredImages;
        console.log('images:', this.imgs);
        this.dataSearchService.getData(filteredImages);
      });

    // console.log('images:', this.imgs);
  }

  onSearch($event: any) {
    this.keyword = $event.target.value;
    console.log(this.keyword);
  }

  // onSearch($event: any) {
  //   this.keyword = $event.target.value;
  //   const data = this.dataSearchService.getData();

  //   console.log('keyword:eeee', this.keyword, data);
  //   // this.subjectKeyUp.next(this.keyword);

  // const filteredImages = Object.values(data).every((i) => {
  //   const teste = i.palavrasChave.includes(this.keyword.toLowerCase());
  // });

  //   console.log('filteredImages', filteredImages);

  //   // image-> palavrasChave:"camera" ["ca", "ca"]

  //   // this.searchControl.valueChanges
  //   //   .pipe(
  //   //     debounceTime(300),
  //   //     distinctUntilChanged(),
  //   //     switchMap((keyword) => {
  //   //       // Chama o método do serviço para lidar com a palavra-chave
  //   //       this.dataSearchService.getKeyword(keyword);
  //   //       // Atualiza a propriedade images com base nas mudanças no serviço
  //   //       return this.dataSearchService.images$;
  //   //     })
  //   //   )
  //   //   .subscribe((filteredImages) => {
  //   //     this.images = filteredImages;
  //   //   });
  // }
  // searchForm!: FormGroup;
  // images: any[] = [];

  // constructor(
  //   private fb: FormBuilder,
  //   private dataSearchService: DataSearchService
  // ) {}
  // //

  // ngOnInit() {
  //   this.searchForm = this.fb.group({
  //     keyword: [''],
  //   });

  // this.searchForm
  //   .get('keyword')
  //   .valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((keyword) =>
  //       this.dataSearchService.getImagesByKeyword(keyword)
  //     )
  //   )
  //   .subscribe((filteredImages) => {
  //     this.images = filteredImages;
  //   });
  // }
}
