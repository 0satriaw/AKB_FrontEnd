<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Reservasi</h3>
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
                <v-btn color="red darken-4" rounded dark @click="dialog=true"><v-icon left>mdi-plus</v-icon>
                    Tambah
                </v-btn>
            </v-card-title>
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="reservasis" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon @click="generateQR(item)">
                            <v-icon color="black">mdi-qrcode</v-icon>
                    </v-btn>
                     <v-btn icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteHandler(item.id)">
                            <v-icon color="red darken-3">mdi-delete</v-icon>
                    </v-btn>
                </template>

                

                 <template v-slot:[`item.sesi`]="{ item }">
                    <v-chip v-if="item.sesi=='0'" color="primary">
                        <span>Langsung</span>
                    </v-chip>
                    <v-chip v-else-if="item.sesi==1" color="success">
                        <span>Lunch</span>
                    </v-chip>
                    <v-chip v-else color="warning">
                        <span>Dinner</span>
                    </v-chip>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                    <v-chip v-if="item.status==0" color="success">
                        <span>Aktif</span>
                    </v-chip>
                    <v-chip v-else-if="item.status==1" color="warning">
                        <span>Selesai</span>
                    </v-chip>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Reservasi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row class="pt-4">
                                <v-col class="col-md-3">
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
                                                v-model="form.tanggal_kunjungan"
                                                label="Tanggal Reservasi"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        color="#F9A825"
                                        :min="new Date().toISOString().substr(0, 10)"
                                        v-model="form.tanggal_kunjungan"
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col >
                                    <v-layout class="justify-center">
                                        <v-radio-group
                                        v-model="form.sesi"
                                        row
                                        >
                                        <v-radio 
                                            label="Langsung"
                                            :value="0"
                                            :disabled="radio1"
                                        ></v-radio>
                                        <v-radio
                                            label="Lunch 11:00-16:00"
                                            :value="1"
                                            :disabled="radio2"
                                        ></v-radio>
                                        <v-radio
                                            label="Dinner 17:00-21:00"
                                            :value="2"
                                            :disabled="radio3"
                                        ></v-radio>
                                        </v-radio-group>
                                    </v-layout>
                                </v-col>
                            </v-row>
                            <v-row  class="wrap mt-n4" align="start" justify="start">
                                <v-col class="wrap col-md-6" align="center" justify="center" >
                                    <v-btn  color="red darken-4" class="white--text" @click="cekMeja">
                                         Cek Ketersediaan Meja
                                    </v-btn>
                                </v-col>
                                <v-col class="col-md-5" align="center" justify="center">
                                    <v-flex class="title font-weight-bold">
                                         No Meja : {{this.form.nomor_meja}}
                                    </v-flex>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col  v-if="this.inputType=='Tambah'" >
                                    <v-autocomplete
                                    label="Nama Pelanggan"
                                    :items="pelanggans"
                                    item-text="nama_pelanggan"
                                    item-value="id"
                                    v-model="form.id_pelanggan"
                                    :rules="namaRules"
                                    required
                                    >
                                    <template slot="append-outer">
                                    <v-btn fab x-small color="red darken-4" @click="dialogPelanggan=true" :class="{' red--text text--darken-4' :valid, disabled: !valid}">
                                        <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                    </template>
                                    </v-autocomplete>
                                </v-col> 
                                <v-col v-else>
                                    <v-text-field
                                        v-model="form.nama_pelanggan"
                                        label="Nama Pelanggan"
                                        :rules="namaRules"
                                        required
                                        readonly
                                    >
                                    <template v-slot:append-outer>
                                    <v-btn fab x-small color="red darken-4" @click="dialogPelanggan=true" :class="{' red--text text--darken-4' :valid, disabled: !valid}">
                                        <v-icon color="white">mdi-pencil</v-icon>
                                    </v-btn>
                                    </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="red darken-4" rounded text @click="cancel">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" rounded text @click="setForm" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Peringatan!</span>
                </v-card-title>
                <v-card-text class="pt-5 font-weight-bold">
                    Apakah anda yakin ingin menghapus reservasi ini?
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogConfirm=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="deleteData">
                        Hapus
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPelanggan" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Pelanggan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form2">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="pForm.nama_pelanggan"
                                        label="Nama Pelanggan"
                                        :rules="namaRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="col-md-8">
                                    <v-text-field
                                        v-model="pForm.email"
                                        label="Email"
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                     <v-text-field
                                        v-model="pForm.no_telp"
                                        label="No Telepon"
                                        type="number"
                                        :rules="noRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="red darken-4" rounded text @click="dialogPelanggan=false">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" rounded text @click="pelangganHandler" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialogMeja"
            max-width="600px"
            max-height="200px"
            scrollable
        >
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Ketersediaan Meja</span>
                </v-card-title>
                <v-card-subtitle class="mt-3 ">
                    <span class="font-italic subtitle font-weight-thin ">*Klik untuk memilih meja</span>
                </v-card-subtitle>
                 <v-row class="pa-4 mx-10 my-1 elevation-2">
                    <v-col v-for="(item, index) in mejas" :key="index" align="center" class="wrap"  justify="center" cols="3">
                        <v-btn  color="success" v-if="item.status=='Tersedia'" @click="setNomor(item)"  medium class="d-flex  white--text">
                                #{{item.nomor_meja}}
                        </v-btn>
                        <v-btn  color="error" v-if="item.status=='Tidak Tersedia'" @click="mejaError"  medium class="d-flex  white--text">
                                #{{item.nomor_meja}}
                        </v-btn>
                    </v-col>
                </v-row>

                <v-card-actions class="py-5 justify-center">
                        <v-btn color="red darken-4" rounded text @click="mejaHandler">
                            Kembali
                        </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>

        <template>
                <vue-html2pdf
                    :show-layout="false"
                    :float-layout="true"
                    :enable-download="true"
                    :preview-modal="true"
                    :paginate-elements-by-height="1400"
                    filename="QR Reservasi"
                    :pdf-quality="2"
                    :manual-pagination="false"
                    pdf-format="a6"
                    pdf-orientation="portrait"
                    pdf-content-width="400px" 
            
                    @progress="onProgress($event)"
                    @hasStartedGeneration="hasStartedGeneration()"
                    @hasGenerated="hasGenerated($event)"
                    ref="html2Pdf"
                >
                    <section slot="pdf-content" class="text-align:center mt-25">
                        <v-container  class="pa-4 mt-9"
                             justify="center" align="center" content="center">
                            <v-row class="layout column align-center">
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  style="margin-top = 500px" width="200px" height="150px">
                            </v-row>
                            <v-row class=" mt-8 layout column align-center">
                            <template>
                                    <qrcode-vue :value="qrValue" class="qr-align-gambarqr" :size="200" level="H" />
                            </template>
                            </v-row>
                            <v-row class="layout text-align:center column align-center my-8">
                                    <template class="font-weight-bold">
                                            <h5 class="qr-align-time">
                                            {{new Date().toString().slice(0,25)}}
                                            </h5>
                                    </template>
                            </v-row>
                            <v-row class="layout column align-center mt-n7">
                                    <template >
                                            <h5 class="subtitle qr-align-nama">
                                            Printed By {{nama}}
                                            </h5>
                                    </template>
                            </v-row>
                            <v-row class="layout column align-center my-10">
                                    <template class="font-weight-bold">
                                            <h4 class="qr-align-akb">
                                                FUN PLACE TO GRILL
                                            </h4>
                                    </template>
                            </v-row>
                    </v-container>
                    </section>
                </vue-html2pdf>
        </template>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>

