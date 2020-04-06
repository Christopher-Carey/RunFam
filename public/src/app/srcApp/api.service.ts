import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public _http: HttpClient) { }
  getApis(){
    return this._http.get('/api');
  }
  getApi(id){
    return this._http.get(`/api/task/${id}`,id);
  }
  createApi(newApi){
    return this._http.post('/api/task/new',newApi);
  }
  deleteApi(id){
    return this._http.delete(`/api/task/destroy/${id}`,id);
  }
  updateApi(updateApi){
    return this._http.put(`/api/task/update/${updateApi._id}`,updateApi);
  }
}

