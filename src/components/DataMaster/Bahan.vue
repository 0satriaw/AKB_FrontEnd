<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Bahan</h3>
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
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="bahans" :search="search">
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
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Bahan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col >
                                    <v-text-field
                                        v-model="form.nama_bahan"
                                        label="Nama Bahan"
                                        :rules="bahanRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                    <!-- Pake stok atau tidak? -->
                                <!-- <v-col>
                                    <v-text-field
                                        v-model="form.stok"
                                        label="Stok"
                                        type="number"
                                        min="0"
                                        :rules="stokRules"
                                        required
                                    ></v-text-field>
                                </v-col> -->
                            </v-row>
                            <v-row>
                                <v-col class="col-md-8">
                                    <v-select
                                    :items="sTipeBahan"
                                    label="Tipe Bahan"
                                    v-model="form.tipe_bahan"
                                    :rules="tipeRules"
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                    :items="sSatuan"
                                    label="Satuan"
                                    v-model="form.satuan"
                                    :rules="satuanRules"
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
                    Apakah anda yakin ingin menghapus bahan ini?
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
        name:"Bahan",
        data(){
            return{
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
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nama Bahan",
                        align: "start",
                        sortable: true,
                        value: "nama_bahan",
                    },
                    {text:"Stok", value:"stok"},
                    {text:"Satuan", value:"satuan"},
                    {text:"Tipe Bahan", value:"tipe_bahan"},
                    {text:"Actions", value:"actions"},
                ],
                sTipeBahan:["Makanan Utama","Makanan Side Dish","Minuman"],
                sSatuan:["gram","ml"],
                bahan: new FormData,
                bahans: [],
                form:{
                    nama_bahan: '',
                    stok: '',
                    satuan: '',
                    tipe_bahan: '',
                    status_hapus:0,
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
            //read data bahan
            readData(){
                var url = this.$api + '/bahan'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.bahans = response.data.data
                })
            },
            save(){
                this.bahan.append('nama_bahan', this.form.nama_bahan);
                this.bahan.append('stok', 0);
                this.bahan.append('tipe_bahan', this.form.tipe_bahan);
                this.bahan.append('satuan', this.form.satuan);
                this.bahan.append('status_hapus', 0);

                var url = this.$api + '/bahan'
                this.load = true
                this.$http.post(url, this.bahan, {
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
                        this.error_message='Nama Bahan tidak boleh sama'
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    })
            },
            update(){
                let newData = {
                    nama_bahan: this.form.nama_bahan,
                    stok: this.form.stok,
                    tipe_bahan: this.form.tipe_bahan,
                    satuan: this.form.satuan,
                    status_hapus: this.form.status_hapus
                    }
                    var url = this.$api + '/bahan/' + this.editId;
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
            },
            //hapus data bahan
            deleteData(){
                //menghapus data bahan
               let newData = {
                    status_hapus: 1
                    }
                    var url = this.$api + '/dbahan/' + this.deleteId;
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
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.nama_bahan = item.nama_bahan;
                this.form.stok = item.stok;
                this.form.tipe_bahan = item.tipe_bahan;
                this.form.satuan = item.satuan;
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
                this.$refs.form.reset();
                this.resetForm();
                this.readData();
                this.dialog = false;
                this.inputType = 'Tambah';
            },
            resetForm(){
                this.form ={
                    nama_bahan: '',
                    stok: '',
                    tipe_bahan: '',
                    satuan: '',
                };
            },
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