import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataSearchTableDataSource, DataSearchTableItem } from './data-search-table-datasource';
import { TabledataService } from '../service/table-data.service';
import { Subject,Observable } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-data-search-table',
  templateUrl: './data-search-table.component.html',
  styleUrls: ['./data-search-table.component.css']
})
export class DataSearchTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DataSearchTableItem>;
  dataSource: DataSearchTableDataSource;

  enterSearchText = new Subject<string>();
  
  constructor(private tableService: TabledataService){
    this.enterSearchText.pipe(debounceTime(500)).subscribe(searchText => {
      this.Search(searchText);
    });
  }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'title', 'last_modified_i'];
  searchKey: any;

  ngOnInit() {
    //this.dataSource = new DataSearchTableDataSource([]);    
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  // applyFilter(filterValue: string){    


  //   //this.dataSource.filter = filterValue.trim().toLowerCase();

  //   this.tableService.getSearchResults(filterValue).subscribe((data)=>{
  //     if(data === undefined || data === null)
  //     {
  //       alert("no record to show");
  //      return;
  //     }
  //    this.dataSource = new DataSearchTableDataSource(data.docs);
  //    this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  //  });
    
  // }

  private Search(filterValue: string){        
  
      this.tableService.getSearchResults(filterValue).subscribe((data)=>{
        if(data === undefined || data === null)
        {
          alert("no record to show");
         return;
        }
       this.dataSource = new DataSearchTableDataSource(data.docs);
       this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
     });
      
    }

  applyFilter(event: any) {
    //this.searchText = this.textSearchComponent.searchText;
    if (event.target.value.length > 1) {
      if (event.key == 13) {

        this.Search(event.target.value);
        return;
      } else {

        this.enterSearchText.next(event.target.value);
        return;
      }
    }
    if (event.target.value.length == 0) {
      this.clearSearchResults();
    }
  }

  private clearSearchResults(){
    this.dataSource = new DataSearchTableDataSource([]);
    this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
   this.table.dataSource = this.dataSource;
  }
}

