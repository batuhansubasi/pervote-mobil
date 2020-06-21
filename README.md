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

* [**moment**](https://www.npmjs.com/package/react-moment) - DateTimePicker componentinden gelen timestamp değeri ya da veritabanından gelen timestamp değerinin formatlı şekilde kullanıcıya düzgün gözükmesi adına kullanılmıştır.

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
           |-- InformationDetail.js  -> Personelin resmini, ismini, soyismini, dogum yılını, telefon numarasını ve departman bilgilerini güncelleyebileceği ekran tasarlanmıştır. 4 alan için textinput componenti kullanılıp propsları özelleştirilmiştir. Departman bilgisi admin tarafında güncellenen bilgiye göre dropdown özelliğiyle render edilmektedir. Resim, galeriden veya kamera kullanılarak seçilebilir.
           |-- Login.js      -> Personelin email ve şifresiyle beraber sisteme giriş yapabileceği ekrandır. Ayrıca, şifresini unuttuğu takdirde yeni şifresini mail üzerinden alabileceği işlev mevcuttur. 
           |-- Main.js       -> Drawer componentinin çağrıldığı sayfadır.
           |-- Meeting.js    -> Personelin yeni toplantı girebileceği ve hali hazırdaki toplantılarını görebileceği ekrandır. Toplantı konusu, toplantının zaman bilgileri ve toplantıya katılacak olan personel bigisiyle beraber toplantı kaydedilir.
           |-- Point.js      -> Oylanacak olan personelin resmi ve ismi, toplantının konusu ve zaman edite kapalı şekilde gelir. Oyu verecek olan personel, açıklama ve puanı ile beraber oyunu onaylar.
 |-- App.js                  -> Başlangıç dosyasıdır, hangi sayfa ile başlayacağının bilgisi stack içerisinde belirtilmiştir. Drawer componenti içerisinde ayrı, burada ayrı tanımlanmıştır.
 |-- config.js               -> API' lerin kullanımı için heroku linki bu dosya içerisinde belirtilmiştir.
```
## Uygulama Ekran Goruntuleri

![Login](https://user-images.githubusercontent.com/30631029/85223859-c2bca800-b3ce-11ea-971a-764222844616.gif)

**Login Ekranı** 

---

![Drawer](https://user-images.githubusercontent.com/30631029/85223904-17f8b980-b3cf-11ea-819d-d488824b76a6.gif)

**Drawer Componenti** 

---

![Meeting](https://user-images.githubusercontent.com/30631029/85223917-38287880-b3cf-11ea-8a1f-db363ee5dc15.gif)

**Meeting Ekranı**

---

![Puan](https://user-images.githubusercontent.com/30631029/85223968-93f30180-b3cf-11ea-9ce4-8447660428ad.gif)

**Point Ekranı** 

---

![SifreDegistir](https://user-images.githubusercontent.com/30631029/85224507-9eaf9580-b3d3-11ea-9026-68d70db644db.gif)

**Change Password Ekranı**

---

![InformationDetail](https://user-images.githubusercontent.com/30631029/85224514-a40ce000-b3d3-11ea-9d3d-17d9ac7bcd3b.gif)

**Personnel Detail Ekranı**

---

![Contact](https://user-images.githubusercontent.com/30631029/85224517-aa9b5780-b3d3-11ea-9674-79667a6a9961.gif)

**Contact Us Ekranı**

---

## Yapilabilecekler

* 
