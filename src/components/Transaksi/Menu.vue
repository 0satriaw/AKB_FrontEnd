<!-- @format -->
<template>
    <v-main class="list py-2 mx-4">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Data Menu</h3>
        <v-card class="py-3">
            <v-container fluid>
                <v-data-iterator
                :items="menus"
                :search="search"
                hide-default-footer
                >
                <!-- :items-per-page.sync="itemsPerPage" -->
                <template v-slot:header>
                    <v-toolbar
                    class="mb-1"
                    >
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
                    <template>
                        <v-spacer></v-spacer>
                        <v-select
                        v-model="sortBy"
                        hide-details
                        rounded
                        single-line
                        outlined
                        dense
                        :items="keys"
                        prepend-inner-icon="mdi-magnify"
                        label="Filter"
                        ></v-select>
                    </template>
                    <v-spacer></v-spacer>
                <v-btn color="red darken-4" rounded dark @click="dialog =true"><v-icon left>mdi-plus</v-icon>
                    Tambah
                </v-btn>
                    </v-toolbar>
                </template>

                <template >
                    <v-row >
                    <v-col
                        v-for="item in filtermenu"
                        :key="item.nama_menu"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="3"
                    >
                          <v-card
                            
                            class="mx-auto my-12"
                            max-width="374"
                            fixed
                        >
                            <v-img
                            height="250"
                            :src="'http://atmakb.xyz/public'+item.gambar"
                            ></v-img>

                            <v-card-title>{{item.nama_menu}}</v-card-title>

                            <v-card-text class="mt-n5">
                            <div class="my-auto subtitle-1">
                                {{item.tipe}}
                            </div>

                            <div>{{item.deskripsi}}</div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-title class="justify-center">Stok : {{item.stok}}</v-card-title>
                            <v-card-title class="mt-n9 justify-center">Harga : {{item.harga}}</v-card-title>

                            <v-card-actions class=" mt-n4 justify-center">
                            <!-- <v-btn
                                color="red darken-4"
                                text
                                @click="editHandler(item)"
                            >
                                Detail
                            </v-btn> -->
                             <v-btn
                                color="blue darken-1"
                                text
                                @click="editHandler(item)"
                            >
                                Ubah
                            </v-btn>
                             <v-btn
                                color="yellow darken-4"
                                text
                                @click="deleteHandler(item.id)"
                            >
                                Hapus
                            </v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
            </v-container>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card class="">
                <v-card-title class=" pa-4 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">{{ formTitle }} Data Menu</span>
                </v-card-title>
                <v-card-text class="pa-3">
                    <div class="layout column align-center">
                        <v-img v-if="url!=null" :src="url" alt="gambar Akb" width="200" height="150"></v-img>
                        <img v-else src="..\..\assets\akb.png" alt="gambar Akb" width="200" height="150">
                    </div>
                </v-card-text>
                
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col class="col-md-8">
                                    <v-text-field
                                        v-model="form.nama_menu"
                                        label="Nama Menu"
                                        :rules="namaRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-file-input
                                        v-model="form.gambar"
                                        label="Gambar"
                                        @change="previewImage"
                                        prepend-icon="mdi-camera"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-select
                                    label="Nama Bahan"
                                    v-model="form.id_bahan"
                                    :items="bahans"
                                    item-text="nama_bahan"
                                    item-value="id"
                                    :rules="bahanRules"
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                    :items="sTipeMenu"
                                    label="Tipe Menu"
                                    v-model="form.tipe"
                                    :rules="tipeRules"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="form.harga"
                                        label="Harga"
                                        :rules="hargaRules"
                                        type="Number"
                                        required
                                    > </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-model="form.serving_size"
                                        label="Serving Size"
                                        :rules="ssRules"
                                        required
                                        type="number"
                                    > </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-select
                                    :items="sUnit"
                                    label="Penyajian"
                                    v-model="form.unit"
                                    :rules="unitRules"
                                    required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-textarea
                                        v-model="form.deskripsi"
                                        label="Deskripsi"
                                        :rules="deskripsiRules"
                                        required
                                    > </v-textarea>
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
                    Apakah anda yakin ingin menghapus menu ini?
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
        name:"Menu",
        data(){
            return{
                filter: {},
                sortBy: '',
                url:null,
                keys: [
                    'Semua' ,        
                    'Makanan Utama',
                    'Makanan Side Dish',
                    'Minuman',
                ],
                //UNTIL THIS
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message:'',
                color: '',
                dialog:false,
                search: null,
                dialogAktif: false,
                dialogConfirm: false,
                valid: false,
                namaRules:[
                    (v) => !!v || 'Nama Menu tidak boleh kosong ',
                ],
                bahanRules:[
                    (v) => !!v || 'Nama Bahan tidak boleh kosong ',
                ],
                tipeRules:[
                    (v) => !!v || 'Tipe Menu tidak boleh kosong',
                ],
                unitRules:[
                    (v) => !!v || 'Unit Menu tidak boleh kosong ',
                ],
                deskripsiRules:[
                    (v) => !!v || 'Deskripsi Menu tidak boleh kosong ',
                ],
                hargaRules: [v  => {    
                    if ( !!v && v >= 0) return true;
                    return 'Harga harus lebih besar dari 0';
                }],
                
                ssRules: [v  => {    
                    if ( !!v && v >= 0) return true;
                    return 'Serving Size harus lebih besar dari 0';
                }],
                sUnit:["Plate","Bowl","Mini Bowl","Glass","Bottle"],
                sTipeMenu:["Makanan Utama","Makanan Side Dish","Minuman"],
                menu: new FormData,
                menus: [],
                bahans:[],
                form:{
                    id_bahan: '',
                    nama_menu: '',
                    unit: '',
                    tipe: '',
                    stok: '',
                    serving_size: '',
                    deskripsi:'',
                    harga: '',
                    gambar:null,
                    status_hapus:0,
                },
                deleteId: '',
                editId: '',
                id:'',
            };
        },
        methods: {
            previewImage(){
                this.url= URL.createObjectURL(this.form.gambar)
            },
            cekStok(id){
                for (let index = 0; index < this.bahans.length; index++) {
                    if(this.bahans[index].id==id){
                        this.form.stok=this.bahans[index].stok/this.form.serving_size
                        this.form.stok = Math.floor(this.form.stok)
                        console.log(this.form.stok)
                    }
                }
            },
            setForm(){
               if(this.$refs.form.validate()){
                   if(this.inputType === 'Tambah'){
                       console.log('tambah')
                       this.save()
                   }else{
                       this.update()
                   }
               }
            },
            //read data pegawai
            readData(){
                var url = this.$api + '/menu'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.menus = response.data.data
                    this.id=localStorage.getItem('id');
                    console.log(this.menus);
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

                })
            },
            save(){
                this.menu.append('id_bahan', this.form.id_bahan);
                this.menu.append('nama_menu', this.form.nama_menu);
                this.menu.append('tipe', this.form.tipe);
                this.menu.append('unit', this.form.unit);
                this.menu.append('harga', this.form.harga);
                this.menu.append('serving_size', this.form.serving_size);
                this.menu.append('gambar', this.form.gambar);
                this.menu.append('deskripsi', this.form.deskripsi);
                this.cekStok(this.form.id_bahan);
                console.log(this.form.stok);
                this.menu.append('stok', this.form.stok);
                this.menu.append('status_hapus', 0);    

                var url = this.$api + '/menu'
                this.load = true
                this.$http.post(url, this.menu, {
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
                this.cekStok(this.form.id_bahan)
                let newData = {
                    id_bahan: this.form.id_bahan,
                    nama_menu: this.form.nama_menu,
                    tipe: this.form.tipe,
                    unit: this.form.unit,
                    harga: this.form.harga,
                    serving_size: this.form.serving_size,
                    stok:  this.form.stok,
                    deskripsi: this.form.deskripsi,
                    status_hapus:0
                    }
                    var url = this.$api + '/menu/' + this.editId;
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
                if(this.form.gambar!=null){
                    let item=new FormData();
                    item.append('gambar', this.form.gambar);
                    console.log(item);
                    url = this.$api + '/menu/gambar/'+this.editId;
                    this.load = true
                    this.$http.post(url, item, {
                        headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green"
                        this.snackbar = true;
                        this.close();
                        this.readData(); //mengambil data
                        this.resetForm();
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red"
                        this.snackbar = true;
                        this.load = false;
                    })
                    
                }
              

            },
            deleteData(){
               let newData = {
                        status_hapus: 1
                    }
                    var url = this.$api + '/dmenu/' + this.deleteId;
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
            cekIdBahan(id){
                for (let index = 0; index < this.bahans.length; index++) {
                    if(this.bahans[index].id==id){
                        this.form.id_bahan=this.bahans[index].nama_bahan;
                    }
                }
            },
            editHandler(item){
                console.log(this.bahans);
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.nama_menu = item.nama_menu;
                this.form.unit = item.unit;
                this.form.tipe = item.tipe;
                this.form.stok = item.stok;
                this.form.serving_size = item.serving_size;
                this.form.harga = item.harga;
                this.form.id_bahan = item.id_bahan
                this.form.deskripsi = item.deskripsi;
                this.url = "http://atmakb.xyz/public"+item.gambar;
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
                this.url=null,
                this.filter= {},
                this.form ={
                    id_bahan: '',
                    nama_menu: '',
                    unit: '',
                    tipe: '',
                    stok: '',
                    serving_size: '',
                    deskripsi:'',
                    harga: '',
                    gambar:null,
                    status_hapus:0,
                };
            },
        },
        computed: {
            formTitle(){
                return this.inputType
            },  
            filtermenu(){
                return this.menus.filter(item => {
                  if(this.search==null){
                      if(this.sortBy=='Makanan Utama' || this.sortBy=='Makanan Side Dish' || this.sortBy=='Minuman'){
                            return item.tipe.toLowerCase().includes(this.sortBy.toLowerCase())
                      }
                      return item;
                  }else{
                      return item.nama_menu.toLowerCase().includes(this.search.toLowerCase())
                  }
                })
              }
        },
        mounted(){
            this.readData();
            this.readDataBahan();
        },
    };
</script>