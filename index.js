import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddCategory from '../views/Category/AddCategory.vue'
import Category from '../views/Category/Category.vue'
import Admin from '../views/Admin.vue'
import Product from '../views/Product/Product.vue'
import AllProducts from '../views/Product/AllProducts.vue'
import AddProduct from '../views/Product/AddProduct.vue'
import EditCategory from '../views/Category/EditCategory.vue'
import EditProduct from '../views/Product/EditProduct.vue'
import ShowDetails from '../views/Product/ShowDetails.vue'
import ListProducts from '../views/Category/ListProducts.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Wishlist from '../views/Product/Wishlist.vue'
import Cart from '../views/Product/Cart.vue'
import UserDetails from '../views/user/UserDetails.vue'
import Review from '../views/Product/Review.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAdmin: false }
  },
  {
    path: '/category/show/:id',
    name: 'ListProducts',
    component: ListProducts,
    meta: { requiresAdmin: false }
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/category',
    name: 'Category',
    component: Category,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/product',
    name: 'AdminProduct',
    component: Product,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/product/new',
    name: 'AddProduct',
    component: AddProduct,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/category/edit/:id',
    name: 'EditCategory',
    component: EditCategory,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/product/edit/:id',
    name: 'EditProduct',
    component: EditProduct,
    meta: { requiresAdmin: true }
  },
  {
    path: '/product/show/:id',
    name: 'ShowDetails',
    component: ShowDetails,
    meta: { requiresAdmin: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresAdmin: false }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: { requiresAdmin: false }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { requiresAdmin: false }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAdmin: false }
  },
  {
    path: '/allproducts',
    name: 'AllProducts',
    component: AllProducts,
    meta: { requiresAdmin: false }
  },
  {
    path: '/userdetails',
    name: 'UserDetails',
    component: UserDetails,
    meta: { requiresAdmin: false }
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: { requiresAdmin: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router  

// Adicione um guarda de rota para verificar se o usuário é um administrador
router.beforeEach((to, from, next) => {
  // Verifique se a rota requer privilégios de administrador
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // Verifique se o usuário é um administrador (você deve ter um sistema de autenticação implementado)
    if (!isUserAdmin()) {
      // Redirecione para uma página de acesso negado ou página inicial
      next({ path: '/' });
    } else {
      // Continue para a rota
      next();
    }
  } else {
    // Se a rota não requer privilégios de administrador, permita o acesso
    next();
  }
});

// Função para verificar se o usuário é um administrador (isso depende da sua implementação de autenticação)
function isUserAdmin() {

  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin !== null) {
    
    return isAdmin == "true";
  }

  return false;
}
