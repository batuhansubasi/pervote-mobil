# Pervote (Personel Oylama Sistemi) | pervote-mobil

2019/2020 Kocaeli Üniversitesi Bilgisayar Mühendisliği Bölümü Bitirme Tezi Çalışmasıdır.

* 160202091 - Batuhan Subaşı
* 160202069 - Emre Altay

Bu repo web tarafını kapsamaktadır. Proje 3 farklı sistem üzerinden 3 repo halinde yürümektedir.

* [pervote-mobil](https://github.com/batuhansubasi/pervote-mobil) - Mobil Hybrit 
* [pervote-web](https://github.com/batuhansubasi/pervote-web)     - Frontend Web 
* [pervote-micro](https://github.com/batuhansubasi/pervote-micro) - Backend

**Mobil:** Personelin sisteme giriş yaptığı kısımdır. Personeller şirket içi çalışanlarla beraber toplantılar oluşturur. Bu toplantılar sonucunda, toplantıya katılanlar birbirini oylar. Detaylı bilgileri girebileceği alan mevcuttur. 

**Web:** Admin yönetim tarafıdır. Yönetici, buradan kaydolur. Personelleri, departmanlarını oluşturur. Personellerin genel ve detaylı şekilde puan performansını görüntüler.

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

### React Native
image,stylesheet,alert,text,view,image,textinput,touchableopacity, keyboardavoidingview, activiyindicator,asynstorage,statusbar,scrollview,

### Expo

expo/vector-icons
expo-linear-gradient
expo-asset
expo-sms
expo-image-picker
expo-constants
expo-permissions

## OpenSource Kullanilan Kutuphaneler

* [**React Navigation**](https://reactnavigation.org/) - @react-navigation/stack,@react-navigation/drawer,@react-navigation/native

* [**React Native Reanimated**](https://www.npmjs.com/package/react-native-reanimated) - P

* [**expo-ui-kit**](https://www.npmjs.com/package/expo-ui-kit) - V

* [**moment**](https://www.npmjs.com/package/qs) - P

* [**react-native-material-dropdown**](https://www.npmjs.com/package/react-native-material-dropdown) - L

* [**react-native-sectioned-multi-select**](https://www.npmjs.com/package/react-native-sectioned-multi-select) - P

* [**react-native-modal-datetime-picker**](https://www.npmjs.com/package/react-native-modal-datetime-picker) - P

## Proje Dizini Klasor ve Dosyalar
Bu örnek dizin harici, proje için kullanılan başka dosyalarda var. Sadece doğrudan yazdıklarımızı açıklayacağız.
```
pervote-web
 |-- src
      |-- components 
           |-- Drawer.js  ->
           |-- Logo.js    ->
           |-- Meeting.js ->
      |-- images 
           |-- image.js   ->
           |-- website_logo_slid_background.png  ->
      |-- pages
           |-- ChangePassword.js     ->
           |-- Contact.js    ->
           |-- InformationDetail.js  ->
           |-- Login.js      ->
           |-- Main.js       ->
           |-- Meeting.js    ->
           |-- Point.js      ->
      |-- admin.model.js     -> 
      |-- meeting.model.js   ->
      |-- personnel.model.js ->
      |-- point.model.js     ->
 |-- routes    
      |-- admins.js          -> 
      |-- meetings.js        -> 
      |-- personnels.js      ->
      |-- points.js          ->  
 |-- App.js                  -> 
 |-- config.js               -> 
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