<script>
    import QrcodeVue from 'qrcode.vue'
    import VueHtml2pdf from 'vue-html2pdf'
    export default {
        name:"Bahan",
        data(){
            return{
                dialogMeja:false,
                dialogPelanggan:false,
                menu: false,
                modal: false,
                menu2: false,
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                qrValue:'',
                error_message:'',
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                valid: false,
                bahanRules:[
                    (v) => !!v || 'Nama Bahan tidak boleh kosong ',
                ],
                stokRules: [v  => {    
                    if ( !!v && v >= 0) return true;
                    return 'Stok harus lebih besar dari 0';
                }],
                tipeRules:[
                    (v) => !!v || 'Tipe Bahan tidak boleh kosong ',
                ],
                satuanRules:[
                    (v) => !!v || 'Satuan tidak boleh kosong ',
                ],
                namaRules:[
                    (v) => !!v || 'Nama Pelanggan tidak boleh kosong ',
                ],
                noRules:[
                    (v) => !v || /^08[0-9]{8,10}$/.test(v) || 'Nomer telepon harus valid',
                ],
                 emailRules: [ 
                    v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email harus valid',
                ],
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nama Pelanggan",
                        align: "start",
                        sortable: true,
                        value: "nama_pelanggan",
                    },
                    {text:"Nama Pegawai", value:"nama"},
                    {text:"Nomor Meja", value:"nomor_meja", align: "center"},
                    {text:"Sesi", value:"sesi",align: "center"},
                    {text:"Tanggal", value:"tanggal_kunjungan", align: "center"},
                    {text:"Jam", value:"jam_kunjungan",align: "center"},
                    {text:"Status", value:"status",align: "center"},
                    {text:"Actions", value:"actions"},
                ],
                mejaHeaders:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nomor Meja",
                        align: "center",
                        sortable: true,
                        value: "nomor_meja",
                    },
                    {text:"Status Ketersediaan",  align: "center", value:"status"},
                ],
                pelanggans:[],
                pForm:{
                    id:'',
                    nama_pelanggan:'',
                    email:'',
                    no_telp:'',
                    status_hapus:''
                },
                pelanggan: new FormData,
                mejas:[],
                tempMejas:[],
                tempNoMeja:[],
                reservasi: new FormData,
                reservasis: [],
                form:{
                    id_pelanggan: '',
                    nama_pelanggan:'',
                    tanggal_kunjungan:new Date().toISOString().substr(0, 10),
                    sesi: '',
                    id_meja: '',
                    id_pegawai:'',
                    jam_kunjungan:'',
                    kode_qr:'',
                    status_hapus:'',
                    status:''
                },
                deleteId: '',
                editId: '',
                nama :'',
                timeNow:'',
            };
        },
        components: {
            QrcodeVue,
            VueHtml2pdf,
        },
        methods: {
             generateQR (item) {
                this.qrValue = item.kode_qr;
                this.$refs.html2Pdf.generatePdf()
            },
            mejaError(){
                this.error_message = 'Meja sudah dipesan';
                this.color="red"
                this.snackbar=true;
                this.load = false;
            },
            setNomor(item){
                this.form.nomor_meja=item.nomor_meja;
                this.dialogMeja=false
            },
            mejaHandler(){
                this.dialogMeja = false
                this.readDataMeja()
            },
            pelangganHandler(){
                if(this.$refs.form2.validate()){
                    if(this.inputType === 'Tambah'){
                        this.savePelanggan()
                    }else{
                        this.updatePelanggan()
                    }
                }
            },
            setForm(){
                console.log('setForm')
                   if(this.$refs.form.validate()&&this.cekReservasi()){
                        if(this.inputType === 'Tambah'){
                            this.save()
                        }else{
                            this.update()
                        }
                    }
            },
            readDataPelanggan(){
                var url = this.$api + '/pelanggan'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.pelanggans = response.data.data
                    
                    
                })
            },
            readDataMeja(){
                var url = this.$api + '/meja'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.mejas = response.data.data
                })
            },
            //read All Data
            readData(){
                this.readDataMeja()
                this.readDataPelanggan()
                var url = this.$api + '/reservasi'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.reservasis = response.data.data
                console.log(this.reservasis);
                this.nama = localStorage.getItem('nama');
                })
            },
            savePelanggan(){
                this.pelanggan.append('nama_pelanggan', this.pForm.nama_pelanggan);
                this.pelanggan.append('email', this.pForm.email);
                this.pelanggan.append('no_telp', this.pForm.no_telp);
                this.pelanggan.append('status_hapus', 0);
                var url = this.$api + '/pelanggan'
                this.load = true
                this.$http.post(url, this.pelanggan, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.error_message=response.data.message;
                        this.color="green"
                        this.snackbar=true;
                        this.load = false;
                        this.dialogPelanggan=false;
                        this.readData(); //mengambil data
                        this.resetPForm();
                    }).catch(error => {
                        this.error_message=error.response.data.message;
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    })
            },
            updatePelanggan(){
                let newData = {
                    nama_pelanggan: this.pForm.nama_pelanggan,
                    email: this.pForm.email,
                    no_telp: this.pForm.no_telp,
                    status_hapus:0,
                    }
                    var url = this.$api + '/pelanggan/' + this.pForm.id;
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
                    this.dialogPelanggan=false;
                    this.readData();//mengambildata
                    this.resetPForm();
                }).catch(error =>{
                    this.error_message = error.respons.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            save(){
                console.log('save')
                this.cekIdMeja()
                this.getTime()
                console.log(this.form.id_pelanggan)
                this.form.kode_qr = Math.random().toString(36).slice(2);
                console.log(this.kode_qr)
                this.reservasi.append('id_pelanggan', this.form.id_pelanggan);
                this.reservasi.append('id_meja', this.form.id_meja);
                this.reservasi.append('id_pegawai', localStorage.getItem('id'));
                this.reservasi.append('kode_qr', this.form.kode_qr);
                this.reservasi.append('tanggal_kunjungan', this.form.tanggal_kunjungan);
                this.reservasi.append('sesi',this.form.sesi);
                this.reservasi.append('status_hapus',0);
                this.reservasi.append('status',0);
                this.reservasi.append('jam_kunjungan',this.form.jam_kunjungan);
                var url = this.$api + '/reservasi'
                this.load = true
                this.$http.post(url, this.reservasi, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.error_message=response.data.message;
                        this.color="green"
                        this.snackbar=true;
                        this.load = false;
                        this.close();
                        this.readData(); //mengambil data
                        this.resetForm();
                        this.resetPForm();
                    }).catch(error => {
                        this.error_message=error.response.data.message;
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    })
            
            },
            update(){
                    this.cekIdMeja()
                    this.getTime()
                    console.log(this.form.jam_kunjungan);
                let newData = {
                    id_meja: this.form.id_meja,
                    id_pegawai: localStorage.getItem('id'),
                    kode_qr: this.form.kode_qr,
                    tanggal_kunjungan: this.form.tanggal_kunjungan,
                    jam_kunjungan: this.form.jam_kunjungan,
                    sesi: this.form.sesi,
                    status:0
                    }
                    var url = this.$api + '/reservasi/' + this.editId;
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
                    this.dialog=false;
                    this.readData();//mengambildata
                    this.resetForm();
                    this.resetPForm();
                }).catch(error =>{
                    this.error_message = error.respons.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            //hapus Data Reservasi
            deleteData(){
                //menghapus Data Reservasi
               let newData = {
                    status_hapus: 1
                    }
                    var url = this.$api + '/dreservasi/' + this.deleteId;
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
                    this.dialogConfirm = false;
                    this.readData();//mengambildata
                    this.resetForm();
                    this.resetPForm();
                    this.inputType='Tambah';
                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            editHandler(item){
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.cekIdPelanggan(item);
                this.form.nama_pelanggan = item.nama_pelanggan;
                this.form.tanggal_kunjungan = item.tanggal_kunjungan;
                this.form.kode_qr = item.kode_qr;
                this.form.sesi = item.sesi;
                this.form.nomor_meja = item.nomor_meja;
                this.dialog = true; 
            },
            deleteHandler(id){
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            close(){
                this.resetForm();
                this.dialog = false
                this.inputType = 'Tambah';
            },
            cancel(){
                this.resetForm();
                this.readData();
                this.dialog = false;
                this.inputType = 'Tambah';
            },
            resetForm(){
                this.form ={
                    id_pelanggan: '',
                    nama_pelanggan:'',
                    tanggal_kunjungan:new Date().toISOString().substr(0, 10),
                    sesi: '',
                    id_meja: '',
                    id_pegawai:'',
                    jam_kunjungan:'',
                    kode_qr:'',
                    status_hapus:''
                };
            },
            resetPForm(){
                if(this.inputType!='Ubah'){
                    this.pForm ={
                        nama_pelanggan: '',
                        email: '',
                        no_telp: '',
                    };
                }
                this.form.nama_pelanggan=this.pForm.nama_pelanggan;
            },
            cekReservasi(){
                console.log('cekreservasi')
                for (let index = 0; index < this.mejas.length; index++) {
                    if(this.mejas[index].status=='Tidak Tersedia'&&this.form.nomor_meja==this.mejas[index].nomor_meja){
                        this.error_message= 'Meja sudah digunakan';
                        this.color="red"
                        this.snackbar=true;
                        return false;
                    }
                }
                return true;
            },
            cekMeja(){
                // this.readDataMeja()
                if(this.form.sesi==0){
                    this.tempNoMeja=[];
                    var sesi;
                    this.getTime()
                    for (let index = 0; index < this.mejas.length; index++) {
                        if(this.mejas[index].status=='Tidak Tersedia'){
                            this.tempNoMeja.push(this.mejas[index].id)
                        }
                    }
                    console.log(this.tempNoMeja)
                    if(this.form.jam_kunjungan>'11:00:00'&&this.form.jam_kunjungan<'16:00:00'){
                        sesi=1
                        this.initMeja(sesi)
                    }else if(this.form.jam_kunjungan>'17:00:00'&&this.form.jam_kunjungan<'21:00:00'){
                        console.log(this.form.jam_kunjungan)
                        console.log('masuk dinner')
                        sesi=2
                        this.initMeja(sesi)
                    }else{
                        this.readDataMeja()
                    }
                }else{
                    // this.readDataMeja()
                    this.tempNoMeja=[];
                    this.initMeja(this.form.sesi)
                }
                this.dialogMeja=true;
            },
            initMeja(sesi){
                // if(this.form.sesi!=0){
                //     this.tempNoMeja=[];
                // }
                for (let index = 0; index < this.reservasis.length; index++) {
                    if(this.reservasis[index].tanggal_kunjungan==this.form.tanggal_kunjungan&&this.reservasis[index].sesi==sesi){
                        this.tempNoMeja.push(this.reservasis[index].id_meja)
                    }
                }
                
                for (let index = 0; index < this.mejas.length; index++) {
                    this.mejas[index].status='Tersedia';
                }

                console.log(this.tempNoMeja);
                for (let index = 0; index < this.tempNoMeja.length; index++) {
                    for (let i = 0; i < this.mejas.length; i++) {
                        
                        if(this.tempNoMeja[index]==this.mejas[i].id){
                            this.mejas[i].status='Tidak Tersedia'
                        }
                    }
                }
            },
            cekIdMeja(){
                for (let index = 0; index < this.mejas.length; index++) {
                    if(this.mejas[index].nomor_meja==this.form.nomor_meja){
                        this.form.id_meja=this.mejas[index].id;
                    }
                }
            },
            cekIdPelanggan(item){
               for (let index = this.pelanggans.length-1; index >= 0; index--) {
                   if(this.pelanggans[index].id == item.id_pelanggan){
                       this.pForm.id = this.pelanggans[index].id
                       this.pForm.nama_pelanggan = this.pelanggans[index].nama_pelanggan
                       this.pForm.email = this.pelanggans[index].email
                       this.pForm.no_telp = this.pelanggans[index].no_telp
                   }
               }
            },
            getTime(){
                var today = new Date();
                var time = ("0" + today.getHours()).slice(-2)   + ":" + 
                    ("0" + today.getMinutes()).slice(-2) + ":" + 
                    ("0" + today.getSeconds()).slice(-2);
                
                if(this.form.sesi==0){
                    this.form.jam_kunjungan=time
                }else if(this.form.sesi==1){
                    this.form.jam_kunjungan='11:00:00'
                }else{
                    this.form.jam_kunjungan='17:00:00'
                }
            }
        },
        computed: {
            formTitle(){
                return this.inputType
            },
            radio1(){
                var date = new Date().toISOString().substr(0, 10)
                if(this.form.tanggal_kunjungan!=date){
                    return true;
                } 
                return false;
            },
            radio2(){
                var date = new Date().toISOString().substr(0, 10)
                var today = new Date();
                var time = ("0" + today.getHours()).slice(-2)   + ":" + 
                    ("0" + today.getMinutes()).slice(-2) + ":" + 
                    ("0" + today.getSeconds()).slice(-2);
                if(this.form.tanggal_kunjungan==date){
                    if(time>'11:00:00'){
                        return true
                    }else{
                        return false
                    }
                } 
                return false;
            },
            radio3(){
                var date = new Date().toISOString().substr(0, 10)
                var today = new Date();
                var time = ("0" + today.getHours()).slice(-2)   + ":" + 
                    ("0" + today.getMinutes()).slice(-2) + ":" + 
                    ("0" + today.getSeconds()).slice(-2);
                if(this.form.tanggal_kunjungan==date){
                    if(time>'17:00:00'){
                        return true
                    }else{
                        return false
                    }
                } 
                return false;
            },
        },
        mounted(){
            this.readData();
            this.readDataMeja();
        },
    };
</script>
<style scoped>
    .qr-align-gambar{
            margin-top: auto;
            margin-left: auto;
            margin-right: auto;
    }
    .qr-align-gambarqr{
            margin-top: 10px;
            margin-left: auto;
            margin-right: auto;
    }
    .qr-align-time{
        margin-top: 10px;
        text-align: center;
    }
    .qr-align-nama{
          margin-top: 10px;
            text-align: center;
    }
    .qr-align-akb{
          margin-top: 20px;
            text-align: center;
    }
</style>