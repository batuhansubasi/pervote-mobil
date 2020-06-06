# Pervote (Personel Oylama Sistemi) | pervote-web

2019/2020 Kocaeli Üniversitesi Bilgisayar Mühendisliği Bölümü Bitirme Tezi Çalışmasıdır.

* 160202091 - Batuhan Subaşı
* 160202069 - Emre Altay

Bu repo web tarafını kapsamaktadır. Proje 3 farklı sistem üzerinden 3 repo halinde yürümektedir.

* [pervote-web](https://github.com/batuhansubasi/pervote-web)     - Frontend Web 
* [pervote-mobil](https://github.com/batuhansubasi/pervote-mobil) - Mobil Hybrit 
* [pervote-micro](https://github.com/batuhansubasi/pervote-micro) - Backend

**Web:** Admin yönetim tarafıdır. Yönetici, buradan kaydolur. Personelleri, departmanlarını oluşturur. Personellerin genel ve detaylı şekilde puan performansını görüntüler.

**Mobil:** Personelin sisteme giriş yaptığı kısımdır. Personeller şirket içi çalışanlarla beraber toplantılar oluşturur. Bu toplantılar sonucunda, toplantıya katılanlar birbirini oylar. Detaylı bilgileri girebileceği alan mevcuttur. 

**Micro:** Web ve mobil tarafın apilerinin ve bazı backend işlemlerinin yapıldığı taraftır.

# Genel İçerik

-	[Nasıl Çalıştırılır?](#nasil-calistirilir)
-	[Open-Source Kullanılan Kütüphaneler](#opensource-kullanilan-kutuphaneler)
-	[Proje Dizini İçerisindeki Klasörler ve Dosyalar](#proje-dizini-klasor-ve-dosyalar)
-	[Uygulama Ekran Görüntüleri](#uygulama-ekran-goruntuleri)


## Nasil Calistirilir

**1-** Proje bilgisayarınıza buradan indirilmelidir.

**2-** İndirdiğiniz projenin dizinine gidin ve konsol ekranınızı açın.

```
$npm install

```

**3-** Projeyi başlatabilirsiniz.

```
$npm run
```

[*Projeye canlı olarak buradan erişilebilir.*](https://batuhansubasi.github.io/pervote-web/)
 
## Kullanilan Temel Teknolojiler

### React

UI için kullandığımız javascript kütüphanesi. Yeniden kullanılabilir özelliklerinden faydalandık. Virtual dom' a sahip olması vs. ilk kez web geliştiren bizler için etkileyici oldu. Genel yapıyı react kütüphanesi üzerinden yürüttük.

Öğrenelim ve uygulayalım diye; componentler arası geçiş için react-router-dom(switch, route, link, redirect vs.) kullanıldı.

### Redux

Oluşturmuş olduğumuz componentlerin statelerini, diğer componentlerden rahatça çekebilmek ve ortak havuz oluşturmak amacıyla kullandık. İlk amacımız ise tabiki uygulamak ve öğrenmek içindi. Bu uygulamada ise sisteme giren kullanıcı bilgisini ve giriş yapıp yapmadığı dair kontrol parametresi kullandık.

![image](https://user-images.githubusercontent.com/30631029/83916555-0f24a880-a77e-11ea-837b-e523c9bfd7ab.png)

Lokal çalışma üzerinden Redux Ekran Görüntüsü

### Material UI

* Verilerin girildiği tekil bazı kutucuklarda, (textfield)
* Componentlerin hazırlanmasını beklerken animasyonlarda, (loader)
* Verilerin gösterilmesini, eklenebilmesini, silinmesi sağlayan ve ekstra exitlere açık olan **table** yapısında,
* Kullanıcıyı uyarmak için ekranda gösterdiğimiz uyarı metinlerinde (alert) **Material UI** kullanıldı.

## OpenSource Kullanilan Kutuphaneler

* [**React Icons**](https://react-icons.github.io/react-icons/) - İkon görselleri için kullanıldı.

* [**Material UI Rating Lab**](https://material-ui.com/components/rating/) - Personellerin puanlarının görselleştirilmesinde kullanıldı.

* [**React Moment**](https://www.npmjs.com/package/react-moment) - Veritabanından gelen timestamps' ın formatı için kullanıldı.

* [**MaterialTable**](https://www.npmjs.com/package/material-table) - Personellerin tablo halinde listelenmesi, eklenmesi ve çıkarılması işlemleri yapıldı.

* [**reCAPTCHA**](https://developers.google.com/recaptcha/docs/v3) - Login olurken spamı engellemek için kullanıldı.

* [**react-loader-spinner**](https://www.npmjs.com/package/react-loader-spinner) - Personellerin puanlarının görselleştirilmesinde kullanıldı.

## Proje Dizini Klasor ve Dosyalar
Bu örnek dizin harici, proje için kullanılan başka dosyalarda var. Sadece doğrudan yazdıklarımızı açıklayacağız.
```
pervote-web
 |-- src
      |-- actions 
           |-- index.js           -> Redux üzerinde hangi işlemi gerçekleştireceğimizi (giriş için mi yoksa email kaydetmek için mi) burada tanımlıyoruz.
      |-- components    
           |-- Banner.js          -> Genellikle tek işlemli işlevlere sahip olan sayfalarımızda ortak olarak kullandığımız, sayfanın tam ortasında bulunan ve özelleştirilebilen component.
           |-- Hero.js            -> Navigationbar ile ayrışmamızı sağlayan component. Özelleştirilmezse App.css dosyasında defaultHero olarak dizaynı belirlemekte.
           |-- Navbar.js          -> Üst tarafta bulunan, hızlı yönlendirmelere sahip işlev. Sisteme giriş yapılmadığı zamanki elementler ile sisteme giriş yapıldıktan sonraki elementler değişiyor.
           |-- Personnel.js       -> İlgili personele verilmiş olan oyların tek tek listelendiği ekranda, tekilleştirmeyi yeniden      kullanılabilir yapıyı sağlayan component. Component içerisinde puanlanmış olan toplantı bilgisi, oyu veren personel bilgisi ve oy bilgileri elementlere sahip.
           |-- UserFunction.js    -> Backend tarafında yazmış olduğumuz rest API' lere, bu ortak oluşturmuş olduğumuz fonksiyon         yapısıyla gidildi.
      |-- helpers   
           |-- jwt.js             -> Backend tarafında login işlemlerinde bize dönen storeKey değişkeni => jwt, React' ın localStorage' ında tutuldu, kullanıcı logout yapıldığında sıfırlandı.
      |-- images   
           |-- defaultBcg.jpeg    -> Ekranın arkasına defaultHero seçildiğinde statik olarak gelen resim.
           |-- logo.svg           -> Navigationbar üzerinde bulunan statik, proje logomuz.
      |-- pages
           |-- Department.js      -> Yönetici bazında departman bilgisinin gösterildiği, eklenebildiği ve çıkarabildiği sayfadır. 
           |-- Error.js           -> Yetkilendirmeden ya da var olmamasından dolayı ilgili pathe gidildiğinde kullanıcıya hata döndüğünü gösteren ekrandır.
           |-- Home.js            -> Giriş ekranıdır, genel bilgilendirme yapılmıştır.
           |-- Login.js           -> Yönetici giriş ekranıdır. Şifreyi unutulursa, şifreyi ilgili maile gönderme özelliği vardır. Bu sayfa üzerinde Recaptcha kullanılmıştır.
           |-- Mobile.js          -> Mobil uygulama için bilgilendirme ekranıdır.
           |-- Personnel.js       -> Personellerin listelendiği sayfadır. Personel resmi, genel ortalama puan durumu, departmanı ve kişisel bilgileri yer almaktadır. Buradan single personnel componentine gidilebilir, böylece tıklanan personelin puan detayları görüntülenir. Aynı zamanda silme, ekleme, arama yapma gibi özellikleri vardır.
           |-- Register.js        -> Yöneticinin sisteme kaydolma ekranıdır.
           |-- Setting.js         -> Yöneticinin şifre değiştirme ekranıdır.
           |-- SinglePersonnel.js -> Bir personelin, hangi puanlarının aldığı detay ekranıdır. Component klasöründeki Personnel.js dosyasının Hero içerisinde listelenmiş halidir.
      |-- reducers
           |-- index.js           -> Redux için oluşturmuş olduğunuz 2 reducers' ın tek bir reducer halinde geri döndürülmesi amacıyla oluşturulan dosyadır.
           |-- isLogged.js        -> Sisteme kullanıcı giriş yaptığı zaman, action type' ına göre koşullandırılıp gerekli işlemlerin yapıldığı dosyasıdır.
           |-- loggedEmail.js     -> Sisteme girilen kullanıcının email bilgisini tutar.
      |-- App.css                 -> Genel dizayn dosyamızdır. Global değişkenler, navigationbar, hero, banner ve person elementlerine özgü gerekli dizayn ögelerini barındırır.
      |-- App.js                  -> Sistemin route' larının belirlendiği kısımdır. Yetkilendirme varsa bazıları, yetkilendirme yoksa diğerleri görüntülenir.
      |-- index.js                -> Projenin başlatıldığı kısımdır. Redux' un store'u, React' in routerı vs. taglerle sarmalanmıştır.
```
## Uygulama Ekran Goruntuleri

![image](https://user-images.githubusercontent.com/30631029/83819475-a16f7280-a6d2-11ea-8c95-76b5a8b3e414.png)

**Ana Sayfa Ekranı:** Uygulama üzerinden adminin ve sistemin ne yapacağı hakkında bilgi veren giriş ekranıdır.

---

![image](https://user-images.githubusercontent.com/30631029/83914763-8fe1a580-a77a-11ea-82d8-d6d6cfd31553.png)

**Kaydolma Ekranı:** Sisteme üye olmak isteyen yönetici kaydolma ekranıdır.

---

![image](https://user-images.githubusercontent.com/30631029/83913954-f9f94b00-a778-11ea-9bcf-bac9a9b876c1.png)

**Giriş Ekranı:** Sisteme giriş yapacak olan yönetici giriş ekranıdır.

---

![image](https://user-images.githubusercontent.com/30631029/83914078-3462e800-a779-11ea-9508-1a8881cf9195.png)

**Admin Personel Yönetim Ekranı:** Personellerin resim, genel bilgi ve ortalama puanlarıyla beraber listelendiği, ekleme ve çıkarma seçeneklerinin olduğu ve ilgili personelin puan detaylarına gidebileceği işlevsellik bulunmaktadır.

---

![image](https://user-images.githubusercontent.com/30631029/83914174-607e6900-a779-11ea-8571-2b372cd630f5.png)

**İlgili Personelin Puan Detay Ekranı:** Personelin almış olduğu puanların, hangi toplantıda ve kim tarafından oy verildiğinin listelendiği ekrandır.

---

![image](https://user-images.githubusercontent.com/30631029/83914200-6bd19480-a779-11ea-98a1-fcb07811684c.png)

**Admin Departman Yönetim Ekranı:** Departmanların görüntülenmesi, eklenebilmesi ve çıkarabilmesini sağlayan yönetim ekranıdır.

---

## Yapilabilecekler

* name.com üzerinden domain alındı. (06 Mart) Şuan github page' den host yapılıyor. İleriye doğru kendi domain geçilebilir.
