# Ne Yesem

###### Ne Yesem is a mobile recipe application. Rest of this readme will be in Turkish. If you wish to need more information please contact.

[<small>Bilinen hatalar ile için</small>->](#bilinen-hatalar)

Ne Yesem, Ionic Framework ile geliştirilen bir mobil uygulamadır. Tarifler Edamam tarafından sağlanan API ile çekilir. API dan veri istenirken ingilizce sorgu göndermeniz gerekmektedir. Bu uygulamada Yandex tarafından sağlanan çeviri API ı kullanılarak metin alanına yazılan Türkçe kelimeler önce İngilizceye çevrilir. Daha sonra tarif için API a gönderilir. Geri döndürülen sonuçlar ekrana bastırılır. 

> Uygulama ana ekranı

<img src="https://kaanerdogan.com.tr/ne-yesem/assets/img/before-search.jpg" alt="Before Search" width="200" height="400">

>Tarif aradıktan sonra

<img src="https://kaanerdogan.com.tr/ne-yesem/assets/img/after-search.jpg" alt="After Search" width="200" height="400">

### Bilinen Hatalar

- Yazma işlemini hızlı yazıp hemen arama butonuna basıldığı zaman sorgunun boş gönderilmiş gibi algılandığı ve hata metnini göstermesi
- ~~Türkçesini yazıp arama yaptıktan sonra sorgu kısmında yazılan metnin İngilizcesinin gözükmesi~~
- Tarif geldikten sonra tarifin isminin ve malzemelerin İngilizce kalması

### Gelecek Özellikler

- Fotoğrafa çift tıklandığında tarifi favorilere ekleme
- Başkalarıyla paylaşabilme
- Gösterilen tarifte herhangi bir hata oluşmasına karşın hata bildir butonu.
- Tarife tıklanıldığında açılan yeni bir sayfada tarifin tüm özelliklerinin gösterilmesi.

> Geliştirmeler devam ediyor.

### Yükleme

Ne Yesem, [Ionic](https://ionicframework.com/) ile kodlanmıştır. Çalıştırılması ve native çıktı alınabilmesi için [Ionic CLI](https://ionicframework.com/docs/cli) yüklü olmalıdır.

Ionic, [TypeScript](http://www.typescriptlang.org/) tabanlıdır ve [Node.js](https://nodejs.org/en/) ile oluşturulmuştur. Node 10.3+ sürümleri desteklenir, ancak en son LTS(Long Term Support) sürümü önerilmektedir. Node.js [indirme](https://nodejs.org/en/download/) sayfasından kullanılacak işletim sistemi ve mimari seçilerek indirme işlemine devam edilmelidir. İndirme işlemi tamamlandıktan sonra yükleme tamamlanmalıdır.

Yükleme
>node --version

ve

>npm --version

ile kontrol edilmelidir. Node yüklemesi doğrulandıktan sonra 

>npm install -g @ionic/cli

komutu ile Ionic CLI yüklemesi gerçekleştirilir.

>ionic --version

kodu ile ionic cli yüklemesi doğrulanmalıdır.

Herhangi bir sıkıntı oluşması durumunda, kullanılabilir komutlar

>ionic --help

ile görülebilir.

Node ile inşa edilmiş uygulamalar genellikle taşınma durumunda `node_modules` adı verilen ve projenin çalıştırılabilmesi için önem arz eden klasör, proje ana klasörünün içeriğinden kaldırılarak taşınır. Taşınma işleminden sonra `node_modules` klasörü dahil bazı gereksinimlerin yüklenmesi için

>npm install

komutunun, proje ana klasörü altında çalıştırılması gerekmektedir.

Gerekli yüklemelerin bitmesi sonucunda yine projenin ana klasörü altında

>ionic serve

komutu çalıştırılarak proje, bilgisayar üzerinde tarayıcıdan görüntülenebilecek şekilde ayağa kaldırılabilir.

Proje native özellik eklenmeden oluşturulmuş bir projedir. Projenin yapabileceği fonksiyonların tamamına, tarayıcı üzerinden görüntülenmesi durumunda erişilebilir. Ancak yine de cihaz üzerinde test edilecekse

>ionic cordova run android --device 

kodu ile Android cihazlarda,

>ionic cordova run ios --device

komutu ile Ios cihazlarda çalıştırılabilir.