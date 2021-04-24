<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Meja</h3>
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
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="mejas" :search="search">
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

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Meja</span>
                </v-card-title>
                <v-card-text class="pt-2">
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col >
                                    <v-text-field
                                        v-model="form.nomor_meja"
                                        label="Nomor Meja"
                                        :rules="noRules"
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
                    Apakah anda yakin ingin menghapus meja ini?
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
        name:"Meja",
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
                noRules:[
                    (v) => !!v || 'Nomor meja tidak boleh kosong ',
                    (v) => v>0 || 'Nomor meja tidak boleh minus',
                ],
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nomor Meja",
                        align: "start",
                        sortable: true,
                        value: "nomor_meja",
                    },
                    {text:"Status Ketersediaan", value:"status"},
                    {text:"Actions", value:"actions"},
                ],
                meja: new FormData,
                mejas: [],
                form:{
                    nomor_meja: '',
                    status: '',
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
            //read Data Meja
            readData(){
                var url = this.$api + '/meja'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.mejas = response.data.data
                })
            },
            save(){
                this.meja.append('nomor_meja', this.form.nomor_meja);
                this.meja.append('status', 'Tersedia');
                this.meja.append('status_hapus', 0);

                var url = this.$api + '/meja/'
                this.load = true
                this.$http.post(url, this.meja, {
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
                        this.error_message=error.response.data.message.nomor_meja;
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                    })
            },
            update(){
                let newData = {
                    nomor_meja: this.form.nomor_meja,
                    }
                    var url = this.$api + '/meja/' + this.editId;
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
                    this.error_message = error.response.data.message.nomor_meja;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            //hapus Data Meja
            deleteData(){
                //menghapus Data Meja
               let newData = {
                    status_hapus: 1
                    }
                    var url = this.$api + '/dmeja/' + this.deleteId;
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
                    nomor_meja: '',
                    status: 'Tersedia',
                    status_hapus: '',
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