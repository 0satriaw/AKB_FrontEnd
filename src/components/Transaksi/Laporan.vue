<!-- @format -->
<template>
    <v-main class="list py-2 mx-4 ini">
        <h3 class="text-center display-2 font-weight-bold mb-5 red--text text--darken-4">Laporan</h3>
        <v-container class="py-5 my-6 elevation-2">
            <v-row>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Pendapatan Bulanan</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formPendapatanBulanan">
                                    <v-row>
                                        <v-col>
                                            <v-select
                                            :items="sTahun"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun"
                                            v-model="tahun"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                         <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormPendapatanBulanan" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Pendapatan Tahunan</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formPendapatanTahunan">
                                    <v-row>
                                        <v-col>
                                        <v-select
                                            :items="sTahun"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun Awal"
                                            v-model="tahunAwal"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                        <v-col>
                                        <v-select
                                            :items="sTahun"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun Akhir"
                                            v-model="tahunAkhir"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormPendapatanTahunan" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

<!-- PENGELUARAN -->
        <v-container class="py-5 my-6 elevation-2">
            <v-row>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Pengeluaran Bulanan</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formPengeluaranBulanan">
                                    <v-row>
                                        <v-col>
                                            <v-select
                                            :items="sTahunKeluar"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun"
                                            v-model="tahunKeluar"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                         <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormPengeluaranBulanan" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Pengeluaran Tahunan</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formPengeluaranTahunan">
                                    <v-row>
                                        <v-col>
                                        <v-select
                                            :items="sTahunKeluar"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun Awal"
                                            v-model="tahunAwalKeluar"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                        <v-col>
                                        <v-select
                                            :items="sTahunKeluar"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun Akhir"
                                            v-model="tahunAkhirKeluar"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormPengeluaranTahunan" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>


        <!-- STOK BAHAN -->
         <v-container class="py-5 my-6 elevation-2">
            <v-row>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Stok Bahan Custom</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formStokCustom">
                                    <v-row>
                                        <v-col>
                                            <v-menu
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :nudge-right="30"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="tanggalAwal"
                                                        label="Tanggal Awal"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                color="#F9A825"
                                                v-model="tanggalAwal"
                                                @input="menu = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col>
                                            <v-menu
                                                v-model="menu2"
                                                :close-on-content-click="false"
                                                :nudge-right="30"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="tanggalAkhir"
                                                        label="Tanggal Akhir"
                                                        prepend-icon="mdi-calendar"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                color="#F9A825"
                                                v-model="tanggalAkhir"
                                                @input="menu2 = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                         <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormStokCustom" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Stok Bahan Per Item</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formStokPerItem">
                                    <v-row>
                                        <v-col>
                                            <v-select
                                            :items="sMenu"
                                            item-text="nama_menu"
                                            item-value="nama_menu"
                                            label="Pilih Menu"
                                            v-model="nama_menu"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                        <v-col>
                                        <v-select
                                            :items="sTahunKeluar"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun Awal"
                                            v-model="tahunStok"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                        <v-col>
                                        <v-select
                                            :items="sBulanStok"
                                            item-text="Bulan"
                                            item-value="id"
                                            label="Pilih Bulan"
                                            v-model="bulanStok"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormStokPerItem" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

