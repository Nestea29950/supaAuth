<template>
  <div class="relative z-10 max-w-screen-sm mx-auto p-4">
    <p v-if="user" class="text-lg">Bonjour {{ user.user_metadata?.first_name }}</p>
    <p v-else class="text-lg">unauthenticated</p>
    <h1 class="text-2xl font-bold my-4">FunParadis</h1>
    
    <div v-if="user" class="mb-4">
      <button @click="logout" class="btn" :disabled="loading">
        <span :class="{loading: loading}">
          Log out
        </span>
      </button>
      <input type="text" placeholder="Grand mobile home noir" v-model="restaurantname" class="input mt-2">
      <button @click="test" class="btn mt-2">
        Exemple de function en cloud pour créer un mobile home
      </button>
    </div>
    <div v-else>
      <NuxtLink class="btn" to="/login">Login</NuxtLink>
      <NuxtLink to="/register">
        <button class="btn">Sign up</button>
      </NuxtLink>
    </div>
    <div v-if="goodies.length" class="grid grid-cols-1 gap-4 mt-4">
      <div v-for="goodie in goodies" :key="goodie.id" class="p-4 border rounded shadow-sm">
        <h2 class="text-xl font-semibold">{{ goodie.nom }}</h2>
        <p class="text-lg">{{ goodie.prix }} €</p>
      </div>
    </div>
    <p v-else class="text-lg mt-4">No goodies available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const restaurantname = ref('');
const client = useSupabaseAuthClient();
const loading = ref(false);
const goodies = ref([]);
const supabase = useSupabaseClient();
const user = useSupabaseUser();


const fetchGoodies = async () => {
  try {
    
let { data: Goodies, error } = await supabase
  .from('Goodies')
  .select('*')
          

    if (error) {
      console.error('Error fetching goodies:', error);
    } else {
      console.log('ezaezaeza' + Goodies)
      goodies.value = Goodies;
    }
  } catch (err) {
    console.error('Unexpected error fetching goodies:', err);
  }
};

onMounted( async () => {
  fetchGoodies();
  

});

const logout = async () => {
  loading.value = true;
  const { error } = await client.auth.signOut();
  if (error) {
    loading.value = false;
    return alert('Something went wrong!');
  }
  loading.value = false;
};

const test = async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: restaurantname.value }),
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

<style>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
.btn:disabled {
  @apply bg-gray-500;
}
.input {
  @apply px-4 py-2 border rounded w-full;
}
</style>
