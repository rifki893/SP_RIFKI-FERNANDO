var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
var reqst = require('request');
var axios = require('axios');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/listrsjkt', async function (req, res, next) {

try {
    const response1 = await axios.get(
      "https://data.jakarta.go.id/read-resource/get-json/daftar-rumah-sakit-rujukan-penanggulangan-covid-19/65d650ae-31c8-4353-a72b-3312fd0cc187"
    );
    const response2 = await axios.get(
      "https://data.jakarta.go.id/read-resource/get-json/rsdkijakarta-2017-10/8e179e38-c1a4-4273-872e-361d90b68434"
    );

    const data1 = response1.data;
    const data2 = response2.data;
    const mergedData = data1.map((item1) => {
      const item2 = data2.find(
        (item2) => item2.keluhan === item1.keluhan
      );
      return {
        nama_rs: item1.nama_rumah_sakit,
        jenis_rs: item2.jenis_rumah_sakit,
        alamat_rs: item2.alamat_rumah_sakit,
        kelurahan: item2.kelurahan,
        kecamatan: item2.kecamatan,
        kota_kab: item2.kota_kab_administrasi,
        kode_pos: item2.kode_pos,
        telepon: item2.nomor_telepon,
        fax: item2.nomor_fax,
        website: item2.website,
        email: item2.email,
      };
    });

    res.send(mergedData);
  } catch (error) {
    res.send(error);
  }
        
    });



var server=app.listen(8800,function(){
    console.log('Server is running on Port 8800');
});

 