<!-- PENJUALAN ITEM -->
        <v-container class="py-5 my-6 elevation-2">
            <v-row>
                <v-col>
                    <v-card class="pb-3">
                        <v-card-title class=" pa-5 justify-center red darken-4">
                            <span class="headline font-weight-bold white--text">Laporan Penjualan Item</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="valid" ref="formPenjualanItem">
                                    <v-row>
                                        <v-col>
                                            <v-select
                                            :items="sTahunPenjualan"
                                            item-text="tahun"
                                            item-value="tahun"
                                            label="Pilih tahun"
                                            v-model="tahunPenjualan"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                         <v-col>
                                            <v-select
                                            :items="sBulan"
                                            item-text="Bulan"
                                            item-value="id"
                                            label="Pilih Bulan"
                                            v-model="bulanPenjualan"
                                            :rules="tipeRules"
                                            required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                         <v-card-actions class="justify-center">
                            <v-btn color="blue darken-1" rounded text @click="setFormPenjualanItem" :class="{' darken-1 white--text' :valid, disabled: !valid}">
                                Cetak
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                
            </v-row>
        </v-container>

        <!-- STOK PER ITEM -->
        <v-dialog v-model="dialogStokPerItem" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5">
                    <div id="printStokPerItem" style="width: 800.28px; color: black;background: white;">
                        <v-container  class="pa-4 mt-9"
                                justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                    <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                        <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                        <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                        <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                    <h-1 class="titleLap font-weight-bold">LAPORAN STOK BAHAN</h-1>
                            </v-row>
                                <v-row>
                                <v-col>ITEM MENU : {{nama_menu}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col>PERIODE: {{namaBulanStok}} {{tahunStok}}</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersStokPerItem" :items="lapStokPerItem"  hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                <p class="titleDate ">Printed {{printedDate}}</p>
                            </v-row>
                            <v-row>
                                <p class="titleCashier ">Printed by {{cashier}}</p>
                            </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogStokPerItem=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLStokPerItem">
                        Cetak
                    </v-btn>
                </v-card-actions>

                
            </v-card>
        </v-dialog>


        <!-- DIALOG STOK CUSTOM -->
        <v-dialog v-model="dialogStokCustom" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5">
                    <div id="printStokCustom" style="width: 800.28px; color: black;background: white;">
                        <v-container  class="pa-4 mt-9"
                                justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                    <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                        <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                        <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                        <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                    <h-1 class="titleLap font-weight-bold">LAPORAN STOK BAHAN CUSTOM</h-1>
                            </v-row>
                                <v-row>
                                <v-col>ITEM MENU : SEMUA</v-col>
                            </v-row>
                            <v-row>
                                <v-col>PERIODE: CUSTOM ({{tanggalAwal}} s/d {{tanggalAkhir}})</v-col>
                            </v-row>
                                <v-row>
                                <v-col>MAKANAN</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersStokCustom" :items="lapStokCustomMakanan"  hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                                <v-row>
                                <v-col>SIDE DISH</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersStokCustom" :items="lapStokCustomSidedish" hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                                <v-row>
                                <v-col>MINUMAN</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersStokCustom" :items="lapStokCustomMinuman" hide-default-footer disable-pagination >
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                                
                                <v-row>
                                    <p class="titleDate ">Printed {{printedDate}}</p>
                                </v-row>
                                <v-row>
                                    <p class="titleCashier ">Printed by {{cashier}}</p>
                                </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogStokCustom=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLStokCustom">
                        Cetak
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        

    <!-- DIALOGPENJUALAN -->
         <v-dialog v-model="dialogPenjualanItem" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5">
                    <div id="printItemPenjualan" style="width: 800.28px; color: black;background: white;">
                        <v-container  class="pa-4 mt-9"
                                justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                    <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                        <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                        <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                        <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                    <h-1 class="titleLap font-weight-bold">LAPORAN PENJUALAN ITEM MENU</h-1>
                            </v-row>
                                <v-row>
                                <v-col>Tahun : {{tahunPenjualan}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col>Bulan : {{namaBulan}}</v-col>
                            </v-row>
                                <v-row>
                                <v-col>MAKANAN</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPenjualan" :items="lapPenjualanMakanan"  hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                                <v-row>
                                <v-col>SIDE DISH</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPenjualan" :items="lapPenjualanSideDish" hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                                <v-row>
                                <v-col>MINUMAN</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPenjualan" :items="lapPenjualanMinuman" hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                                
                                <v-row>
                                    <p class="titleDate ">Printed {{printedDate}}</p>
                                </v-row>
                                <v-row>
                                    <p class="titleCashier ">Printed by {{cashier}}</p>
                                </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogPenjualanItem=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLPenjItem">
                        Cetak
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

      

        <v-dialog v-model="dialogPengeluaranTahunan" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5">
                    <div id="printPengTahunan" style="width: 800.28px; color: black; background: white;">
                         <v-container  class="pa-4 mt-9"
                             justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                   <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                     <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                 <h-1 class="titleLap font-weight-bold">LAPORAN PENGELUARAN TAHUNAN</h-1>
                            </v-row>
                              <v-row>
                                <v-col>Tahun : {{tahunAwalKeluar}} s/d {{tahunAkhirKeluar}}</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPengPertahun" :items="lapPengeluaranTahunan" hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             
                              <v-row>
                                  <p class="titleDate ">Printed {{printedDate}}</p>
                             </v-row>
                             <v-row>
                                  <p class="titleCashier ">Printed by {{cashier}}</p>
                             </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogPengeluaranTahunan=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLPengTahunan">
                        Cetak
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="dialogPengeluaran" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5 ">
                    <div id="printPengBulanan" style="width: 800.28px;color: black;background: white;">
                          <v-container  class="pa-4 mt-9"
                             justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                   <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                     <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                 <h-1 class="titleLap font-weight-bold">LAPORAN PENGELUARAN BULANAN</h-1>
                            </v-row>
                              <v-row>
                                <v-col>Tahun : {{tahunKeluar}}</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPeng" :items="lapPengeluaranBulanan" hide-default-footer disable-pagination>

                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             
                              <v-row>
                                  <p class="titleDate ">Printed {{printedDate}}</p>
                             </v-row>
                             <v-row>
                                  <p class="titleCashier ">Printed by {{cashier}}</p>
                             </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogPengeluaran=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLPengBulanan">
                        Cetak
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
<!-- PENDAPATAN -->
        <v-dialog v-model="dialogPendapatanTahunan" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5 ">
                   <div id="printPendTahunan" style="width: 800.28px; color: black;background: white;">
                         <v-container  class="pa-4 mt-9"
                             justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                   <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                     <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                 <h-1 class="titleLap font-weight-bold">LAPORAN PENDAPATAN TAHUNAN</h-1>
                            </v-row>
                              <v-row>
                                <v-col>Tahun : {{tahunAwal}} s/d {{tahunAkhir}}</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPendPertahun" :items="lapPendapatanTahunan" hide-default-footer disable-pagination>
                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             
                              <v-row>
                                  <p class="titleDate ">Printed {{printedDate}}</p>
                             </v-row>
                             <v-row>
                                  <p class="titleCashier ">Printed by {{cashier}}</p>
                             </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogPendapatanTahunan=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLPendTahunan">
                        Cetak
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="dialogPendapatan" persistent max-width="850px">
            <v-card>
                <v-card-title class="justify-center red darken-4">
                    <span class="headline font-weight-bold white--text">Cetak Laporan</span>
                </v-card-title>
                <v-card-text class="pt-5">
                   <div id="printPendBulanan" style="width: 800.28px;color: black;background: white;">
                         <v-container  class="pa-4 mt-9"
                             justify="center" align="center" content="center">
                            <v-row>
                                <v-col>
                                    <img src="..\..\assets\akb.png" alt="gambar Akb" class="qr-align-gambar"  width="200px" height="150px">
                                </v-col>
                                <v-col class="titleText">
                                   <v-row>
                                        <h-1 class="titleAtma font-weight-bold">ATMA KOREAN BBQ</h-1>
                                    </v-row>
                                     <v-row>
                                        <p class="titleFun ">Fun Place to Grill!</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleAlamat ">Jl Babarsari No. 43 Yogyakarta 552181</p>
                                    </v-row>
                                      <v-row>
                                        <p class="titleTelp ">Telp. (0274) 487711</p>
                                    </v-row>
                                    <v-row>
                                        <p class="titlePost ">http://www.atmakb.xyz</p>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                            <v-row>
                                 <h-1 class="titleLap font-weight-bold">LAPORAN PENDAPATAN BULANAN</h-1>
                            </v-row>
                              <v-row>
                                <v-col>Tahun : {{tahun}}</v-col>
                            </v-row>
                            <v-row>
                                <v-data-table class="pa-2 mx-2"  :headers="headersPend" :items="lapPendapatanBulanan" hide-default-footer disable-pagination>

                            </v-data-table>
                            </v-row>
                            <v-row>---------------------------------------------------------------------------------------------------------------------------------------------------------</v-row>
                             
                              <v-row>
                                  <p class="titleDate ">Printed {{printedDate}}</p>
                             </v-row>
                             <v-row>
                                  <p class="titleCashier ">Printed by {{cashier}}</p>
                             </v-row>
                        </v-container>
                    </div>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="blue darken-1" rounded text @click="dialogPendapatan=false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-4" text rounded @click="generateLPendBulanan">
                        Cetak
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
    // import VueHtml2pdf from 'vue-html2pdf'
    import html2PDF from 'jspdf-html2canvas';
    export default {
        name:"Bahan",
        data(){
            return{
                inputType: 'Tambah',
                   menu2: false,
                   menu:false,
                load: false,
                snackbar: false,
                error_message:'',
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                dialogPendapatan:false,
                dialogPendapatanTahunan:false,
                dialogPengeluaran:false,
                dialogPengeluaranTahunan:false,
                dialogPenjualanItem:false,
                dialogStokCustom:false,
                dialogStokPerItem:false,
                valid: false,
                tipeRules:[
                    (v) => !!v || 'Data tidak boleh kosong ',
                ],
                satuanRules:[
                    (v) => !!v || 'Satuan tidak boleh kosong ',
                ],
                headersStokCustom:[
                    {text:"No", value:"No"},
                    {
                        text:"Item Menu",
                        value: "Item_Menu",
                    },
                     {text:""},
                    {text:"Satuan", value:"Satuan"},
                     {text:""},
                    {text:"Incoming Stock", value:"Incoming_Stok"},
                     {text:""},
                    {text:"Remaining Stock", value:"Remaining_Stok"},
                     {text:""},
                    {text:"Waste Stock", value:"Waste_Stok"},
                ],
                headersStokPerItem:[
                    {text:"No", value:"No"},
                    {
                        text:"Tanggal",
                        value: "Tanggal",
                    },
                    {text:"Satuan", value:"Satuan"},
                    {text:""},
                    {text:"Incoming Stock", value:"Incoming_Stok"},
                    {text:"Remaining Stock", value:"Remaining_Stok"},
                    {text:"Waste Stock", value:"Waste_Stok"},
                ],
                headersPenjualan:[
                    {text:"No", value:"No"},
                    {
                        text:"Item Menu",
                        value: "Item_Menu",
                    },
                     {text:""},
                    {text:"Unit", value:"Unit"},
                     {text:""},
                    {text:"Penjualan Harian Tertinggi", value:"Penjualan_Tertinggi"},
                     {text:""},
                    {text:"Total Penjualan", value:"Total_Penjualan"},
                     {text:""},
                ],
                 headersPeng:[
                    {text:"No", value:"No"},
                    {
                        text:"Bulan",
                        align: "start",
                        sortable: true,
                        value: "Bulan",
                    },
                    {text:"Makanan", value:"Makanan"},
                          {text:""},
                    {text:"Side Dish", value:"Sidedish"},
                          {text:""},
                    {text:"Minuman", value:"Minuman"},
                          {text:""},
                    {text:"Total Pengeluaran", value:"Total Pengeluaran"},
                ],
                  headersPengPertahun:[
                    {text:"No", value:"No"},
                    {
                        text:"Tahun",
                        align: "start",
                        sortable: true,
                        value: "Tahun",
                    },
                    {text:"Makanan", value:"Makanan"},
                          {text:""},
                    {text:"Side Dish", value:"Sidedish"},
                          {text:""},
                    {text:"Minuman", value:"Minuman"},
                          {text:""},
                    {text:"Total Pengeluaran", value:"Total"},
                ],
                headersPend:[
                    {text:"No", value:"No"},
                    {
                        text:"Bulan",
                        align: "start",
                        sortable: true,
                        value: "Bulan",
                    },
                    {text:"Makanan", value:"Makanan"},
                          {text:""},
                    {text:"Side Dish", value:"Sidedish"},
                          {text:""},
                    {text:"Minuman", value:"Minuman"},
                          {text:""},
                    {text:"Total Pendapatan", value:"Total"},
                ],
                  headersPendPertahun:[
                    {text:"No", value:"No"},
                    {
                        text:"Tahun",
                        align: "start",
                        sortable: true,
                        value: "Tahun",
                    },
                    {text:"Makanan", value:"Makanan"},
                          {text:""},
                    {text:"Side Dish", value:"Sidedish"},
                          {text:""},
                    {text:"Minuman", value:"Minuman"},
                          {text:""},
                    {text:"Total Pendapatan", value:"Total"},
                ],
                sBulan:[
                    {id:"00",Bulan:"Semua"},
                    {id:"01",Bulan:"Januari"},
                    {id:"02",Bulan:"Februari"},
                    {id:"03",Bulan:"Maret"},
                    {id:"04",Bulan:"April"},
                    {id:"05",Bulan:"Mei"},
                    {id:"06",Bulan:"Juni"},
                    {id:"07",Bulan:"Juli"},
                    {id:"08",Bulan:"Agustus"},
                    {id:"09",Bulan:"September"},
                    {id:"10",Bulan:"Oktober"},
                    {id:"11",Bulan:"November"},
                    {id:"12",Bulan:"Desember"}
                ],
                sBulanStok:[
                    {id:"01",Bulan:"Januari"},
                    {id:"02",Bulan:"Februari"},
                    {id:"03",Bulan:"Maret"},
                    {id:"04",Bulan:"April"},
                    {id:"05",Bulan:"Mei"},
                    {id:"06",Bulan:"Juni"},
                    {id:"07",Bulan:"Juli"},
                    {id:"08",Bulan:"Agustus"},
                    {id:"09",Bulan:"September"},
                    {id:"10",Bulan:"Oktober"},
                    {id:"11",Bulan:"November"},
                    {id:"12",Bulan:"Desember"}
                ],
                sTahun:[],
                sMenu:[],
                sTahunPenjualan:[],
                sTahunKeluar:[],
                lapPendapatanBulanan:[],
                lapPendapatanTahunan:[],
                lapPengeluaranBulanan:[],
                lapPengeluaranTahunan:[],
                lapPenjualanMakanan:[],
                lapPenjualanSideDish:[],
                lapPenjualanMinuman:[],
                lapStokCustomMakanan:[],
                lapStokCustomMinuman:[],
                lapStokCustomSidedish:[],
                lapStokPerItem:[],
                form:{
                    nama_bahan: '',
                    stok: '',
                    satuan: '',
                    tipe_bahan: '',
                    status_hapus:0,
                },
                deleteId: '',
                editId: '',
                tahunKeluar:'',
                tahunPenjualan:'',
                bulanPenjualan:'',
                tahunAwalKeluar:'',
                tahunAkhirKeluar:'',
                tahun:'',
                tahunAwal:'',
                tahunAkhir:'',
                printedDate:'',
                cashier:'',
                tanggalfix:'',
                namaBulan:'',
                tglAwal:'',
                tglAkhir:'',
                bulanStok:'',
                namaBulanStok:'',
                tahunStok:'',
                nama_menu:'',
                tanggalAwal:'',
                tanggalAkhir:'',
            };
        }, 
        components: {
            // VueHtml2pdf,
            
            
        },
        methods: {
            printPendBulanan(){
                let print = document.getElementById("printPendBulanan");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                    },
                    output:'Pendapatan Bulanan'
                });
            },
            printPendTahunan(){
                let print = document.getElementById("printPendTahunan");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                    },
                    output:'Pendapatan Tahunan'
                });
            },
             printPengBulanan(){
                let print = document.getElementById("printPengBulanan");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                       scrollY: 0,
                    },
                    output:'Pengeluaran Bulanan'
                });
            },
            printPengTahunan(){
                let print = document.getElementById("printPengTahunan");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                    },
                    output:'Pengeluaran Tahunan'
                });
            },
            printPenjItem(){
                let print = document.getElementById("printItemPenjualan");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                        //  height: window.outerHeight + window.innerHeight,
                        //  windowHeight: window.outerHeight + window.innerHeight
                    },
                    output:'Penjualan Item Menu'
                });
            },
            printStokCustom(){
                let print = document.getElementById("printStokCustom");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                        //  height: window.outerHeight + window.innerHeight,
                        //  windowHeight: window.outerHeight + window.innerHeight
                    },
                    output:'Laporan Stok Custom'
                });
            },
            printStokPerItem(){
                let print = document.getElementById("printStokPerItem");
                html2PDF(print,{
                    jsPDF:{format: "a4",},
                    html2canvas:{
                        scrollX: 0,
                        scrollY: 0,
                      },
                    output:'Laporan Stok Per Item'
                });
            },
            //STOK PER ITEM
             generateLStokPerItem () {
                this.printStokPerItem();
                this.dialogStokPerItem=false;
            },
            setFormStokPerItem(){
               if(this.$refs.formStokPerItem.validate()){
                    this.tanggalfix = this.tahunStok+'-'+this.bulanStok+'-12'
                    if(this.bulanStok=='01'){
                        this.namaBulanStok ='Januari'
                    }else if(this.bulanStok=='02'){
                        this.namaBulanStok ='Februari'
                    }else if(this.bulanStok=='03'){
                        this.namaBulanStok ='Maret'
                    }else if(this.bulanStok=='04'){
                        this.namaBulanStok ='April'
                    }else if(this.bulanStok=='05'){
                        this.namaBulanStok ='Mei'
                    }else if(this.bulanStok=='06'){
                        this.namaBulanStok ='Juni'
                    }else if(this.bulanStok=='07'){
                        this.namaBulanStok ='Juli'
                    }else if(this.bulanStok=='08'){
                        this.namaBulanStok ='Agustus'
                    }else if(this.bulanStok=='09'){
                        this.namaBulanStok ='September'
                    }else if(this.bulanStok=='10'){
                        this.namaBulanStok ='Oktober'
                    }else if(this.bulanStok=='11'){
                        this.namaBulanStok ='November'
                    }else if(this.bulanStok=='12'){
                        this.namaBulanStok ='Desember'
                    }
                    this.readStokPerItem();
                    this.printedDate = Date().toString().slice(0,25)
                    this.cashier = localStorage.getItem('nama');
                    this.dialogStokPerItem = true;
                   
               }
            },
            //read data bahan
             readStokPerItem(){
                var url = this.$api + '/laporanstokperbulan/'+this.tanggalfix+'/'+this.nama_menu
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapStokPerItem = response.data.data1
                })
            },
            //STOK BAHAN CUSTOM
             generateLStokCustom () {
                this.printStokCustom();
                this.dialogStokCustom=false;
            },
            setFormStokCustom(){
               if(this.$refs.formStokCustom.validate()){
                   if(this.tanggalAwal>this.tanggalAkhir){
                       this.error_message= 'Tanggal Akhir harus lebih dari Tanggal Awal';
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                   }
                   else{
                       this.readStokCustom();
                       this.printedDate = Date().toString().slice(0,25)
                       this.cashier = localStorage.getItem('nama');
                       this.dialogStokCustom = true;
                   }
               }
            },
            //read data bahan
             readStokCustom(){
                var url = this.$api + '/laporanstok/'+this.tanggalAwal+'/'+this.tanggalAkhir
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapStokCustomMakanan = response.data.data1
                    this.lapStokCustomSidedish = response.data.data2
                    this.lapStokCustomMinuman = response.data.data3
                })
            },
            //PenjualanITEM
             generateLPenjItem () {
                this.printPenjItem();
                this.dialogPenjualanItem=false;
            },
            setFormPenjualanItem(){
               if(this.$refs.formPenjualanItem.validate()){
                   if(this.bulanPenjualan=='00'){
                       this.namaBulan='Semua';
                       this.tanggalfix = this.tahunPenjualan+'-01'+'-12'
                       this.readDataPenjualanItemPertahun();
                   }else{
                        this.tanggalfix = this.tahunPenjualan+'-'+this.bulanPenjualan+'-12'
                        if(this.bulanPenjualan=='01'){
                            this.namaBulan ='Januari'
                        }else if(this.bulanPenjualan=='02'){
                             this.namaBulan ='Februari'
                        }else if(this.bulanPenjualan=='03'){
                             this.namaBulan ='Maret'
                         }else if(this.bulanPenjualan=='04'){
                             this.namaBulan ='April'
                         }else if(this.bulanPenjualan=='05'){
                             this.namaBulan ='Mei'
                         }else if(this.bulanPenjualan=='06'){
                             this.namaBulan ='Juni'
                         }else if(this.bulanPenjualan=='07'){
                             this.namaBulan ='Juli'
                         }else if(this.bulanPenjualan=='08'){
                             this.namaBulan ='Agustus'
                         }else if(this.bulanPenjualan=='09'){
                             this.namaBulan ='September'
                         }else if(this.bulanPenjualan=='10'){
                             this.namaBulan ='Oktober'
                         }else if(this.bulanPenjualan=='11'){
                             this.namaBulan ='November'
                         }else if(this.bulanPenjualan=='12'){
                             this.namaBulan ='Desember'
                        }
                        this.readDataPenjualanItem();
                   }
                       this.printedDate = Date().toString().slice(0,25)
                       this.cashier = localStorage.getItem('nama');
                       this.dialogPenjualanItem = true;
               }
            },
            //read data bahan
             readDataPenjualanItemPertahun(){
                var url = this.$api + '/lappenjualanpertahun/'+this.tanggalfix
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapPenjualanMakanan = response.data.data1
                    this.lapPenjualanSideDish = response.data.data2
                    this.lapPenjualanMinuman = response.data.data3
                })
            },
              readDataPenjualanItem(){
                var url = this.$api + '/lappenjualan/'+this.tanggalfix
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapPenjualanMakanan = response.data.data1
                    this.lapPenjualanSideDish = response.data.data2
                    this.lapPenjualanMinuman = response.data.data3
                })
            },
            //PENGELUARAN
             generateLPengBulanan () {
                this.printPengBulanan();
                this.dialogPengeluaran=false;
            },
            setFormPengeluaranBulanan(){
               if(this.$refs.formPengeluaranBulanan.validate()){
                   this.readPengeluaranBulan();
                   this.printedDate = Date().toString().slice(0,25)
                   this.cashier = localStorage.getItem('nama');
                   this.dialogPengeluaran = true;
               }
            },
            //read data bahan
             readPengeluaranBulan(){
                var url = this.$api + '/pengperbulan/'+this.tahunKeluar
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapPengeluaranBulanan = response.data.data
                })
            },
            //Pendapatan TAHUNAN
             generateLPengTahunan () {
                this.printPengTahunan();
                this.dialogPengeluaranTahunan=false;
            },
            setFormPengeluaranTahunan(){
               if(this.$refs.formPengeluaranTahunan.validate()){
                    if(parseInt(this.tahunAkhirKeluar)<parseInt(this.tahunAwalKeluar)){
                        this.error_message= 'Tahun Akhir harus lebih dari Tahun Awal';
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                   }else{
                       this.readPengeluaranTahunan();
                       this.printedDate = Date().toString().slice(0,25)
                       this.cashier = localStorage.getItem('nama');
                       this.dialogPengeluaranTahunan = true;
                   }
               }
            },
            readPengeluaranTahunan(){
                var url = this.$api + '/pengpertahun/'+this.tahunAwalKeluar+'/'+this.tahunAkhirKeluar
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapPengeluaranTahunan = response.data.data
                })
            },
            //PENDAPATAN
            generateLPendBulanan () {
                this.printPendBulanan();
                this.dialogPendapatan=false;
            },
            setFormPendapatanBulanan(){
               if(this.$refs.formPendapatanBulanan.validate()){
                   this.readPendapatanBulan();
                   this.printedDate = Date().toString().slice(0,25)
                   this.cashier = localStorage.getItem('nama');
                   this.dialogPendapatan = true;
               }
            },
            //read data bahan
             readPendapatanBulan(){
                var url = this.$api + '/pendperbulan/'+this.tahun
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapPendapatanBulanan = response.data.data
                })
            },
            //Pendapatan TAHUNAN
             generateLPendTahunan () {
                this.printPendTahunan();
                this.dialogPendapatanTahunan=false;
            },
            setFormPendapatanTahunan(){
               if(this.$refs.formPendapatanTahunan.validate()){
                    if(parseInt(this.tahunAkhir)<parseInt(this.tahunAwal)){
                        this.error_message= 'Tahun Akhir harus lebih dari Tahun Awal';
                        this.color="red"
                        this.snackbar=true;
                        this.load = false;
                   }else{
                       this.readPendapatanTahunan();
                       this.printedDate = Date().toString().slice(0,25)
                       this.cashier = localStorage.getItem('nama');
                       this.dialogPendapatanTahunan = true;
                   }
               }
            },
            //read data bahan
             readPendapatanTahunan(){
                var url = this.$api + '/pendpertahun/'+this.tahunAwal+'/'+this.tahunAkhir
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.lapPendapatanTahunan = response.data.data
                })
            },
            readDataMenu(){
                var url = this.$api + '/getnamamenu'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.sMenu = response.data.data
                })
            },
            readDataTahun(){
                var url = this.$api + '/gettahun'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.sTahun = response.data.data
                })
            },
            readDataTahunKeluar(){
                var url = this.$api + '/gettahunkeluar'
                this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response =>{
                    this.sTahunKeluar = response.data.data
                    this.sTahunPenjualan = response.data.data
                })
            },
        },
        computed: {
            formTitle(){
                return this.inputType
            },
        },
        mounted(){
            this.readDataTahun();
            this.readDataTahunKeluar();
            this.readDataMenu();
        },
    };
</script>

<style scoped>
    .titleAtma{
            margin-top: 20px;
            font-size: 32px;
            color:#0D47A1;
    }
    .titleFun{
            margin-top: 10px;
            margin-left: 100px;
            font-size: 16px;
            color:#B71C1C;
    }
     .titleTelp{
            margin-top: 10px;
            margin-left: 97px;
            font-size: 16px;
    }
    .titleLap{
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
    }
    .titleDate{
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
    }
    .titleCashier{
         margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
    }
    .titleAlamat{
            margin-top: 10px;
            margin-left:25px;
            font-size: 16px;
    }
    .titlePost{
            margin-top: auto;
          margin-left: 90px;
            font-size: 16px;
    }
    .textThanks{
        margin-left: auto;
        margin-right: auto;
    }
</style>
