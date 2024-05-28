<template>
  <div class="relative z-10 max-w-screen mx-auto p-4 scrollable-content">
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
    
    <!-- Goodies Section -->
    <h2 class="text-xl font-bold mt-4">Goodies</h2>
    <div v-if="goodies.length" class="grid grid-cols-1 gap-4 mt-2">
      <div v-for="goodie in goodies" :key="goodie.id" class="p-4 border rounded shadow-sm">
        <h3 class="text-lg font-semibold">{{ goodie.nom }}</h3>
        <p class="text-md">{{ goodie.prix }} €</p>
      </div>
    </div>
    <p v-else class="text-lg mt-2">No goodies available.</p>

    <!-- Mobile Homes Section -->
    <h2 class="text-xl font-bold mt-4">Mobile Homes</h2>
    <div v-if="mobileHomes.length" class="grid grid-cols-1 gap-4 mt-2">
      <div v-for="mobileHome in mobileHomes" :key="mobileHome.id" class="p-4 border rounded shadow-sm">
        <h3 class="text-lg font-semibold">{{ mobileHome.nom }}</h3>
        <p class="text-md">{{ mobileHome.description }}</p>
      </div>
    </div>
    <p v-else class="text-lg mt-2">No mobile homes available.</p>

    <!-- Activities Section -->
    <h2 class="text-xl font-bold mt-4">Activities</h2>
    <div v-if="activities.length" class="grid grid-cols-1 gap-4 mt-2">
      <div v-for="activity in activities" :key="activity.id" class="p-4 border rounded shadow-sm">
        <h3 class="text-lg font-semibold">{{ activity.nom }}</h3>
        <p class="text-md">{{ activity.description }}</p>
        <p class="text-md">{{ activity.prix }} €</p>
      </div>
    </div>
    <p v-else class="text-lg mt-2">No activities available.</p>

    <!-- Animations Section -->
    <h2 class="text-xl font-bold mt-4">Animations</h2>
    <div v-if="animations.length" class="grid grid-cols-1 gap-4 mt-2">
      <div v-for="animation in animations" :key="animation.id" class="p-4 border rounded shadow-sm">
        <h3 class="text-lg font-semibold">{{ animation.nom }}</h3>
        <p class="text-md">{{ animation.description }}</p>
        <p class="text-md">Scheduled at: {{ new Date(animation.schedule).toLocaleString() }}</p>
      </div>
    </div>
    <p v-else class="text-lg mt-2">No animations available.</p>

    <!-- Services Section -->
    <h2 class="text-xl font-bold mt-4">Services</h2>
    <div v-if="services.length" class="grid grid-cols-1 gap-4 mt-2">
      <div v-for="service in services" :key="service.id" class="p-4 border rounded shadow-sm">
        <h3 class="text-lg font-semibold">{{ service.nom }}</h3>
        <p class="text-md">{{ service.description }}</p>
        <p class="text-md">{{ service.prix }} €</p>
      </div>
    </div>
    <p v-else class="text-lg mt-2">No services available.</p>
  </div>
</template>




<script setup>
import { ref, onMounted } from 'vue';


const restaurantname = ref('');
const client = useSupabaseAuthClient();
const loading = ref(false);
const goodies = ref([]);
const mobileHomes = ref([]);
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const activities = ref([]);
const animations = ref([]);
const services = ref([]);

const fetchGoodies = async () => {
  try {
    
let { data: Goodies, error } = await supabase
  .from('goodies')
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

const fetchMobileHomes = async () => {
  try {
    const { data: MobileHomes, error } = await supabase
      .from('Mobilehome')
      .select('*')
      .eq('uuid', user.value.id);
    
    if (error) {
      console.error('Error fetching mobile homes:', error);
    } else {
      mobileHomes.value = MobileHomes || [];
    }
  } catch (err) {
    console.error('Unexpected error fetching mobile homes:', err);
  }
};

// Fetch activities
const fetchActivities = async () => {
  try {
    const { data: Activities, error } = await supabase
      .from('activities')
      .select('*');
    
    if (error) {
      console.error('Error fetching activities:', error);
    } else {
      activities.value = Activities;
    }
  } catch (err) {
    console.error('Unexpected error fetching activities:', err);
  }
};

// Fetch animations
const fetchAnimations = async () => {
  try {
    const { data: Animations, error } = await supabase
      .from('animations')
      .select('*');
    
    if (error) {
      console.error('Error fetching animations:', error);
    } else {
      animations.value = Animations;
    }
  } catch (err) {
    console.error('Unexpected error fetching animations:', err);
  }
};

// Fetch services
const fetchServices = async () => {
  try {
    const { data: Services, error } = await supabase
      .from('services')
      .select('*');
    
    if (error) {
      console.error('Error fetching services:', error);
    } else {
      services.value = Services;
    }
  } catch (err) {
    console.error('Unexpected error fetching services:', err);
  }
};

onMounted(async () => {
  await fetchGoodies();
  await fetchMobileHomes();
  await fetchActivities();
  await fetchAnimations();
  await fetchServices();
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
.scrollable-content {
    max-height: 500px; /* Définissez la hauteur maximale que vous souhaitez */
    overflow-y: auto; /* Activer le défilement vertical automatique si le contenu dépasse */
  }
</style>


