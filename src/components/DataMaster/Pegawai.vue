<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Pegawai</h3>
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
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="pegawais" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->
                <template v-slot:[`item.status`]="{ item }">
                    <v-chip v-if="item.status==0" color="success">
                        <span>Aktif</span>
                    </v-chip>
                    <v-chip v-else color="error">
                        <span>Nonaktif</span>
                    </v-chip>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn v-if="item.id!=id&&item.nama_jabatan!='Owner'" icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                     <v-btn v-else disabled icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                    <v-btn v-if="item.status==0&&item.id!=id&&item.nama_jabatan!='Owner'" icon @click="deleteHandler(item)">
                            <v-icon color="red darken-3">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn v-else icon disabled @click="deleteHandler(item)">
                            <v-icon color="red darken-3">mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Pegawai</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="form.nama"
                                        label="Nama Pegawai"
                                        :rules="namaRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-if="inputType=='Tambah'"
                                        v-model="form.email"
                                        label="Email"
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-else
                                        v-model="form.email"
                                        label="Email"
                                        disabled
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-if="inputType=='Tambah'"
                                        v-model="form.password"
                                        label="Password"
                                        type="password"
                                        :rules="passwordRules"
                                        required
                                    ></v-text-field>
                                     <v-text-field
                                        v-else
                                        v-model="form.password"
                                        label="Password"
                                        disabled
                                        type="password"
                                        :rules="passwordRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="form.no_telp"
                                        label="No Telepon"
                                        :rules="noRules"
                                        required
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-select
                                    :items="sJenisKelamin"
                                    label="Jenis Kelamin"
                                    v-model="form.jenis_kelamin"
                                    :rules="kelaminRules"
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                    :items="sJabatan"
                                    label="Jabatan"
                                    v-model="form.nama_jabatan"
                                    :rules="jabatanRules"
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
                    Apakah anda yakin ingin menonaktifkan pegawai ini?
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

        <v-dialog v-model="dialogAktif" persistent max-width="400px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Peringatan!</span>
                </v-card-title>
                <v-card-text class="pt-5 font-weight-bold">
                    Apakah anda yakin ingin mengaktifkan pegawai ini?
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogAktif=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="aktifUser">
                        Aktifkan
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
        name:"Pegawai",
        data(){
            return{
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message:'',
                color: '',
                search: null,
                dialog: false,
                dialogAktif: false,
                dialogConfirm: false,
                aktifId:'',
                valid: false,
                namaRules:[
                    (v) => !!v || 'Nama Pegawai tidak boleh kosong ',
                ],
                passwordRules:[
                    (v) => !!v || 'Password tidak boleh kosong ',
                ],
                kelaminRules:[
                    (v) => !!v || 'Jenis Kelamin tidak boleh kosong',
                ],
                jabatanRules:[
                    (v) => !!v || 'Jabatan tidak boleh kosong ',
                ],
                noRules:[
                    (v) => !!v || 'Nomer telepon tidak boleh kosong ',
                    (v) => !v || /^08[0-9]{8,10}$/.test(v) || 'Nomer telepon harus valid',
                ],
                 emailRules: [ 
                    v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email harus valid',
                    v => !!v || 'Email tidak boleh kosong ',
                ],
                // stokRules: [v  => {    
                //     if ( !!v && v >= 0) return true;
                //     return 'Stok harus lebih besar dari 0';
                // }],
                sJenisKelamin:["Laki-Laki","Perempuan"],
                sJabatan:["Operational Manager","Chef","Cashier","Waiter"],
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nama Pegawai",
                        align: "start",
                        sortable: true,
                        value: "nama",
                    },
                    // {text:"Email", value:"email"},
                    {text:"Jenis Kelamin", value:"jenis_kelamin"},
                    {text:"No Telepon", value:"no_telp"},
                    {text:"Jabatan", value:"nama_jabatan", align: "center"},
                    {text:"Tanggal Bergabung", value:"tanggal_bergabung", align: "center"},
                    {text:"Status", value:"status", align: "center"},
                    {text:"Actions", value:"actions", align: "center"},
                ],
                pegawai: new FormData,
                pegawais: [],
                form:{
                    nama: '',
                    email: '',
                    password: '',
                    jenis_kelamin: '',
                    no_telp: '',
                    nama_jabatan: '',
                    id_jabatan:'',
                    tanggal_bergabung: '',
                    status:0,
                },
                deleteId: '',
                editId: '',
                id:'',
            };
        },
        methods: {
            cekID(nama_jabatan){
                if(nama_jabatan=="Operational Manager"){
                    return this.form.id_jabatan=2
                }else if(nama_jabatan=="Chef"){
                    return this.form.id_jabatan=3
                }else if(nama_jabatan=="Cashier"){
                    return this.form.id_jabatan=4
                }else{
                     return this.form.id_jabatan=5
                }
            },
            setForm(){
               if(this.$refs.form.validate()){
                   if(this.inputType === 'Tambah'){
                       this.save()
                   }else{
                       this.update()
                   }
               }
            },
            //read data pegawai
            readData(){
                var url = this.$api + '/user'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.pegawais = response.data.data
                    this.id=localStorage.getItem('id');
                    console.log(this.id)
                })
            },
            save(){
                this.cekID(this.form.nama_jabatan);
                this.pegawai.append('nama', this.form.nama);
                this.pegawai.append('email', this.form.email);
                this.pegawai.append('password', this.form.password);
                this.pegawai.append('jenis_kelamin', this.form.jenis_kelamin);
                this.pegawai.append('no_telp', this.form.no_telp);
                this.pegawai.append('id_jabatan', this.form.id_jabatan);
                this.pegawai.append('tanggal_bergabung', this.form.tanggal_bergabung);
                this.pegawai.append('status', 0);

                var url = this.$api + '/user/'
                this.load = true
                this.$http.post(url, this.pegawai, {
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
                this.cekID(this.form.nama_jabatan);
                let newData = {
                    nama: this.form.nama,
                    email: this.form.email,
                    jenis_kelamin: this.form.jenis_kelamin,
                    no_telp: this.form.no_telp,
                    id_jabatan: this.form.id_jabatan,
                    tanggal_bergabung: this.form.tanggal_bergabung,
                    status: 0
                    }
                    var url = this.$api + '/user/' + this.editId;
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
            //hapus data pegawai
            deleteData(){
                //menghapus data pegawai
               let newData = {
                    status: 1
                    }
                    var url = this.$api + '/duser/' + this.deleteId;
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
            aktifUser(){
                //menghapus data pegawai
               let newData = {
                    status: 0
                    }
                    var url = this.$api + '/duser/' + this.aktifId;
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
                    this.dialogAktif=false;
                    this.inputType='Tambah';
                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            editHandler(item){
                if(item.status==0&&item.id!=1&&localStorage.getItem('id_jabatan')==2){
                    // this.inputType = 'Ubah';
                    // this.editId = item.id;
                    // console.log(this.editId)
                    // this.form.nama = item.nama;
                    // this.form.email = item.email;
                    // this.form.password = '123456789123';
                    // this.form.jenis_kelamin = item.jenis_kelamin;
                    // this.form.no_telp = item.no_telp;
                    // this.form.tanggal_bergabung = item.tanggal_bergabung;
                    // this.form.nama_jabatan = item.nama_jabatan;
                    // this.dialog = true; 
                    this.initForm(item)
                }else{
                    if(item.id!=this.id&&item.status==0){
                       this.initForm(item)
                    }else{
                        this.aktifId = item.id;
                        this.dialogAktif = true;
                    }
                }
            },
            initForm(item){
                this.inputType = 'Ubah';
                this.editId = item.id;
                console.log(this.editId)
                this.form.nama = item.nama;
                this.form.email = item.email;
                this.form.password = '123456789123';
                this.form.jenis_kelamin = item.jenis_kelamin;
                this.form.no_telp = item.no_telp;
                this.form.tanggal_bergabung = item.tanggal_bergabung;
                this.form.nama_jabatan = item.nama_jabatan;
                this.dialog = true; 
            },
            deleteHandler(item){
                if( localStorage.getItem('id_jabatan')==2){
                    if(item.status==0&&item.id!=1){
                        this.deleteId = item.id;
                        this.dialogConfirm = true;
                    }
                }else{
                    this.deleteId = item.id;
                    this.dialogConfirm = true;
                }
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
                    nama: '',
                    email: '',
                    password: '',
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