import Vue from  'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
    return()=> import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            //example
            path: "/dashboard",
            name: "Dashboard",
            meta: {title: 'Dashboard'},
            component: importComponent('DashboardLayout'),
            children: [
                //Bahan
                {
                    path: "/bahan",
                    name: "Bahan",
                    meta: {title: 'Bahan'},
                    component: importComponent('DataMaster/Bahan')
                },
                {
                    path: "/pelanggan",
                    name: "Pelanggan",
                    meta: {title: 'Pelanggan'},
                    component: importComponent('DataMaster/Pelanggan')
                },
                {
                    path: "/pegawai",
                    name: "Pegawai",
                    meta: {title: 'Pegawai'},
                    component: importComponent('DataMaster/Pegawai')
                },
                {
                    path: "/meja",
                    name: "Meja",
                    meta: {title: 'Meja'},
                    component: importComponent('DataMaster/Meja')
                },
                {
                    path: "/stokmasuk",
                    name: "StokMasuk",
                    meta: {title: 'Stok Masuk'},
                    component: importComponent('Stok/StokMasuk')
                },
                {
                    path: "/reservasi",
                    name: "Reservasi",
                    meta: {title: 'Reservasi'},
                    component: importComponent('Transaksi/Reservasi')
                },
                // To do list
            //     {
            //     path: "/gd",
            //     name: "Guided",
            //     component: importComponent('TodoList/List'),
            //     },
            ]  
        },
        //Login
        {
            path: "/",
            name: "login",
            meta: {title: 'Login'},
            component: importComponent('Login'),
        },
        {
            path: '*',
            redirect: '/',
            meta: {title: 'Login'},
        },

    ]
});

router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    // next()
    if(to.name !=='login' && !localStorage.getItem('token')){
        next({
            path: '/',
            meta: {title: 'Login'},
        })
    }else next()
});

export default router;
