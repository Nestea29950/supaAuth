<template>
  <div class="relative z-10 max-w-screen-sm">
    <p v-if="user" class="fVeafc in">Bonjour {{ user.user_metadata?.first_name }}</p>
    <p v-else class="fVeafc">unauthenticated</p>
    <h1 class="kKxhrq">
      Nuxt3 + Supabase
      
    </h1>
    <p class="kRTmDC">
      Cloud Controle </p>
    <div class="uQxNj" v-if="user">
      <button @click="logout" class="ieMfVH" :disabled="loading">
        <span class="fKlELC" :class="{loading: loading}">
          Log out
        </span>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="jjoFVh" :class="{loading: loading}">
          <g fill="none" stroke-width="1.5" stroke-linecap="round" class="faEWLr" style="stroke: var(--icon-color);">
            <circle stroke-opacity=".2" cx="8" cy="8" r="6"></circle>
            <circle cx="8" cy="8" r="6" class="VFMrX"></circle>
          </g>
        </svg>
      </button>
      <input type="text" ref="" placeholder="Restaurant Name" v-model="restaurantname">
      <button @click="test" class="ieMfVH">
        Démarrer la function
      </button>
    </div>
    <div class="uQxNj" v-else>
      <NuxtLink class="bQRHNT" to="/login">
        <span class="fKlELC">
          Login 
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="taKtSf">
            <path class="chevron" d="M8 13L13 8L8 3" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
            <path class="stem" d="M12 8L2 8" stroke-width="1.5"></path>
          </svg>
        </span>
      </NuxtLink>
      <NuxtLink to="/register">
        <button class="ieMfVH">
          <span class="fKlELC">
            Sign up
          </span>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const restaurantname = ref('NomDuRestaurant');
const client = useSupabaseAuthClient();
const user = useSupabaseUser();
const loading = ref(false);

const logout = async () => {
  loading.value = true;
  const { error } = await client.auth.signOut();
  if (error) {
    loading.value = false;
    return alert('Something went wrong !');
  }
};

const test = async () => {
   const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: restaurantname.value
    }),
    redirect: 'follow'
  };

  try {
    const response = await fetch('https://vcunoktdyspfhjehyyyq.supabase.co/functions/v1/hello-world', requestOptions);
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

