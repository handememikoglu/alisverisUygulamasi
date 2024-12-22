//Alışveriş Uygulaması
const urunler = [
    {
        id: 1,
        urunAdi: "kalem",
        stok: 40,
        fiyat: 20
    },
    {
        id: 2,
        urunAdi: "silgi",
        stok: 70,
        fiyat: 15
    },
    {
        id: 3,
        urunAdi: "çanta",
        stok: 10,
        fiyat: 150
    },
    {
        id: 4,
        urunAdi: "fırça",
        stok: 100,
        fiyat: 50
    }
];
let bakiye = 0;
let sepet = [];
function islem(msg,...tuslama) {
    const value = prompt(msg);
    if(tuslama.includes(value)){
        return value;
    }else{
        alert("Hatalı tuşlama yaptınız.");
        return islem(msg,...tuslama);
    }
}
function anaMenu() {
    const value = islem("Yapmak istediğiniz işlemi aşağıdan seçin.\n 1-Ürünleri Listele\n 2-Sepeti Göster\n 3-Ürün Satın Al\n 4-Bakiye Ekle \n5-Bakiye Göster\n6-Çıkış yap","1","2","3","4","5","6");
    if(value == 1){
        return listeleme();
    }else if(value == 2){
        return sepetiGosterme();
    }else if(value == 3){
        return satınAlma();
    }else if(value == 4 ){
        return bakiyeEkleme();
    }else if(value == 5){
        return bakiyeGosterme();
    }else if(value == 6){
        return cikis();
    }
}
function listeleme() {
    const list = urunler.map((urun, index)=> `${index+1}- ${urun.urunAdi} Fiyat: ${urun.fiyat} Stok: ${urun.stok}`).join("\n");
    alert(list);

    return digerIslem();
}
function digerIslem() {
    const value = islem("Başka bir işlem yapmak ister misiniz ? (E/H)","e","h","E","H");
    if(value.toLocaleUpperCase() === "E"){
        return anaMenu();
    }else{

    }

}
function sepetiGosterme(miktar,toplam) {
    if(sepet.length === 0){
        alert("Sepetiniz boş");
    }else{
        const yeniSepet = sepet.map((urun, index) => `${index+1} - ${urun.urunAdi} - ${miktar} Adet - ${toplam} TL` ).join("\n");
        alert(`Mevcut Sepet \n ${yeniSepet}`);
    }
    return digerIslem();
    
}
function satınAlma() {
    const mevcutSepet = urunler.map( urun => `${urun.urunAdi} - ${urun.fiyat}tl - ${urun.stok} adet mevcut`).join("\n");
    const value = prompt(`Sepete eklemek istediğiniz Ürün adını girin.\n ${mevcutSepet}`).toLocaleLowerCase();
    const urunbulma = urunler.findIndex(urun => urun.urunAdi == value);
    if(urunbulma === -1){
        alert("Geçersiz ürün adı !");
        return satınAlma();
    }
    const urun = urunler[urunbulma];
    const miktar = prompt("Kaç adet satın almak istersiniz?");
    if(miktar !== miktar || miktar <= 0){
        alert("Geçersiz miktar girişi");
        return satınAlma();
    }
    
    if(miktar > urun.stok){
        alert(`Yetersiz stok !`);
        return satınAlma();
    }
    urun.stok = urun.stok - miktar;
    const toplam = urun.fiyat * miktar;

    if(toplam > bakiye){
        alert("Yetersiz Bakiye");
        return digerIslem(); //bakiye yüklemeyede gönderebilir bunu da dene.
    }
    bakiye = bakiye - toplam;

    sepet.push({
        urunAdi: urun.urunAdi,
        stok: miktar,
        fiyat: toplam
    })
    alert(`Ürün satın alındı. \n ${urun.urunAdi} ${miktar} adet ${toplam} tl satın alındı.`);
    return digerIslem(), sepetiGosterme(miktar,toplam);
}

function bakiyeEkleme() {
    const tutar = prompt(`Mevcut Bakiye ${bakiye} \n Eklemek istediğiniz tutarı girin.`);
    if(tutar !== tutar || tutar <= 0){
        alert("Geçersiz tutar girişi");
        return bakiyeEkleme();
    }else{
        bakiye = bakiye + Number(tutar);
        alert(`Bakiye eklendi.\n Mevcut Bakiye: ${bakiye}`);
    }
    return digerIslem();
}

function bakiyeGosterme() {
    alert(`Mevcut Bakiye ${bakiye}`);
    return digerIslem();
}

function cikis() {
    
}
anaMenu();
