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
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((keyword) => this.dataSearchService.getFilteredData(keyword))
      )
      .subscribe((filteredImages) => {
        this.imgs = filteredImages;
        console.log('images:', this.imgs);
        this.dataSearchService.getData(filteredImages);
      });

  }

  onSearch($event: any) {
    this.keyword = $event.target.value;
    console.log(this.keyword);
  }

}
