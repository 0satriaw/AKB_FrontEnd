<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Pesanan</h3>
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
                <!-- <v-btn color="red darken-4" rounded dark @click="dialog =true"><v-icon left>mdi-plus</v-icon>
                    Tambah
                </v-btn> -->
            </v-card-title>
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="pesanans" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->
                <template v-slot:[`item.status_pesanan`]="{ item }">
                    <v-chip v-if="item.status_pesanan==0" color="success">
                        <span>Sedang Dimasak</span>
                    </v-chip>
                    <v-chip v-else-if="item.status_pesanan==1" color="warning">
                        <span>Siap Dihidangkan</span>
                    </v-chip>
                    <v-chip v-else color="primary">
                        <span>Disajikan</span>
                    </v-chip>
                </template>
                <template v-if="id_jabatan!=3" v-slot:[`item.actions`]="{ item }">
                     <v-btn v-if="item.status_pesanan==1 && item" icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                    
                     <v-btn v-else disabled icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                </template>
                <template v-else v-slot:[`item.actions`]="{ item }">
                    <v-btn v-if="item.status_pesanan==0 && item" icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                    
                        <v-btn v-else disabled icon @click="editHandler(item)">
                            <v-icon color="light-green darken-2">mdi-lead-pencil</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
        
        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Peringatan!</span>
                </v-card-title>
                <v-card-text class=" text-center pt-5 font-weight-bold">
                    Ubah status pesanan ini?
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogConfirm=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="update">
                        Ubah
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
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nama Pelanggan",
                        align: "start",
                        sortable: true,
                        value: "nama_pelanggan",
                    },
                    // {text:"Email", value:"email"},
                    {text:"Nomor Meja", value:"nomor_meja"},
                    {text:"Nama Pegawai", value:"nama"},
                    {text:"Menu", value:"nama_menu"},
                    {text:"Jumlah", value:"jumlah"},
                    {text:"Tipe", value:"tipe"},
                    {text:"Status", value:"status_pesanan", align: "center"},
                    {text:"Actions", value:"actions", align: "center"},
                ],
                pesanans: [],
                form:{
                  status_pesanan:''
                },
                editId: '',
                id_jabatan:'',
            };
        },
        methods: {
            readData(){
                var url = this.$api + '/pesanan'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.pesanans = response.data.data
                    this.id_jabatan=localStorage.getItem('id_jabatan');
                })
            },
            update(){
                let newData = {
                    status_pesanan:this.form.status_pesanan+1,
                    }
                    var url = this.$api + '/upesanan/' + this.editId;
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
                    this.cancel();
                    this.readData();//mengambildata
                }).catch(error =>{
                    this.error_message = error.respons.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load = false;
                })
            },
            editHandler(item){
                this.editId = item.id;
                this.form.status_pesanan= item.status_pesanan
                this.dialogConfirm = true; 
            },
            cancel(){
                this.readData();
                this.dialogConfirm = false;
            },
            
        },
        mounted(){
            this.readData();
        },
    };
</script>