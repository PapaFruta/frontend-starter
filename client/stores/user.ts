import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";

import { BodyT, fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUsername = ref("");
    const {getRecentStatus} = useAuthStore();

    const isLoggedIn = computed(() => currentUsername.value !== "");

    const resetStore = () => {
      currentUsername.value = "";
    };

    const createUser = async (username: string, password: string, firstname: string, lastname : string, profilePic : string) => {
      await fetchy("api/users", "POST", {
        body: { username, password, first:firstname, last:lastname, profilePic:profilePic},
      });
    };

    const loginUser = async (username: string, password: string) => {
      await fetchy("api/login", "POST", {
        body: { username, password },
      });
    };

    const updateSession = async () => {
      try {
        const { username } = await fetchy("api/session", "GET", { alert: false });
        currentUsername.value = username;
        await getRecentStatus();
      } catch {
        currentUsername.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("api/logout", "POST");
      resetStore();
    };

    const updateUser = async (patch: BodyT) => {
      await fetchy("api/users", "PATCH", { body: { update: patch } });
    };

    const deleteUser = async () => {
      await fetchy("api/users", "DELETE");
      resetStore();
    };

    return {
      currentUsername,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUser,
      deleteUser,
    };
  },
  { persist: true },
);
