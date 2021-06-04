<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Transaksi</h3>
        <v-card class="py-3">
            <v-card-title>
                <v-text-field
                    v-model ="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    rounded
                    outlined
                    dense
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" rounded dark @click="dialog =true"><v-icon left>mdi-plus</v-icon>
                    Tambah
                </v-btn>
            </v-card-title>
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="transaksilunas" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-file-document-multiple</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Transaksi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col>
                                    <v-select
                                    label="Nomor Meja"
                                    :items="transaksi"
                                    item-text="nomor_meja"
                                    item-value="id_reservasi"
                                    v-model="form.id_reservasi"
                                    :rules="noRules"
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col class="col-md-8">
                                    <v-select
                                    :items="sMPembayaran"
                                    label="Metode Pembayaran"
                                    v-model="form.metode_pembayaran"
                                    :rules="tipeRules"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="red darken-4" rounded text @click="cancel">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" rounded text @click="setDialogPesanan" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Bayar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Pembayaran</span>
                </v-card-title>
                <v-card-text class="pt-5 font-weight-bold">
                    Pembayaran Berhasil !
                </v-card-text>
                <v-card-text v-if="tempMetode=='Cash'" class="pt-5 font-weight-bold">
                    Kembalian anda : Rp {{kembali}}
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogConfirm=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded >
                        Cetak Struk
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCash" persistent max-width="800px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Pembayaran {{pembayaranType}}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-data-table class="pa-2 mx-2 elevation-3" :headers="headersPesanan" :items="pesanans" :search="search">
                            
                        </v-data-table>
                        <v-form v-model="valid" ref="form1">
                            <v-row class="pa-3 justify-end align-end text-center">
                                <v-card-text class="pt-n5 font-weight-bold">Servis 5% : Rp. {{services}}</v-card-text>
                                <v-card-text class="mt-n7 font-weight-bold">PPN 10% : Rp. {{tax}}</v-card-text>
                                <v-card-text class="mt-n7 font-weight-bold">Total Pembayaran : Rp. {{total_transaksi}}</v-card-text>
                            </v-row>
                            <v-row class="mt-n8">
                                <v-col >
                                    <v-text-field
                                        v-if="form.metode_pembayaran=='Cash'"
                                        v-model="bayar"
                                        label="Bayar"
                                        :rules="pRules"
                                        required
                                    ></v-text-field>
                                    <v-select
                                    label="Nomor Kartu Kredit"
                                    v-if="form.metode_pembayaran=='Credit Card'"
                                    :items="kartus"
                                    item-text="nomor_kartu"
                                    item-value="id"
                                    v-model="form.id_kartu"
                                    :rules="noRules"
                                    required
                                    >
                                    <template slot="append-outer">
                                    <v-btn fab x-small color="red darken-4" @click="tambahKartu" :class="{' red--text text--darken-4' :valid, disabled: !valid}">
                                        <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                    </template></v-select>
                                    <v-select
                                    label="Nomor Kartu Debit"
                                    v-if="form.metode_pembayaran=='Debit Card'"
                                    :items="kartus"
                                    item-text="nomor_kartu"
                                    item-value="id"
                                    v-model="form.id_kartu"
                                    :rules="bahanRules"
                                    required
                                    >
                                    <template slot="append-outer">
                                    <v-btn fab x-small color="red darken-4" @click="tambahKartu" :class="{' red--text text--darken-4' :valid, disabled: !valid}">
                                        <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                    </template></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="red darken-4" rounded text @click="cancel">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" rounded text @click="setForm" :class="{' darken-1 white--text' :check, disabled: !check}">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

         <v-dialog v-model="dialogKartu" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Tambah Data Kartu</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form2">
                             <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="formKartu.nomor_kartu"
                                        label="Nomor Kartu"
                                        :rules="bahanRules"
                                        required
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="inputKartu==1">
                                <v-col class="col-md-8">
                                    <v-text-field
                                        v-model="formKartu.nama_pemilik"
                                        label="Nama Pemilik"
                                        :rules="namaRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                     <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="30"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="formKartu.exp_date"
                                                label="Expired Date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        color="#F9A825"
                                        :min="new Date().toISOString().substr(0, 10)"
                                        v-model="formKartu.exp_date"
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="red darken-4" rounded text @click="batalKartu">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" rounded text @click="saveKartu"  :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCetak" persistent max-width="400px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Struk</span>
                </v-card-title>
                <v-card-text class="pt-5 font-weight-bold">
                   Apakah yakin ingin mencetak struk ini?
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogCetak=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" @click="setFormCetak" text rounded >
                        Cetak Struk
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

         <v-dialog v-model="dialogCetak2" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Struk</span>
                </v-card-title>
                <v-card-text class="pt-5">
                    <div id="printStruk" style="width: 800.28px;color: black;background: white;">
                           <v-container  class="pa-4 mt-9"
                             justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                   <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                     <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">552181</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                <v-col>Receipt : #{{receipt}}</v-col>
                                <v-col>Date : {{date}}</v-col>
                            </v-row>
                              <v-row>
                                <v-col>Waiter : {{waiter}}</v-col>
                                <v-col>Time   : {{time}}</v-col>
                            </v-row>
                           <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                              <v-row>
                                <v-col>Table : # {{table}}</v-col>
                                <v-col>Customer : {{customer}}</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="strukHeaders" :items="struk" hide-default-footer >
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-btn icon @click="editHandler(item)">
                                            <v-icon color="light-green darken-2">mdi-file-document-multiple</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     SubTotal: Rp. {{subtotal}}
                                 </v-col>
                             </v-row>
                             <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Services: Rp. {{services}}
                                 </v-col>
                             </v-row>
                             <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Tax: Rp. {{tax}}
                                 </v-col>
                             </v-row>
                             <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                               <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Total: Rp. {{total_transaksi}}
                                 </v-col>
                             </v-row>
                             <v-row>=======================================================================================</v-row>
                             <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Total Qty : {{totalqty}}
                                 </v-col>
                             </v-row>
                              <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Total Item : {{totalitem}}
                                 </v-col>
                             </v-row>
                              <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Printed {{printedDate}}
                                 </v-col>
                             </v-row>
                            <v-row>
                                 <v-col class="">
                                 </v-col>
                                 <v-col class="col-md-4">
                                     Cashier : {{cashier}}
                                 </v-col>
                             </v-row>
                             <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             <v-row >
                                     <p class="textThanks">THANK YOU FOR YOUR VISIT
                                         </p> 
                             </v-row>
                             <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogCetak2=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" @click="cetak" text rounded >
                        Cetak Struk
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>
<style scoped>
    .titleAtma{
            margin-top: 20px;
            font-size: 32px;
            color:#0D47A1;
    }
    .titleFun{
            margin-top: 10px;
            margin-left: 100px;
            font-size: 16px;
            color:#B71C1C;
    }
     .titleTelp{
            margin-top: 10px;
            margin-left: 90px;
            font-size: 16px;
    }
    .titleAlamat{
            margin-top: 10px;
            margin-left:50px;
            font-size: 16px;
    }
    .titlePost{
            margin-top: auto;
          margin-left: 140px;
            font-size: 16px;
    }
    .textThanks{
        margin-left: auto;
        margin-right: auto;
    }
