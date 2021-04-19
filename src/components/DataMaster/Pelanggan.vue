<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Pelanggan</h3>
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
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="pelanggans" :search="search">
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
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Pelanggan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="form.nama_pelanggan"
                                        label="Nama Pelanggan"
                                        :rules="namaRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="col-md-8">
                                    <v-text-field
                                        v-model="form.email"
                                        label="Email"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                     <v-text-field
                                        v-model="form.no_telp"
                                        label="No Telepon"
                                        type="number"
                                        required
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
                    Apakah anda yakin ingin menghapus pelanggan ini?
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
        name:"Pelanggan",
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
                namaRules:[
                    (v) => !!v || 'Nama Pelanggan tidak boleh kosong ',
                ],
                // stokRules: [v  => {    
                //     if ( !!v && v >= 0) return true;
                //     return 'Stok harus lebih besar dari 0';
                // }],
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nama Pelanggan",
                        align: "start",
                        sortable: true,
                        value: "nama_pelanggan",
                    },
                    {text:"Email", value:"email"},
                    {text:"Nomer Telepon", value:"no_telp"},
                    {text:"Actions", value:"actions"},
                ],
                pelanggan: new FormData,
                pelanggans: [],
                form:{
                    nama_pelanggan: '',
                    email: '',
                    no_telp: '',
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
            //read data pelanggan
            readData(){
                var url = this.$api + '/pelanggan'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.pelanggans = response.data.data
                })
            },
            save(){
                this.pelanggan.append('nama_pelanggan', this.form.nama_pelanggan);
                this.pelanggan.append('email', this.form.email);
                this.pelanggan.append('no_telp', this.form.no_telp);
                this.pelanggan.append('status_hapus', 0);

                var url = this.$api + '/pelanggan/'
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
                let newData = {
                    nama_pelanggan: this.form.nama_pelanggan,
                    email: this.form.email,
                    no_telp: this.form.no_telp,
                    status_hapus: this.form.status_hapus
                    }
                    var url = this.$api + '/pelanggan/' + this.editId;
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
            //hapus data pelanggan
            deleteData(){
                //menghapus data pelanggan
               let newData = {
                    status_hapus: 1
                    }
                    var url = this.$api + '/dpelanggan/' + this.deleteId;
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
                this.form.nama_pelanggan = item.nama_pelanggan;
                this.form.email = item.email;
                this.form.no_telp = item.no_telp;
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
                    nama_pelanggan: '',
                    email: '',
                    no_telp: '',
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