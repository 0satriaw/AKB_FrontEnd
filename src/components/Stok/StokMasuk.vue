<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Stok Masuk</h3>
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
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="stokmasuks" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteHandler(item.id)">
                            <v-icon color="red darken-3">mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Stok Masuk</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                 <v-col >
                                    <v-select
                                    :items="sNamaBahans"
                                    label="Nama Bahan"
                                    v-model="form.nama_bahan"
                                    :rules="tipeRules"
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col >
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
                                                v-model="form.tanggal_masuk"
                                                label="Tanggal Stok Masuk"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                         :max="new Date().toISOString().substr(0, 10)"
                                        color="#F9A825"
                                        v-model="form.tanggal_masuk"
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="form.jumlah"
                                        label="Jumlah"
                                        :rules="jumlahRules"
                                        required
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                     <v-text-field
                                        v-model="form.biaya"
                                        label="Harga Beli"
                                        :rules="hargaRules"
                                        required
                                        type="number"
                                    ></v-text-field>
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
                    Apakah anda yakin ingin menghapus data stok masuk stokmasuk ini?
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

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>

<script>
    export default {
        name:"StokMasuk",
        data(){
            return{
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
                hargaRules:[
                    (v) => !!v || 'Harga beli tidak boleh kosong',
                    (v) => v>0 || 'Harga beli harus lebih dari 0',
                ],
                tipeRules:[
                    (v) => !!v || 'Tipe stokmasuk tidak boleh kosong ',
                ],
                jumlahRules:[
                    (v) => !!v || 'Jumlah tidak boleh kosong',
                    (v) => v>0 || 'Stok masuk harus lebih dari 0',
                ],
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nama Bahan",
                        align: "start",
                        sortable: true,
                        value: "nama_bahan",
                    },
                    {text:"Stok Masuk", value:"jumlah"},
                    {text:"Harga Beli", value:"biaya"},
                    {text:"Tanggal Masuk", value:"tanggal_masuk"},
                    {text:"Actions", value:"actions"},
                ],
                stokmasuk: new FormData,
                stokmasuks: [],
                bahans:[],
                sNamaBahans:[],
                form:{
                    id: '',
                    id_bahan: '',
                    jumlah: '',
                    biaya: '',
                    tanggal_masuk:new Date().toISOString().substr(0, 10),
                    nama_bahan:'',
                    status_hapus:''
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            setForm(){
               if(this.$refs.form.validate()){
                   if(this.inputType === 'Tambah'){
                       this.save()
                   }else{
                       this.update()
                   }
               }
            },
            
            cekIdBahan(){
                for (let index = 0; index < this.bahans.length; index++) {
                    if(this.bahans[index].nama_bahan==this.form.nama_bahan){
                        this.form.id_bahan=this.bahans[index].id;
                    }
                }
            },
            //read Data Stok Masuk
            readData(){
                var url = this.$api + '/stokmasuk'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.stokmasuks = response.data.data
                })
            },
            readDataBahan(){
                var url = this.$api + '/bahan'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.bahans = response.data.data
                    this.initNamaBahan()
               })
            },
            save(){
                this.cekIdBahan()
                this.stokmasuk.append('id_bahan', this.form.id_bahan);
                this.stokmasuk.append('jumlah', this.form.jumlah);
                this.stokmasuk.append('biaya', this.form.biaya);
                this.stokmasuk.append('tanggal_masuk', this.form.tanggal_masuk);
                this.stokmasuk.append('status_hapus', 0);

                var url = this.$api + '/stokmasuk'
                this.load = true
                this.$http.post(url, this.stokmasuk, {
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
                    }).catch(error => {
                        this.error_message=error.response.data.message;
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    })
            },
            update(){
                this.cekIdBahan()
                let newData = {
                    id_bahan: this.form.id_bahan,
                    jumlah: this.form.jumlah,
                    biaya: this.form.biaya,
                    tanggal_masuk: this.form.tanggal_masuk,
                    status_hapus:0
                    }
                    var url = this.$api + '/stokmasuk/' + this.editId;
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
                    this.error_message = error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            // hapus Data Stok Masuk soft delete?
            deleteData(){
               let newData = {
                        status_hapus: 1
                    }
                    var url = this.$api + '/dstokmasuk/' + this.deleteId;
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
                    this.inputType='Tambah';
                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            editHandler(item){
                console.log(this.bahans);
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.nama_bahan = item.nama_bahan;
                this.form.jumlah = item.jumlah;
                this.form.biaya = item.biaya;
                this.form.tanggal_masuk = item.tanggal_masuk;
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
                    id: '',
                    id_bahan: '',
                    jumlah: '',
                    biaya: '',
                    tanggal_masuk:new Date().toISOString().substr(0, 10),
                    nama_bahan:'',
                };
            },
            initNamaBahan(){
                for (let index = 0; index < this.bahans.length; index++) {
                    this.sNamaBahans.push(this.bahans[index].nama_bahan);
                }
            }
        },
        computed: {
            formTitle(){
                return this.inputType
            },
        },
        mounted(){
            this.readData();
            this.readDataBahan();
        },
    };
</script>