</style>

<script>
    // import VueHtml2pdf from 'vue-html2pdf'
    import html2PDF from 'jspdf-html2canvas';
    export default {
        name:"Bahan",
        data(){
            return{
                bayar:'',
                inputType: 'Tambah',
                pembayaranType:'',
                load: false,
                snackbar: false,
                error_message:'',
                color: '',
                check:false,
                search: null,
                dialog: false,
                dialogConfirm: false,
                dialogCetak: false,
                dialogCetak2: false,
                dialogCash:false,
                menu2:'',
                dialogKartu:'',
                valid: false,
                bahanRules:[
                    (v) => !!v || 'Nomor kartu tidak boleh kosong ',
                ],
                pRules:[
                    (v) => !!v || 'Pembayaran tidak boleh kosong',
                    (v) => v>0 || 'Pembayaran  harus lebih dari 0',
                ],
                namaRules:[
                    (v) => !!v || 'Jumlah tidak boleh kosong',
                  
                ],
                  noRules:[
                    (v) => !!v || 'Nomer Meja tidak boleh kosong',
                  
                ],
                 tipeRules:[
                    (v) => !!v || 'Tipe tidak boleh kosong',
                  
                ],
                 nomorRules:[
                    (v) => !!v || 'Nomor tidak boleh kosong ',
                    (v) => !v || /^[0-9]{16,16}$/.test(v) || 'Nomer kartu harus valid',
                    // (v)=> v>15 || 'Nomor Kartu harus 16 digit',
                    // (v)=> v>17 || 'Nomor Kartu harus 16 digit',
                ],
                headers:[
                    {
                        text:"Nomor Nota",
                        align: "start",
                        sortable: true,
                        value: "nomor_nota",
                    },
                    {text:"Nama Pelanggan", value:"nama_pelanggan"},
                    {text:"Nama Pegawai", value:"nama"},
                    {text:"Tanggal Transaksi", value:"tanggal_transaksi"},
                    {text:"Metode Pembayaran", value:"metode_pembayaran"},
                    {text:"Total Transaksi", value:"total_transaksi"},
                    {text:"Actions", value:"actions"},
                ],
                strukHeaders:[
                    {
                        text:"Qty",
                        align: "center",
                        value: "jumlah",
                        
                    },
                    {text:""},
                      {text:""},
                    {text:"Item Menu", value:"nama_menu"},
                    {text:""},
                      {text:""},
        
                    {text:"Harga", value:"harga",},
                    {text:""},
                         {text:""},
                              {text:""},
                    {text:"Sub Total", value:"total_harga",},
                      {text:""},
             
                ],
                headersPesanan:[
                    {
                        text:"Nama Menu",
                        align: "start",
                        sortable: true,
                        value: "nama_menu",
                    },
                    {text:"Jumlah", value:"jumlah"},
                    {text:"Total Harga", value:"total_harga"},
                ],
                sMPembayaran:["Cash","Debit Card","Credit Card"],
                sSatuan:["gram","ml"],
                bahan: new FormData,
                transaksilunas: [],
                transaksi:[],
                pesanans:[],
                kartus:[],
                struk:[],
                form:{
                    id:'',
                    id_kartu:'',
                    id_reservasi:'',
                    metode_pembayaran:'',
                    status_transaksi:'',
                },
                formKartu:{
                    tipe_kartu:'',
                    nomor_kartu:'',
                    nama_pemilik:'',
                    exp_date:new Date().toISOString().substr(0, 10),
                },
                total_transaksi:'',
                iKartu : new FormData,
                services:'-',
                kembali:'',
                tax:'-',
                deleteId: '',
                editId: '',
                inputKartu:'',
                tempMetode:'',
                receipt:'-',
                waiter:'-',
                date:'-',
                time:'-',
                table:'-',
                customer:'-',
                totalqty:'-',
                totalitem:'-',
                cashier:'-',
                subtotal:'-',
                printedDate:'-',
            };
        },
        components: {
            // VueHtml2pdf,
            
        },
        methods: {
            
            generateStruk () {
                let print = document.getElementById("printStruk");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                    },
                    output:'Struk'
                });
                // this.$refs.html2Pdf.generatePdf()
            },
            setForm(){
               if(this.$refs.form.validate()){
                       this.update()
               }
            },
            batalKartu(){
                this.inputKartu='',
                this.dialogKartu=false
                this.resetFormKartu();
            },
            tambahKartu(){
                if(this.form.metode_pembayaran=='Credit Card'){
                    this.inputKartu=1;
                    this.formKartu.tipe_kartu =1
                }else{
                    this.formKartu.tipe_kartu=2
                }
                this.dialogKartu = true;
            },
            saveKartu(){
                if(this.$refs.form2.validate()){
                    if(this.form.metode_pembayaran=='Credit Card'){
                        this.iKartu.append('exp_date', this.formKartu.exp_date);
                        this.iKartu.append('nama_pemilik', this.formKartu.nama_pemilik);
                    }
                    console.log(this.formKartu.nomor_kartu);
                        this.iKartu.append('tipe_kartu', this.formKartu.tipe_kartu);
                        this.iKartu.append('nomor_kartu',this.formKartu.nomor_kartu);
                        var url = this.$api + '/kartu'
                        this.load = true
                        this.$http.post(url, this.iKartu, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then(response => {
                                this.error_message=response.data.message;
                                if(response.data.data===null){
                                        this.color="red"
                                }else{
    
                                    this.color="green"
                                }
                                this.snackbar=true;
                                this.load = false;
                                this.dialogKartu=false;
                                if(this.form.metode_pembayaran=='Credit Card'){
                                    this.readDataKartuC();
                                }else if(this.form.metode_pembayaran=='Debit Card'){
                                    this.readDataKartuD(); 
                                }
                                this.resetFormKartu();
                            }).catch(error => {
                                this.error_message=error.response.data.message;
                                this.color="red"
                                this.snackbar=true;
                                this.load = false;
                            })
                    }
            },
            setDialogPesanan(){
                if(this.$refs.form.validate()){
                    this.dialog =false;
                    this.readDataPesanan()
                    this.getTotalTransaksi();
               
                    if(this.form.metode_pembayaran!=null){
                        this.pembayaranType='Cash'
                        this.dialogCash = true;
                        if(this.form.metode_pembayaran=='Debit Card'){
                            this.readDataKartuD()
                            this.pembayaranType='Debit Card'
                        }else if(this.form.metode_pembayaran=='Credit Card'){
                            this.pembayaranType='Credit Card'
                            this.readDataKartuC()
                        }
                    }
                }
            },
            getTotalTransaksi(){
                for (let index = 0; index < this.transaksi.length; index++) {
                    if(this.transaksi[index].id_reservasi == this.form.id_reservasi){
                        this.total_transaksi= this.transaksi[index].total_transaksi;
                    }
                }
                this.services = 0.05*this.total_transaksi
                this.tax = 0.1*this.total_transaksi
                this.total_transaksi = this.total_transaksi*1.15
            },
            readDataPesanan(){
                var url = this.$api + '/showpesanan/'+this.form.id_reservasi
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.pesanans = response.data.data
                })
            },
            readDataKartuC(){
                var url = this.$api + '/kartuc'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.kartus = response.data.data
                })
            },
            readDataKartuD(){
                var url = this.$api + '/kartud'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.kartus = response.data.data
                })
            },
            readData(){
                var url = this.$api + '/transaksil'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.transaksilunas = response.data.data
                    this.readDataNonLunas();
                })
            },
             readDataNonLunas(){
                var url = this.$api + '/transaksi'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.transaksi = response.data.data
                })
            },
            update(){
                console.log(this.form.id_kartu);
                var url = this.$api + '/transaksi/' + this.form.id_reservasi;
                if(this.form.metode_pembayaran=='Cash'){
                    this.tempMetode = this.form.metode_pembayaran
                    if(this.bayar<this.total_transaksi){
                        this.error_message = 'Jumlah Pembayaran Kurang';
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    }else{
                        this.form.id_kartu=null
                            let newData = {
                            id_kartu: this.form.id_kartu,
                            metode_pembayaran: this.form.metode_pembayaran,
                            status_transaksi: 1,
                            }
                            this.load = true
                            this.$http.put(url, newData, {   
                            headers:{
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then(response =>{
                            this.error_message= response.data.message;
                            this.color="green"
                            this.snackbar=true;
                            this.load = false;
                            this.close();
                            this.readData();//mengambildata
                            this.resetForm();
                            this.inputType='Tambah';
                        }).catch(error =>{
                            this.error_message = error.respons.data.message;
                            this.color="red"
                            this.snackbar=true;
                            this.load = false;
                        })
                        this.kembali = this.bayar - this.total_transaksi
                    }
                }else{
                    let newData = {
                        id_kartu: this.form.id_kartu,
                        metode_pembayaran: this.form.metode_pembayaran,
                        status_transaksi: 1,
                        }
                        this.load = true
                        this.$http.put(url, newData, {   
                        headers:{
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(response =>{
                        this.error_message= response.data.message;
                        this.color="green"
                        this.snackbar=true;
                        this.load = false;
                        this.close();
                        this.readData();//mengambildata
                        this.resetForm();
                        this.inputType='Tambah';
                    }).catch(error =>{
                        this.error_message = error.respons.data.message;
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    })
                }
                this.dialogConfirm = true;
            },
             setFormCetak(){
               this.getStruk();
               this.dialogCetak2=true;
               this.dialogCetak=false;
            },
            editHandler(item){
                // this.inputType = 'Ubah';
                this.dialogCetak = true; 
                this.form.id_reservasi = item.id_reservasi
                this.readDataStruk(this.form.id_reservasi);
                // this.getStruk();
                console.log('tes di read edit')
                // console.log(this.form.id_reservasi);
                // this.readDataStruk();
                
                // this.editId = item.id;
                // this.form.nama_bahan = item.nama_bahan;
                // this.form.stok = item.stok;
                // this.form.tipe_bahan = item.tipe_bahan;
                // this.form.satuan = item.satuan;
                
            },
             getStruk(){
                this.waiter = this.struk[0].nama;
                 console.log(this.waiter)
                 
                this.date = this.struk[0].tanggal_transaksi;
                var tgl = this.date.slice(8,10);
                this.date = this.struk[0].tanggal_transaksi;
                var bln = this.date.slice(5,7);
                this.date = this.struk[0].tanggal_transaksi;
                var thn = this.date.slice(2,4);
                this.date = this.struk[0].tanggal_transaksi;

                var tgl2 = this.date.toString().slice(0,10);
                this.date = tgl2;
                console.log(this.date)
                this.time = this.struk[0].tanggal_transaksi;
                tgl2 = this.time.slice(11,18);
                this.time = tgl2;
                console.log(this.time)
                this.table = this.struk[0].nomor_meja;
                console.log(this.table)
                this.customer = this.struk[0].nama_pelanggan;
                console.log(this.customer)
                this.receipt = "AKB-"+tgl+bln+thn+"-"+this.struk[0].nomor_nota
                console.log(this.receipt)

                this.subtotal= this.struk[0].total_transaksi;
                console.log(this.subtotal)
                this.services = 0.05*this.subtotal
                console.log(this.services)
                this.tax = 0.1*this.subtotal
                console.log(this.tax)
                var tot = parseInt(this.subtotal)+parseInt(this.services)+parseInt(this.tax); 
                this.total_transaksi = tot
                console.log(this.total_transaksi)
                this.totalitem = this.struk.length;
                console.log(this.totalitem)

                var sum=0;

                for (let index = 0; index < this.struk.length; index++) {
                    sum = parseInt(this.struk[index].jumlah)+sum;
                }
                this.totalqty = sum;
                console.log(this.totalqty)
                this.cashier = localStorage.getItem('nama');
                this.printedDate = Date().toString().slice(0,25)

            },
            readDataStruk(item){
                var url = this.$api + '/cetakstruk/'+item
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.struk = response.data.data
                    console.log(this.struk)
                })
                console.log('tes di read data')
                this.getStruk();
            },
            cetak(){
                //  this.getStruk()
                this.generateStruk()
                this.dialogCetak2= false
            },
            close(){
                this.resetForm();
                this.dialog = false
                this.dialogKartu = false
                this.dialogCash = false
                this.kartus=[],
                this.inputType = 'Tambah';
            },
            cancel(){
                this.close();
                this.resetForm();
                this.readData();
                this.kartus=[],
                this.dialog = false;
                this.dialogCash = false;
                this.dialogCredit = false;
                this.dialogDebit = false;
                this.inputType = 'Tambah';
            },
            resetForm(){
                this.form ={
                    id:'',
                    id_reservasi:'',
                    status_transaksi:'',
                    metode_pembayaran:'',
                    id_kartu:'',
                };
            },
            resetFormKartu(){
                this.formKartu ={
                    tipe_kartu:'',
                    nama_pemilik:'',
                    exp_date:'',
                    nomor_kartu:'',

                }
            },
        },
        watch:{
           
        },
        computed: {
            formTitle(){
                return this.inputType
            },
        },
        mounted(){
            this.readData();
        },
    };
</script>