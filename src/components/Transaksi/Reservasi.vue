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
                <v-btn color="red darken-4" rounded dark @click="dialog =true"><v-icon left>mdi-plus</v-icon>
                    Tambah
                </v-btn>
            </v-card-title>
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="reservasis" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon click="">
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
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Reservasi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
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
                            <v-row>
                                <v-col class="col-md-5">
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
                                        ></v-radio>
                                        <v-radio
                                            label="Sesi 1"
                                            :value="1"
                                        ></v-radio>
                                        <v-radio
                                            label="Sesi 2"
                                            :value="2"
                                        ></v-radio>
                                        </v-radio-group>
                                    </v-layout>
                                </v-col>
                            </v-row>
                            <v-row  class="wrap" align="center" justify="center">
                                <v-col class="">
                                    <v-select
                                    :items="mejas"
                                    item-text="nomor_meja"
                                    label="Nomor Meja"
                                    v-model="form.nomor_meja"
                                    :rules="tipeRules"
                                    hide-no-data
                                    required
                                    >
                                     <template slot="append-outer">
                                        <v-btn rounded small color="red darken-4" class="white--text" @click="cekMeja">
                                         Cek Meja
                                         </v-btn>
                                    </template>
                                    </v-select>
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
                        <v-form v-model="valid" ref="form">
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
                    <v-btn color="blue darken-1" rounded text @click="savePelanggan" :class="{' darken-1 white--text' :valid, disabled: !valid}">
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

                <v-card-text class="pt-5 font-weight-bold">
                    <v-data-table class="pa-2 mx-2 elevation-3" :headers="mejaHeaders" :items="mejas" :search="search">
                        <!-- nomer using id -->
                        <!-- <template v-slot:[`item.no`]="{ item }">
                            {{item.id}}
                        </template> -->
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip v-if="item.status=='Tersedia'" color="success">
                                <span>{{item.status}}</span>
                            </v-chip>
                            <v-chip v-else color="error">
                                <span>{{item.status}}</span>
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-card-text>

                <v-card-actions class="justify-center">
                        <v-btn color="red darken-4" rounded text @click="dialogMeja=false">
                            Kembali
                        </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>

<script>
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
                    {text:"Nomor Meja", value:"nomor_meja"},
                    {text:"Tanggal", value:"tanggal_kunjungan"},
                    {text:"Jam", value:"jam_kunjungan"},
                    {text:"Sesi", value:"sesi"},
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
                    status_hapus:''
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            setForm(){
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
            save(){
                this.cekIdMeja()
                // this.cekIdPelanggan()
                console.log(this.form.id_pelanggan)
                var today = new Date();
                 var time = ("0" + today.getHours()).slice(-2)   + ":" + 
                    ("0" + today.getMinutes()).slice(-2) + ":" + 
                    ("0" + today.getSeconds()).slice(-2);
                // console.log(this.form.tanggal_kunjungan)
                this.reservasi.append('id_pelanggan', this.form.id_pelanggan);
                this.reservasi.append('id_meja', this.form.id_meja);
                this.reservasi.append('id_pegawai', localStorage.getItem('id'));
                this.reservasi.append('kode_qr', 'kodeqr');
                this.reservasi.append('tanggal_kunjungan', this.form.tanggal_kunjungan);
                this.reservasi.append('sesi',this.form.sesi);
                this.reservasi.append('status_hapus',0);
                if(this.form.sesi==0){
                    this.reservasi.append('jam_kunjungan',time);
                }else if(this.form.sesi==1){
                    this.reservasi.append('jam_kunjungan','11:00:00');
                }else{
                    this.reservasi.append('jam_kunjungan','17:00:00');
                }
                    // console.log(time)
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
                    // this.cekMeja();
                    var today = new Date();
                    var time = ("0" + today.getHours()).slice(-2)   + ":" + 
                    ("0" + today.getMinutes()).slice(-2) + ":" + 
                    ("0" + today.getSeconds()).slice(-2);
                    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    // var time =  Date(SECONDS * 1000).toISOString().substr(11, 8)
                    // // var now = new Moment()
                    // // console.log(now.format("HH:mm:ss"));
                    this.cekIdMeja()
                    if(this.form.sesi==0){
                        this.form.jam_kunjungan= time;
                    }else if(this.form.sesi==1){
                       this.form.jam_kunjungan='11:00:00';
                    }else{
                        this.form.jam_kunjungan='17:00:00';
                    }
                    console.log(this.form.jam_kunjungan);
                let newData = {
                    id_meja: this.form.id_meja,
                    id_pegawai: localStorage.getItem('id'),
                    kode_qr: 'kodeqr',
                    tanggal_kunjungan: this.form.tanggal_kunjungan,
                    jam_kunjungan: this.form.jam_kunjungan,
                    sesi: this.form.sesi
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
                this.pForm ={
                    nama_pelanggan: '',
                    email: '',
                    no_telp: '',
                };
            },
            cekReservasi(){
                console.log('cekreservasi')
                for (let index = 0; index < this.mejas.length; index++) {
                    if(this.mejas[index].status=='Tidak Tersedia'&&this.form.nomor_meja==this.mejas[index].nomor_meja){
                        this.error_message= 'Meja sudah digunakan';
                        console.log('cekreservasi if')
                        this.color="green"
                        this.snackbar=true;
                        return false;
                    }
                }
                console.log('cekreservasi else')
                return true;
            //    this.setForm()

            },
            cekMeja(){
                if(this.form.sesi==0){
                    this.readDataMeja()
                    return  this.dialogMeja=true;
                }else{
                    this.tempNoMeja=[];
                    for (let index = 0; index < this.reservasis.length; index++) {
                        if(this.reservasis[index].tanggal_kunjungan==this.form.tanggal_kunjungan&&this.reservasis[index].sesi==this.form.sesi){
                            this.tempNoMeja.push(this.reservasis[index].id_meja)
                        }
                    }
                    
                    for (let index = 0; index < this.mejas.length; index++) {
                        this.mejas[index].status='Tersedia';
                    }
                    console.log(this.tempNoMeja[0]);
                    for (let index = 0; index < this.tempNoMeja.length; index++) {
                        for (let i = 0; i < this.mejas.length; i++) {
                            
                            if(this.tempNoMeja[index]==this.mejas[i].id){
                                
                                this.mejas[i].status='Tidak Tersedia'
                            
                                // console.log(this.mejas[i].status)
                                // break;
                            }
                        }
                    }
                }
                    console.log(this.mejas);
                    this.dialogMeja=true;
            },
            cekIdMeja(){
                for (let index = 0; index < this.mejas.length; index++) {
                    if(this.mejas[index].nomor_meja==this.form.nomor_meja){
                        this.form.id_meja=this.mejas[index].id;
                    }
                }
            },
            cekIdPelanggan(item){
                console.log(this.pelanggans)
               for (let index = this.pelanggans.length-1; index >= 0; index--) {
                //    console.log(this.pelanggans[index].nama_pelanggan)
                   if(this.pelanggans[index].id == item.id_pelanggan){
                       this.pForm.nama_pelanggan = this.pelanggans[index].nama_pelanggan
                       this.pForm.email = this.pelanggans[index].email
                       this.pForm.no_telp = this.pelanggans[index].no_telp
                   }
               }
            //    console.log(this.form.nama_pelanggan)
            },
        },
        computed: {
            formTitle(){
                return this.inputType
            },
        },
        mounted(){
            this.readData();
            this.readDataMeja();
        },
    };
</script>