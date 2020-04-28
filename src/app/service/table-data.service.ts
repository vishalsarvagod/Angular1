import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataObject } from '../data-search-table/data-search-table-datasource';

@Injectable()
@Injectable({
  providedIn: 'root'
})
export class TabledataService {

  private serviceUrl = 'http://openlibrary.org/people/george08/lists/OL97L/seeds.json';
  
  private serviceUrlSearch = 'http://openlibrary.org/search.json';

    constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.serviceUrl);
  }

  getSearchResults(filter: string): Observable<DataObject> {
    let queryString: string = '?q=' + filter;
    return this.http.get<DataObject>(this.serviceUrlSearch + queryString);
    //return this.http.get(this.serviceUrlSearch);
  }
}
