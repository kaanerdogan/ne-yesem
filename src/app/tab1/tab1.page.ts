import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

//API's
import { TranslateService } from "../api/translate/translate.service";
import { RecipesService } from "../api/recipes//recipes.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  favoriteCounter = 0;
  query = "";
  recipes = [];
  recipesCount = "";
  recipeControl = true;
  isLogedIn = true;
  filters = [];

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public tService: TranslateService,
    public rService: RecipesService,
    public toastController: ToastController
  ) {
    this.platform.backButton.subscribeWithPriority(997, () => {
      if (this.constructor.name == "Tab1Page") {
        if (window.confirm("Çıkış yapmak ister misiniz?")) {
          navigator["app"].exitApp();
        }
      }
    });
  }

  async sendToTranslate(query) {
    console.log("Input'a girilen değer: " + query);
    if (query == "") {
      const alert = await this.alertCtrl.create({
        header: "Hata!",
        message: "Lütfen boş bırakmayınız!",
        buttons: ["Tamam"],
      });
      await alert.present();
    } else {
      const loading = await this.loadingCtrl.create({
        message: "Çevriliyor...",
      });
      await loading.present();
      console.log("Çeviriye gönderilen sorgu: " + query);
      this.tService.translateToEn(query).subscribe((res) => {
        console.log("Çeviriden gelen ilk veri: ");
        console.log(res);
        var resText = <any>res;
        console.log("Object içerisinden alınan çeviri: " + resText.text);
        resText.text.forEach((element) => {
          console.log(
            "Çeviriden dönen nesne içerisinden dizi alındı. Dizi içerisinde ki yazı: " +
              element
          );
          console.log(
            "Çeviriden dönen yanıtın içerisindeki yazı edamam'a gönderiliyor..."
          );
          loading.dismiss();
          this.sendToRecipe(element);
        });
      });
    }
  }

  async sendToRecipe(query: any) {
    console.log("Edamam tarif API'ına gönderilen sorgu: " + query);
    const loading = await this.loadingCtrl.create({
      message: "Tarif Getiriliyor...",
    });
    await loading.present();
    this.rService.getRecipes(query).subscribe((data) => {
      console.log("Edamam'dan yanıt döndü... \nDönen yanıt: " + data);
      var anyData = <any>data;
      console.log(
        "Edamam'dan dönen yanıt içerisinden alınmak istenen nesne elemanları, bilinen bir değişkene atandı."
      );
      console.log("Toplam " + anyData.count + " adet tarif bulundu!");
      console.log("Tariflerden 10 tanesi ekrana basılıyor...");
      this.recipes = anyData.hits;
      console.log("Ön tarafa gönderilen dizinin içeriği: ");
      console.log(this.recipes);
      this.recipesCount = anyData.count - 10 + " tarif daha var.";
      this.recipeControl = false;
      loading.dismiss();
    });
  }

  async favorite(label) {
    this.favoriteCounter++;
    if (this.favoriteCounter % 2 == 0 && this.isLogedIn == true) {
      const toast = await this.toastController.create({
        message: `${label} favorilere eklendi!`,
        duration: 2000,
      });
      toast.present();
      console.log(label + " Favorilere eklendi!");
    } else if (this.isLogedIn == false) {
      const toast = await this.toastController.create({
        message: "Giriş yapılmadığından bu özellik kullanılamaz!",
        duration: 2000,
      });
      toast.present();
      console.log(label + " favorilere eklenemedi çünkü giriş yapılmamıştı!");
    }
    // else {
    //   const toast = await this.toastController.create({
    //     message: `En son yaptığınız işlem ile ilgili bir hata oluştu. Lütfen bizimle iletişime geçin.`,
    //     duration: 2000,
    //   });
    //   toast.present();
    //   console.log("Favori işlemleri ile ilgili bir hata oluştu.");
    // }
  }

  async filter() {
    const alert = await this.alertCtrl.create({
      header: "Filtreler",
      inputs: [
        {
          name: "kisiSayisi",
          type: "checkbox",
          label: "2-4 Kişilik",
          value: "2-4 Kişilik",
        },

        {
          name: "sureliler",
          type: "checkbox",
          label: "Sadece süreli olanlar",
          value: "Süreliler",
        },

        {
          name: "azYagli",
          type: "checkbox",
          label: "Az Yağlı (<= 100g)",
          value: "Az yağlı",
        },

        {
          name: "azMalzemeli",
          type: "checkbox",
          label: "Az Malzemeli (<= 4)",
          value: "Az Malzemeli",
        },
      ],
      buttons: [
        {
          text: "Vazgeç",
          role: "cancel",
          handler: () => {
            console.log("Filtreleme işleminden vazgeçildi");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            if (data != "") {
              console.log("Filtreleme işlemi için seçilenler: " + data);
              data.forEach((elem) => {
                this.filters.push(elem);
              });
            } else
              console.log(
                "Filtreleme işlemi tamamlanmadı çünkü herhangi bir seçim yapılmadı!"
              );
          },
        },
      ],
    });
    await alert.present();
  }

  // async share() {
  //   const toast = await this.toastController.create({
  //     message: "Tarif paylaşılıyor. mu?",
  //     duration: 2000,
  //   });
  //   toast.present();

  // }
}
