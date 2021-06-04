<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Kartu</h3>
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
            <v-data-table class="pa-2 mx-2 elevation-3" :headers="headers" :items="kartus" :search="search">
                <!-- nomer using id -->
                <!-- <template v-slot:[`item.no`]="{ item }">
                    {{item.id}}
                </template> -->
                <template v-slot:[`item.nama_pemilik`]="{ item }">
                    <span v-if="item.nama_pemilik==null">-</span>
                   <span v-else >{{item.nama_pemilik}}</span>
                </template>

                <template v-slot:[`item.exp_date`]="{ item }">
                    <span v-if="item.exp_date==null">-</span>
                   <span v-else >{{item.exp_date}}</span>
                </template>
                

                <template v-slot:[`item.tipe_kartu`]="{ item }">
                    <v-chip v-if="item.tipe_kartu==1" color="success">
                        <span>Credit Card</span>
                    </v-chip>
                    <v-chip v-else color="primary">
                        <span>Debit Card</span>
                    </v-chip>
                </template>
            </v-data-table>
        </v-card>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>

<script>
    export default {
        name:"Kartu",
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
                    (v) => !!v || 'Nama Kartu tidak boleh kosong ',
                ],
                stokRules: [v  => {    
                    if ( !!v && v >= 0) return true;
                    return 'Stok harus lebih besar dari 0';
                }],
                tipeRules:[
                    (v) => !!v || 'Tipe Kartu tidak boleh kosong ',
                ],
                satuanRules:[
                    (v) => !!v || 'Satuan tidak boleh kosong ',
                ],
                headers:[
                    // {text:"No", value:"no"},
                    {
                        text:"Nomor Kartu",
                        align: "start",
                        sortable: true,
                        value: "nomor_kartu",
                    },
                    {text:"Nama Pemilik", value:"nama_pemilik"},
                    {text:"Expired Date", value:"exp_date"},
                    {text:"Tipe Kartu", value:"tipe_kartu"},
                ],
                sTipeBahan:["Makanan Utama","Makanan Side Dish","Minuman"],
                sSatuan:["gram","ml"],
                bahan: new FormData,
                kartus: [],
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
                var url = this.$api + '/kartu'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.kartus = response.data.data
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