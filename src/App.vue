<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { computed } from "vue";

const activeTheme = ref("theme-green");

const setActiveTheme = (themeId, color) => {
  document.documentElement.style.setProperty("--text-color", color);
  activeTheme.value = themeId;
  localStorage.setItem("themeColor", color);
  localStorage.setItem("themeId", themeId);
};

onMounted(() => {
  const savedColor = localStorage.getItem("themeColor");
  const savedThemeId = localStorage.getItem("themeId");

  if (savedColor && savedThemeId) {
    document.documentElement.style.setProperty("--text-color", savedColor);
    activeTheme.value = savedThemeId;
  }
});
</script>
<script>
export default {
  provide(){
    return {
      searchWord: computed(() => this.searchWord)
    }
  },
  watch:{
    searchWordInput(data){
      if (!data) {
        this.searchWord = null
      }
      this.searchWord = data;
    }
  },
  data() {
    return {
      searchWord: null,
      searchWordInput: null,
    };
  },
};
</script>

<template>
  <div class="container-fluid p-0">
    <nav class="d-flex justify-content-between align-items-center">
      <ul class="nav justify-content-center mb-4">
        <li>
          <RouterLink
            :to="{ path: '/' }"
            :class="{ active: $route.path === '/' }"
          >
          Home
          </RouterLink>
        </li>

        <li>
          <RouterLink
            :to="{ path: '/table' }"
            :class="{ active: $route.path === '/table' }"
          >
          Table
          </RouterLink>
        </li>

        <li>
          <RouterLink
            :to="{ path: '/cards' }"
            :class="{ active: $route.path === '/cards' }"
          >
          Cards
          </RouterLink>
        </li>

        <div class="theme-options">
        <div
          id="theme-green"
          :class="{ active: activeTheme === 'theme-green' }"
          @click="setActiveTheme('theme-green', '#37b18c')"
        ></div>
        <div
          id="theme-purple"
          :class="{ active: activeTheme === 'theme-purple' }"
          @click="setActiveTheme('theme-purple', '#9326ff')"
        ></div>
        <div
          id="theme-red"
          :class="{ active: activeTheme === 'theme-red' }"
          @click="setActiveTheme('theme-red', '#b14537')"
        ></div>
      </div>
      </ul>

      <div class="d-flex align-items-center pb-3 pe-3" role="search">
        <input v-if="$route.path==='/cards' || $route.path ==='/table'"
          class="form-control ms-2 me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="searchWordInput"
        />
      </div>
    </nav>

    <div class="content-area border rounded p-4">
      <RouterView />
    </div>
  </div>
</template>

<style>

h1, h2, h3, h4, h5 {
    color: var(--text-color);
}

.white {
  color: #fff;
}

.green {
  color: var(--text-color);
  font-weight: 700;
}

nav{
  background: var(--bg-black-100);
  padding-top: 20px;
}

.nav li a {
  font-size: 16px;
  font-weight: 600;
  display: block;
  color: var(--text-black-700);
  padding: 5px 15px;
  text-decoration: none;
  transition: 0.5s;
}

.nav li a:hover {
  color: var(--text-color);
}

.nav li a.active,
.green {
  color: var(--text-color);
  font-weight: 700;
}

.my-bi {
  font-size: 2rem;
  color: var(--text-color);
}

.my-nav-text {
  font-size: 2rem;
  color: var(--text-color);
}

.my-navbar {
  background: var(--bg-black-100) !important;
}

body {
  background: var(--bg-black-50);
  height: 100%;
}

.btn {
  background: transparent;
  border: 1px solid var(--text-color);
  color: #fff;
  font-weight: 700;
  transition: background 0.3s ease, transform 0.3s ease, border 0.3s ease !important;
}

.btn:hover {
  background: var(--text-color);
  transform: scale(1.05);
}

.theme-options {
  position: absolute;
  top: 0;
  left: 200px;
  margin: 10px 20px;
  padding: 20px 0;
}

.theme-options div {
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin: 2px 10px;
  display: inline-block;
  opacity: 0.3;
  padding: 10px;
  transition: all 0.3s;
}

.theme-options div.active {
  opacity: 1;
}

#theme-green {
  background-color: #37b18c;
}

#theme-purple {
  background-color: #9326ff;
}

#theme-red {
  background-color: #b14537;
}

@media only screen and (max-width: 600px) {
  .theme-options {
    position: relative;
    margin: 0;
  }
}
</style>
