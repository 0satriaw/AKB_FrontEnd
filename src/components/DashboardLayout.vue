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
        <v-app-bar app fixed height="60px" >
            <v-app-bar-nav-icon color="#aa2b1d" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="title font-weight-bold grey--text text--darken-2">Owner</v-toolbar-title>
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
                        <v-icon left color="#aa2b1d">mdi-account-circle</v-icon>
                        Nama orang</v-btn>  
                    </template>
                    <v-list>
                        <v-list-item
                        @click="goProfile"
                        >
                            <v-list-item-title class="text-center grey--text text--darken-2" ><v-icon left color="#aa2b1d">mdi-account-circle</v-icon>Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        @click="logout"
                        >
                            <v-list-item-title class="text-center grey--text text--darken-2"><v-icon left color="#aa2b1d">mdi-account-circle</v-icon>Logout</v-list-item-title>
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
                   drawer: true,
                   items: [
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
                    ], 
                };
            },
            methods: {
                goProfile(){
                    this.$router.push({
                            name: 'login'
                        })
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
                },
                goUser(){
                    this.$router.push({
                            name: 'profile'
                    })
                }
            }
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