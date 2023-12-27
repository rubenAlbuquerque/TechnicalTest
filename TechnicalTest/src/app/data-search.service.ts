import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
interface Tag {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataSearchService {
  private imagesSubject = new BehaviorSubject<any[]>([]);
  images$ = this.imagesSubject.asObservable();

  imgs: any[] = [];
  i: any;

  constructor(private localStorageService: LocalStorageService) {
    this.loadData();
  }

  updateImages(images: any[]): void {
    this.imagesSubject.next(images);
    // debugger;
  }

  private loadData(): void {
    const storedImagesString = this.localStorageService.getItem('images');
    const storedImages =
      typeof storedImagesString === 'string'
        ? JSON.parse(storedImagesString)
        : storedImagesString;

    if (storedImages) {
      console.log('storedImages:', storedImages);
      this.updateImages(storedImages);
    }

    console.log('images$:', this.imagesSubject);
  }

  getFilteredData(keyword: string): Observable<any[]> {
    const data = this.imagesSubject.getValue();
    console.log('data:', data);

    // const filteredImages = Object.values(data).filter((i) => {
    //   console.log(i.palavrasChave);

    //   i.palavrasChave.includes(keyword.toLowerCase());
    // });
    const filteredImages = Object.values(data).filter((i) => {
      console.log(i.palavrasChave);

      // Verifica se pelo menos uma das palavras-chave inclui a keyword
      return i.palavrasChave.some((tag: Tag) =>
        tag.name.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    console.log('filteredImages:', filteredImages);
    debugger;
    return of(filteredImages);
  }
  getData(i: any) {
    this.i = i;
    console.log('images:', this.i);
    return i;
  }

  setData() {
    console.log('images:', this.i);
    return this.i;
  }

  // getFilteredData(keyword: string): Observable<any[]> {
  //   const data = this.imagesSubject.value;
  //   console.log('data:', data);

  //   const filteredImages = Object.values(data).filter((i) =>
  //     i.palavrasChave.includes(keyword.toLowerCase())
  //   );

  //   console.log('filteredImages', filteredImages);

  //   return new Observable<any[]>((observer) => {
  //     observer.next(filteredImages);
  //     observer.complete();
  //   });
  // }

  // updateImages(images: any[]): void {
  //   // this.imagesSubject.next(images);
  //   // Atualiza as imagens no localStorage
  //   // localStorage.setItem('images', JSON.stringify(images));
  //   localStorage.setItem('images', JSON.stringify(images));
  // }

  // getData() {

  //   console.log('images:', this.images$);
  //   return this.images$;
  // }

  // filterImagesByKeyword(keyword: string): Observable<any[]> {
  //   const allImages = this.imagesSubject.value;

  //   // Simula uma requisição assíncrona com delay
  //   return of(allImages).pipe(
  //     delay(300),
  //     map((images) =>
  //       images.filter((image) =>
  //         image.palavrasChave.toLowerCase().includes(keyword.toLowerCase())
  //       )
  //     )
  //   );
  // }
}
