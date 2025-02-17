import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        categories: [], // Inicializando como uma array vazia
        baseURL : "http://localhost:8082/",
        products: [],
        cartCount: 0,
        userName: null,
        isLogged: null,
        isAdmin: false,
        token: null,
        admin: [],
    },
    mutations: {
        setCategories(state, categories) {
          state.categories = categories; // Atualizando o estado de categories com os dados recebidos
        },
        async fetchData(state) {
            state.token = localStorage.getItem("token");
            state.userId = localStorage.getItem("userId");
            state.isAdmin = localStorage.getItem("isAdmin");
            this.commit('checkIsLogged');
            // api call to get all the categories

            await axios.get(state.baseURL + "category/list/")
            .then(res =>  {
                state.categories = res.data

            }).catch(err => {console.log(err)});

            // api call to get the products

            await axios.get(state.baseURL + "product/list/")
            .then(res =>  {
                state.products = res.data
            }).catch(err => {console.log(err)});


            await axios.get(state.baseURL + "user/getadmin/")
            .then(res =>  {
                state.admin = res.data
            }).catch(err => {console.log(err)});

            // fetch cart item if token is present i.e logged in
            if (state.token) {
                axios
                .get(`${state.baseURL}cart/get/?token=${state.token}`)
                .then(res => {
                    const result = res.data;
                    //this.cartCount = result.cartItems.length;
                    state.cartCount = 0;
                    for (const item of result.cartItems) {
                        state.cartCount += item.quantity;
                    }
                })
                .catch((err) => console.log("err", err));

            }
            },
            resetCartCount(state) {
            console.log("resetCartCount: resetando carrinho para 0");
            state.cartCount = 0;
            state.token = localStorage.getItem("token");
            state.isAdmin = false;
            },
            checkIsLogged(state) {
            console.log("checkIsLogged test");
            state.token = localStorage.getItem("token");
            if(state.token) {
                state.isLogged = true;
                console.log("aaaaaaaaa");
                state.userId = localStorage.getItem("userId");
                if (state.userId) {
                axios
                .get(state.baseURL + `user/${state.userId}`)
                .then(res =>  {
                    const result = res.data;
                    state.userName = result.name.split(' ')[0];
                    console.log(res);

                    if (result.email.split('@')[0] === "admin") {
                    localStorage.setItem("isAdmin", true);
                    state.isAdmin = true;
                    } else {
                    localStorage.setItem("isAdmin", false);
                    state.isAdmin = false;
                    }
                    

                }).catch(err => {console.log(err)});
                }

            } else {
                state.isLogged = false;
                state.userName = null;
            }
        }
    },
    actions: {
        // Defina suas actions aqui
    },
    modules: {
        // Se você tiver módulos Vuex, defina-os aqui
    }
});

export default store;
