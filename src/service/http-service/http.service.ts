import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUser } from '../../app/models/app.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl: string = 'https://6580f9853dfdd1b11c424344.mockapi.io';
  constructor(private http: HttpClient) {}

  getData(path: string, name: string | null) {
    const url: string = this.apiUrl + path;
    const params = { name: name ?? '' };
    return this.http.get(url, { params });
  }

  getDataById(path: string, id: string) {
    const url: string = this.apiUrl + path + '/' + id;
    return this.http.get(url);
  }

  postData(path: string, body: DataUser) {
    const url: string = this.apiUrl + path;
    return this.http.post(url, body);
  }

  deleteData(path: string, id?: string) {
    const url: string = this.apiUrl + path + `/${id}`;
    return this.http.delete(url);
  }

  editData(path: string, id: string, payload: DataUser) {
    const url: string = this.apiUrl + path + `/${id}`;
    return this.http.put(url, payload);
  }
}
