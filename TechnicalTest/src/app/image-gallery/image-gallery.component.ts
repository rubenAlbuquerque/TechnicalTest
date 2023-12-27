import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { DataSearchService } from '../data-search.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  cardHoverStates: { [key: number]: boolean } = {};
  isHovered: boolean = true;
  img: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private dataSearchService: DataSearchService
  ) {}

  onMouseEnter(index: number) {
    this.cardHoverStates[index] = true;
    // console.log('cardHoverStates[index] : true', this.cardHoverStates[index]);
  }

  onMouseLeave(index: number) {
    this.cardHoverStates[index] = false;
    // console.log('cardHoverStates[index] : false', this.cardHoverStates[index]);
  }

  removeImage(id: any): void {
    // Update your images array data: any
    // console.log(data.show);
    // const indexToUpdate = data.findIndex((objeto) => objeto.id === dataId);
    // this.images[index].show = !this.images[index].show;
    console.log(id, this.img);

    if (this.img[id]) {
      console.log('this.images[id].show', this.img[id].show);
      this.img[id].show = !this.img[id].show;
      // ,, !this.images[id].show;
    }

    // console.log(this.images[index], this.images[index].show);
    // this.images[index].show = true;
    // console.log(this.images[index], this.images[index].show);
    // Save the updated images array to local storage
    this.localStorageService.setItem('images', this.img);

    // console.log('localStorageService:', index, this.images);
    // console.log('localStorageService:', this.images[index]);
  }

  ngOnInit(): void {}

  getChavesDoObjeto() {
    // console.log(Object.values(this.images)[0].show);
    // console.log(Object.entries(this.images));
    return Object.values(this.img);
  }

  getChavesEValoresDoObjeto() {
    // console.log(Object.entries(this.images));
    return Object.entries(this.img);
  }

  getValuesDoObjeto() {
    const i = this.dataSearchService.setData();
    console.log('i:', i);

    if (i != undefined) {
      debugger;
      return Object.values(i);
    }
    // debugger;

    this.dataSearchService.images$.subscribe((images) => {
      this.img = images;
      // console.log('imagesDDDDD:', images);
    });
    // console.log('images:', this.img);
    console.log('print', Object.values(this.img));
    return Object.values(this.img);
  }

  print(k: any, v: any) {
    // console.log('print', k, v);
  }
}
