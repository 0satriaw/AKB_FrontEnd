 <!-- @format -->
 <template>
    <div class="dashboard">   
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256"  app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-center font-weight-bold display-1 red--text text--darken-4" > AKB </v-list-item-title>
                    <v-list-item-subtitle class="text-center title font-weight-bold "> Restaurant </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                tag="router-link"
                :to="item.to"
                >
                    <v-list-item-icon>
                        <v-icon color="#aa2b1d">{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-sm-body-2 font-weight-medium grey--text text--darken-3">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Data Pegawai</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form" >
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="users.nama"
                                        label="Nama Pegawai"
                                        :rules="namaRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="users.email"
                                        label="Email"
                                        disabled
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="users.no_telp"
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
                                    v-model="users.jenis_kelamin"
                                    :rules="kelaminRules"
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
                    <v-btn color="blue darken-1" rounded text @click="update"   :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPassword" persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Data Pegawai</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form2" >
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="formPass.oldPass"
                                        label="Password Lama"
                                        :rules="passwordRules"
                                        required
                                        type="password"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="formPass.newPass"
                                        label="Password Baru"
                                        :rules="passwordRules"
                                        required
                                        type="password"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="formPass.confirmPass"
                                        label="Konfirmasi Password"
                                        :rules="passwordRules"
                                        required
                                        type="password"
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
                    <v-btn color="blue darken-1" rounded text @click="updatePassword"   :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="profile" overflow persistent max-width="600px">
            <v-card class="">
                <v-card-title class=" pa-5 justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Data Pegawai</span>
                </v-card-title>

                <v-card-text class="pt-4 pl-10 display-2 font-weight-bold ">
                    {{users.nama}}
                </v-card-text>
                <v-card-actions></v-card-actions>
                <v-card-text class="mt-n8 pl-10 subtitle-1 font-weight-thin font-italic ">
                    <v-icon>mdi-email</v-icon> {{users.email}}
                </v-card-text>

                 <v-card-actions class="justify-end mt-n14 mr-10">
                    <v-btn small color="transparent" text class="primary--text" @click="passwordHandler">
                        Ganti Password
                    </v-btn>
                </v-card-actions>

                <v-card class="ma-15 mt-4 elevation-0" color="grey lighten-4">
                    <v-card-text class="mt-n2 title font-weight-medium text-center">
                        <v-icon>mdi-phone</v-icon> {{users.no_telp}}
                    </v-card-text>
                    <v-card-text class="mt-n2 title font-weight-medium  text-center ">
                        <v-icon>mdi-gender-male-female</v-icon> {{users.jenis_kelamin}}
                    </v-card-text>
                    <v-card-text class="mt-n2 title font-weight-medium  text-center">
                        <v-icon>mdi-calendar-account</v-icon> {{users.tanggal_bergabung}}
                    </v-card-text>
                    <v-card-text class="mt-n2  title font-weight-medium  text-center">
                        <v-icon>mdi-bag-checked</v-icon> {{users.nama_jabatan}}
                    </v-card-text>
                </v-card>

                <v-card-actions class="justify-center mt-n10">
                    <v-btn color="red darken-4" rounded text @click="cancel">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" rounded text @click="ubah"   :class="{' darken-1 white--text' :valid, disabled: !valid}">
                        Ubah
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
        <v-app-bar app fixed height="60px" >
            <v-app-bar-nav-icon color="#aa2b1d" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="title font-weight-bold grey--text text--darken-2">{{users.nama_jabatan}}</v-toolbar-title>
            <VSpacer />
            <v-toolbar-items rounded>
                <v-menu offset-y >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        router
                        text
                        dense
                        rounded
                        >
                        <v-icon left color="#aa2b1d">mdi-account-circle</v-icon>{{users.nama}}
                        </v-btn>  
                    </template>
                    <v-list>
                        <v-list-item
                        @click="goProfile"
                        >
                            <v-list-item-title class="text-center grey--text text--darken-2" ><v-icon left color="#aa2b1d">mdi-account-cog</v-icon>Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        @click="logout"
                        >
                            <v-list-item-title class="text-center grey--text text--darken-2"><v-icon left color="#aa2b1d">mdi-exit-to-app</v-icon>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu> 
                <v-spacer></v-spacer>    
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">       
            <router-view></router-view>     
        </div> 
    </div> 
</template> 
<script>  
    export default {
           name: "Dashboard",
           data() {
               return {
                    load: false,
                    snackbar: false,
                    error_message:'',
                    color: '',
                    dialog:false,
                    profile:false,
                    users:[], 
                    drawer: true,
                    valid:false,
                    dialogPassword:false,
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
                    items: [],
                    formPass:{
                        oldPass:'',
                        newPass:'',
                        confirmPass:'',
                    },
                    sJenisKelamin:["Laki-Laki","Perempuan"],
                    pegawai: new FormData,
                    id_jabatan:'',
                };
            },
            methods: {
                goProfile(){
                    this.profile=true;
                },
                ubah(){
                    this.dialog=true;
                    this.profile=false
                },
                passwordHandler(){
                    this.dialogPassword=true;
                    this.profile=false
                },
                readData(){
                    var id = localStorage.getItem('id')
                    var url = this.$api + '/user/'+id
                    this.$http.get(url,{
                            headers:{
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(response =>{
                        this.users = response.data.data;
                    })
                },
                update(){
                    if(this.$refs.form.validate()){
                        let newData = {
                            nama: this.users.nama,
                            email: this.users.email,
                            jenis_kelamin: this.users.jenis_kelamin,
                            no_telp: this.users.no_telp,
                            id_jabatan: localStorage.getItem('id_jabatan'),
                            tanggal_bergabung: this.users.tanggal_bergabung,
                            status: 0
                            }
                            var url = this.$api + '/user/' + this.users.id;
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
                            // this.readData();//mengambildata
                            window.location.reload()
                        }).catch(error =>{
                            this.error_message = error.respons.data.message;
                            this.color="red"
                            this.snackbar=true;
                            this.load = false;
                        })
                    }
                },
                updatePassword(){
                    if(this.$refs.form2.validate()){
                        let newData = {
                            password: this.formPass.oldPass,
                            newPassword: this.formPass.newPass,
                            confirmPassword: this.formPass.confirmPass,
                            }
                            var url = this.$api + '/updatepassword/' + this.users.id;
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
                            this.dialogPassword=false;
                            this.readData();//mengambildata
                        }).catch(error =>{
                            this.error_message = error.response.data.message;
                            this.color="red"
                            this.snackbar=true;
                            this.load = false;
                        })
                    }
                },
                logout(){
                    let newData={
                        id: localStorage.getItem('id'),
                    }
                    this.$http.post(this.$api+'/logout',newData,{
                            headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                        }).then(response=>{
                            this.error_message = response.data.message;
                            this.color ="green"
                            this.snackbar=true;
                            this.load=false;

                            this.$router.push({
                                name: 'login'
                            })
                        }).catch(error=>{
                            this.error_message=error.response.data.message;
                            this.color="red"
                            this.snackbar=true;
                            localStorage.removeItem('token')
                            this.load=false
                        })
                    localStorage.removeItem('id')
                    localStorage.removeItem('token')
                    localStorage.removeItem('id_jabatan')
                },
                initNavbar(){
                    if(localStorage.getItem('id_jabatan')==1){
                        this.items = [
                            { title: "Pegawai", to: "/pegawai", icon:"mdi-account-box-multiple"},
                            { title: "Laporan", to: "/laporan", icon:"mdi-book-multiple"},
                        ]
                    }else if(localStorage.getItem('id_jabatan')==2){
                        this.items = [
                            { title: "Pegawai", to: "/pegawai", icon:"mdi-account-box-multiple"},
                            { title: "Pelanggan", to: "/pelanggan", icon:"mdi-account-group"},
                            { title: "Bahan", to: "/bahan", icon:"mdi-hamburger"},
                            { title: "Kartu", to: "/kartu", icon:"mdi-card-account-details"},
                            { title: "Meja", to: "/meja", icon:"mdi-table-chair"},
                            { title: "Menu", to: "/menu", icon:"mdi-food"},
                            { title: "Pesanan", to: "/pesanan", icon:"mdi-clipboard-text-multiple"},
                            { title: "Reservasi", to: "/reservasi", icon:"mdi-table-furniture"},
                            { title: "Stok Masuk", to: "/stokmasuk", icon:"mdi-database-import"},
                            { title: "Stok Keluar", to: "/stokkeluar", icon:"mdi-database-export"},
                            { title: "Transaksi", to: "/transaksi", icon:"mdi-cash-register"},
                            { title: "Laporan", to: "/laporan", icon:"mdi-book-multiple"},
                        ]
                    }else if(localStorage.getItem('id_jabatan')==3){
                        this.items = [
                            { title: "Bahan", to: "/bahan", icon:"mdi-hamburger"},
                            { title: "Pesanan", to: "/pesanan", icon:"mdi-clipboard-text-multiple"},
                            { title: "Stok Masuk", to: "/stokmasuk", icon:"mdi-database-import"},
                            { title: "Stok Keluar", to: "/stokkeluar", icon:"mdi-database-export"},
                        ]
                    }else{
                         this.items = [
                            { title: "Pelanggan", to: "/pelanggan", icon:"mdi-account-group"},
                            { title: "Meja", to: "/meja", icon:"mdi-table-chair"},
                            { title: "Menu", to: "/menu", icon:"mdi-food"},
                            { title: "Pesanan", to: "/pesanan", icon:"mdi-clipboard-text-multiple"},
                            { title: "Reservasi", to: "/reservasi", icon:"mdi-table-furniture"},
                            { title: "Transaksi", to: "/transaksi", icon:"mdi-cash-register"},
                        ]
                    }
                },
                resetFormPass(){
                    this.formPass ={
                    oldPass: '',
                    newPass: '',
                    confirmPass: '',
                    };
                },
                goUser(){
                    this.$router.push({
                            name: 'profile'
                    })
                },
                cancel(){
                    this.profile=false
                    this.dialog=false
                    this.dialogPassword=false
                    this.readData()
                }
            },
            mounted(){
            this.readData();
            this.initNavbar();
        },            
        };
</script> 

<style scoped>
    .fullheight {
        min-height: 100vh !important;
    }
    .router {
        text-decoration: none;   
        color: black;
    }
</style>   