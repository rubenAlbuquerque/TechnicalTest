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

    const filteredImages = Object.values(data).filter((i) => {

      return i.palavrasChave.some((tag: Tag) =>
        tag.name.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    return of(filteredImages);
  }
  getData(i: any) {
    this.i = i;
    return i;
  }

  setData() {
    return this.i;
  }

}
