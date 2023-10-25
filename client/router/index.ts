import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import { useAuthStore } from "../stores/auth";
import AuthenticationView from "../views/AuthenticationView.vue";
import ChatView from "../views/ChatView.vue";
import FriendView from "../views/FriendView.vue";
import HangoutView from "../views/HangoutView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NeedAuthView from "../views/NeedAuthView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import PostView from "../views/PostView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:"/needAuth",
      name:"Please Authenticate",
      component: NeedAuthView
    },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/authentication",
      name: "Authentication",
      component: AuthenticationView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/friend",
      name: "Friend",
      component: FriendView,
      meta: { requiresAuth: true, requiredID: true},
    },
    {
      path: "/chat",
      name: "Chat",
      component: ChatView,
      meta: { requiresAuth: true, requiredID: true},
    },
    {
      path: "/post",
      name: "Post",
      component: PostView,
      meta: { requiresAuth: true, requiredID: true },
    },
    {
      path: "/hangout",
      name: "Hangout",
      component: HangoutView,
      meta: { requiresAuth: true, requiredID: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }

  if (to.meta.requiredID && !authStore.currentAuthStatus) {
    return { name: "Please Authenticate" }; // Redirect to the authentication required view.
  }
});

export default router;
