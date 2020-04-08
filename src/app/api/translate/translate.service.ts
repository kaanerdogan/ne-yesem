import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Api
import { yandexEnvironment } from 'asd/environment/translate';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  URL = yandexEnvironment.URL;
  key = yandexEnvironment.key;
  lang = yandexEnvironment.lang;

  translateToEn(query: any) {
    return this.http.get(`${this.URL}?key=${this.key}&text=${query}&lang=${this.lang}`);
  }

}
