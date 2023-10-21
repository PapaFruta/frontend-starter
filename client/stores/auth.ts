import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";
import { useUserStore } from "./user";

export const useAuthStore = defineStore(
    "auth",
    () => {
        const currentAuthStatus = ref(false)

        const getRecentStatus = async()=>{
            
            const response = await fetchy("api/vertify", "GET" );
            currentAuthStatus.value = response.isVerified;

            return currentAuthStatus.value;
        }

        return {currentAuthStatus, getRecentStatus}
    },
    { persist: true },
)