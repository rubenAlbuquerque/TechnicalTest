import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  cardHoverStates: { [key: number]: boolean } = {};
  isHovered: boolean = true;
  images: any[] = [];

  maxHeight = 300; // Altura máxima

  constructor(private localStorageService: LocalStorageService) {}

  onMouseEnter(index: number) {
    this.cardHoverStates[index] = true;
    console.log('cardHoverStates[index] : true', this.cardHoverStates[index]);
  }

  onMouseLeave(index: number) {
    this.cardHoverStates[index] = false;
    console.log('cardHoverStates[index] : false', this.cardHoverStates[index]);
  }
  // removeImage(i)
  // removeImage(index: number) {
  //   console.log('olaaaaaa:', this.images);
  //   this.images[index].show = !this.images[index].show;
  // }
  removeImage(index: number): void {
    // Update your images array
    this.images[index].show = !this.images[index].show;

    // Save the updated images array to local storage
    this.localStorageService.setItem('images', this.images);
    // console.log('localStorageService:', index, this.images);
    // console.log('localStorageService:', this.images[index]);
  }

  restor(): void {
    const storedImages = this.localStorageService.getItem('images');

    storedImages.map((i: any) => {
      i.show = false;
    });
  }

  ngOnInit(): void {
    // Fetch images from local storage
    const storedImages = this.localStorageService.getItem('images');

    // this.images = storedImages ? storedImages : [];
    this.restor();

    if (storedImages) {
      this.images = storedImages;
      console.log('storedImages True:', storedImages.length);
    } else {
      this.images = [
        {
          name: 'Nome lorem i',
          descricao: 'Imagem computador trabalho',
          author: 'Mario Santos',
          type: 'Gratis',
          url: '../../assets/img/1.jpg',
          show: true,
        },
        {
          name: 'Imagem computador trabalho 2',
          author: 'Mario Santos',
          type: '15.99$',
          url: '../../assets/img/2.jpg',
        },
        // {
        //   name: 'Imagem de natal',
        //   author: 'Mario Santos',
        //   type: 'Comprado',
        //   url: '../../assets/img/3.jpg',
        // },
        {
          name: 'Imagem de natal 2',
          author: 'Mario Santos',
          type: '15.99$',
          url: '../../assets/img/5.jpg',
        },
        {
          name: 'Imagem camera trabalho',
          author: 'Mario Santos',
          type: 'Comprado',
          url: '../../assets/img/4.jpg',
        },
        {
          name: 'Imagem de natal 2',
          author: 'Mario Santos',
          type: '15.99$',
          url: '../../assets/img/5.jpg',
        },
        {
          name: 'Imagem de natal 3',
          author: 'Mario Santos',
          type: '15.99$',
          url: '../../assets/img/6.jpg',
        },
        {
          name: 'Imagem de natal 4',
          author: 'Mario Santos',
          type: 'Comprado',
          url: '../../assets/img/7.jpg',
        },
        {
          name: 'Imagem camera trabalho',
          author: 'Mario Santos',
          type: 'Comprado',
          url: '../../assets/img/4.jpg',
        },

        // Adicionar imagens
      ];
      // Save default images to local storage
      this.localStorageService.setItem('images', this.images);
      console.log('storedImages false:', this.images);
    }
  }
}
