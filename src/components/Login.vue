<!-- @format -->

<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout class="align-center justify-center">
                <v-flex xs12 sm8 md4 lg4>
                    <v-card class="rounded-xl">
                        <v-card-text>
                            <div class="layout column align-center">
                                <img src="..\assets\akb.png" alt="gambar Akb" width="200" height="200">
                                <h1 class="flex my-4 red--text text--darken-4">Login AKB Restaurant</h1>
                            </div>
                        </v-card-text>
                        <v-card-text class="pt-1">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field 
                                    class="px-12 mx-4" 
                                    label="Email" 
                                    v-model="email" 
                                    :rules="emailRules" 
                                    required 
                                    rounded
                                    outlined
                                    prepend-inner-icon="mdi-email"
                                    dense></v-text-field>
                                    <v-text-field class="px-12 mx-4"
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    rounded
                                    outlined
                                    prepend-inner-icon="mdi-key"
                                    dense
                                    :rules="passwordRules" 
                                    required></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn class="red darken-4 white--text" @click="submit" :class="{'grey darken-1 white--text' :valid, disabled: !valid}"> Login
                                        </v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
                        {{error_message}}
                    </v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    .posisinya{
        position: absolute;
        top: -10px;
    }
</style>

<script>
export default {
    name: "Login",
    data(){
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules:[
                (v)=> !!v || 'Password tidak boleh kosong',
            ],
            email: '',
            emailRules:[
                (v) => !!v || 'Email tidak boleh kosong ',
            ],
        };
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){//cek apakah yg akan dikirim sudah valid
                this.load = true
                    this.$http.post(this.$api+'/login',{
                        email: this.email,
                        password: this.password
                    }).then(response=>{
                        localStorage.setItem('id', response.data.user.id);//menyimpan id user yang sedang login
                        localStorage.setItem('token', response.data.access_token);//menyimpan auth token
                        localStorage.setItem('id_jabatan',response.data.user.id_jabatan);
                        localStorage.setItem('nama',response.data.user.nama);
                        this.error_message = response.data.message;
                        this.color ="green"
                        this.snackbar=true;
                        this.load=false;
                        if(localStorage.getItem('id_jabatan')==1||localStorage.getItem('id_jabatan')==2){
                            console.log('login1')
                            this.$router.push({
                                name: 'Pegawai'
                            })  
                        }else if(localStorage.getItem('id_jabatan')==4||localStorage.getItem('id_jabatan')==5){
                           this.$router.push({
                                name: 'Pelanggan'
                            })  
                            console.log('login2')
                        }else{
                            console.log('login3')
                           this.$router.push({
                                name: 'Bahan'
                            })  
                        }
                        console.log('lewat')
                    }).catch(error=>{
                        this.error_message=error.response.data.message;
                        this.color="red"
                        this.snackbar=true;
                        localStorage.removeItem('token')
                        this.load=false
                    })
            }
        },
    },
};
</script>