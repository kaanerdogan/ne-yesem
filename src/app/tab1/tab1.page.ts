import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

//API's
import { TranslateService } from '../api/translate/translate.service';
import { RecipesService } from '../api/recipes//recipes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  query: string;
  recipes = [];
  recipesCount = '';
  recipeControl = true;

  constructor(public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public tService: TranslateService,
    public rService: RecipesService) {
    this.platform.backButton.subscribeWithPriority(997, () => {
      if (this.constructor.name == "HomePage") {
        if (window.confirm("Çıkış yapmak ister misiniz?")) {
          navigator["app"].exitApp();
        }
      }
    });
  }


  searchRecipe(e: any) {
    this.query = e.detail.value;
  }

  async sendToTranslate() {
    if (this.query == undefined) {
      const alert = await this.alertCtrl.create({
        header: "Hata!",
        message: "Lütfen boş bırakmayınız!",
        buttons: ['Tamam']
      });
      await alert.present();
    }
    else {
      const loading = await this.loadingCtrl.create({
        message: "Çevriliyor..."
      });
      await loading.present();
      console.log("Translate'e gönderilen sorgu: " + this.query);
      this.tService.translateToEn(this.query).subscribe((res) => {
        console.log(res);
        var resText = <any>res;
        console.log(resText.text);
        resText.text.forEach(element => {
          this.query = element;
        });
        console.log("this.query = " + this.query);
        console.log("Google'dan dönen yanıtın içerisindeki yazı edamam'a gönderiliyor...");
        loading.dismiss();
        this.sendToRecipe();
      });
    }
  }

  async sendToRecipe() {
    const loading = await this.loadingCtrl.create({
      message: "Tarif Getiriliyor..."
    });
    await loading.present();
    this.rService.getRecipes(this.query).subscribe((data) => {
      console.log("edamam\'dan yanıt döndü...");
      var anyData = <any>data;
      console.log("Edamam\'dan dönen yanıt içerisinden alınmak istenen nesne elemanları ön tarafa gönderildi.");
      console.log("Tarifler ekrana basılıyor...");
      this.recipes = anyData.hits;
      console.log(this.recipes);
      this.recipesCount = (anyData.count - 10) + ' tarif daha var.';
      this.recipeControl = false;
      console.log(anyData.count + " Adet tarif bulundu!");
      loading.dismiss();
    });
  }

}
