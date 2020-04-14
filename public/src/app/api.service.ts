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
  getApisWalk(){
    return this._http.get('/api/walk');
  }
  getApisRun(){
    return this._http.get('/api/run');
  }
  getApi(id){
    return this._http.get(`/api/user/${id}`,id);
  }
  createApi(newApi){
    return this._http.post('/api/user/new',newApi);
  }
  deleteApi(id){
    return this._http.delete(`/api/user/destroy/${id}`,id);
  }
  updateApi(updateApi){
    return this._http.put(`/api/user/update/${updateApi._id}`,updateApi);
  }
}

