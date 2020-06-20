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

**2-** İndirdiğiniz projenin dizinine gidin ve konsol ekranınızı açın. Sırayla npm ve expo kütüphaneleri indirin.

```
$npm install

```

```
$npm install -g expo-cli

```

**3-** Projeyi başlatabilirsiniz.

```
$expo start
```

**4-** Sizi varsayılan tarayıcınıza yönlendirecektir. Eğer mobil uygulama üzerinde denemek istiyorsanız, uygulama marketinden expo uygulamasını indirmelisiniz. Web üzerinden bazı componentler düzgün şekilde çalışmayacaktır. Tunnel modunda üretmiş olduğu QR Kodu telefonun kamerası kullanılarak okutulur.

[*Projeye canlı olarak buradan erişilebilir.*](https://batuhansubasi.github.io/pervote-web/)
 
## Kullanilan Temel Teknolojiler

### React Native

Mobil için iki platforma ürün çıkarabilmek için tercih edildi. Web tarafında öğrenilen React bilgilerini pekiştirmek amacıyla devam edildi. 

##### Kullanılan Kütüphaneler

* **image** - Personel resmi, PerVote iconu gibi görseller için kullanıldı.
* **stylesheet** - Componentlerin dizayn öğelerini özelleştirmek için kullanıldı.
* **alert** - Kullanıcıya uyarı vermek için kullanıldı. (Kamera izni vb.)
* **text** - Ekran üzerinde basit metin öğelerini yansıtmak için kullanıldı.
* **textinput** - Personelin metin girebileceği girdiler için kullanıldı.
* **touchableopacity** - Kullanılan componente ekran üzerinde basma işlevi için kullanıldı.
* **keyboardavoidingview** - Klavye açıldığında bu view içerisindeki componentlerin, klavye üstüne otomatik olarak taşınması için kullanıldı.
* **activityindicator** - Yapılan işlemlerde, işlemin devam ettiğini belirtmek için kullanıldı.
* **asynstorage** - Bazı bilgilerin uygulama çalıştığında oraya yazdırılıp, başka bir sayfada bu bilginin çekilebilmesi adına kullanıldı.
* **scrollview** - Toplantıların listelenmesi gibi sayısı belli olmayan componentlerin renderında kullanıcının rahatça aşağı-yukarı kaydırabilmesi adına kullanıldı.

### Expo

Geliştirmeleri anlık olarak telefonda görebilmek ve sahip olduğu hazır component kütüphanelerinden faydalanmak amacıyla kullanıldı.

##### Kullanılan Kütüphaneler

* **expo/vector-icons** - Drawer componentinde listenen screenler iconlarla görselleştirilerek UI Design pekiştirildi.
* **expo-linear-gradient** - Drawer componentinde PerVote projesinin ana renkleri olan mor ve pembe renkleri kullanıldı.
* **expo-asset** - Şirket logosu drawer componentinde gösterebilmek için kullanıldı.
* **expo-sms** - Contact page' i üzerinden uygulama geliştiricilere sms atabilmek için telefonun sms ekranına otomatik olarak yönlendirilebilmesi sağlandı.
* **expo-image-picker** - Personelin galerisinde ya da kamerasında kullanabileceği resmini sisteme yükleyebilmesi için kullanılmıştır.
* **expo-constants** - Genel olarak buradaki componentlerin kullanılabilmesi için faydalanılmıştır.
* **expo-permissions** - Personelin galerisine izin almak için kullanılmıştır.

## OpenSource Kullanilan Kutuphaneler

* [**React Navigation**](https://reactnavigation.org/) - Drawer componenti için createstacknavigator metodu ile stack oluşturmak, createdrawernavigator nesnesi ile drawer oluşturmak için kullanıldı. Böylece; toplantı, puan, şifre değiştirme, personel detayı ve iletişime geç sayfaları arasında geçiş sağlandı.

* [**React Native Reanimated**](https://www.npmjs.com/package/react-native-reanimated) - Drawer nesnesi için esneklik sağlamasını adına kullanıldı.

* [**expo-ui-kit**](https://www.npmjs.com/package/expo-ui-kit) - Butonlar, textler ve blocklar için bu hazır kitten yararlanılmıştır.

* [**moment**](https://www.npmjs.com/package/qs) - DateTimePicker componentinden gelen timestamp değeri ya da veritabanından gelen timestamp değerinin formatlı şekilde kullanıcıya düzgün gözükmesi adına kullanılmıştır.

* [**react-native-material-dropdown**](https://www.npmjs.com/package/react-native-material-dropdown) - Web tarafında, ilgili personel admini tarafından girilmiş olan departmanların, personel bilgilerini güncellediği ekranda liste halinde personele sunulması amacıyla kullanılmıştır.

* [**react-native-sectioned-multi-select**](https://www.npmjs.com/package/react-native-sectioned-multi-select) - Toplantı seçerken hangi personellerin katılacağının belirlenmesi adına bu component kullanılmıştır. Aynı admine bağl

* [**react-native-modal-datetime-picker**](https://www.npmjs.com/package/react-native-modal-datetime-picker) - Toplantı tarihinin tarih ve saat yönünden seçilmesi adına kullanılmıştır.

## Proje Dizini Klasor ve Dosyalar
Bu örnek dizin harici, proje için kullanılan başka dosyalarda var. Sadece doğrudan yazdıklarımızı açıklayacağız.
```
pervote-web
 |-- src
      |-- components 
           |-- Drawer.js  -> PerVote logosu, uygulama ismi, giriş yapan kullanıcı maili ve kullanıcının işlevlerinden yararlanabileceği ekranlar arasında geçiş yapması için oluşturulmuş olan componenttir. Main sayfasından çağırılır.
           |-- Logo.js    -> Drawer componentinde bulunan PerVote logosu için oluşturulmuş componenttir.
           |-- Meeting.js -> Personelin katılacak olduğu toplantılar listelenmesi için oluşturulan tekil toplantı componentidir.
      |-- images 
           |-- image.js   -> Drawer componentindeki PerVote logosudur.
           |-- website_logo_slid_background.png  -> Giriş ekranındaki PerVote logosudur.
      |-- pages
           |-- ChangePassword.js     -> Giriş yapmış olan personelin şifre değiştirme ekranıdır. Eski şifre, yeni şifre ve yeni şifrenin tekrarı kullanıcıdan alınır. Gerekli kontrollerden geçerse, personel update API' si ile şifre tekrar şifrelenerek güncellenir.
           |-- Contact.js    ->  Personelin geliştiricilerle iletişime geçebileceği otomatik SMS ve mail sayfalarına yönlendirme yapılabileceği işlevler kazandırıldı. Drawer üzerindeki işlevlerin ne işe yaradığından bahsedildi.
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
