<template>
  <div class="row full-height">
    <!-- Táblázat -->
    <div
      :style="{ height: tableHeight + 'px' }"
      class="table-wrapper table-responsive col-4"
    >
      <table class="table table-striped table-hover my-table">
        <thead>
          <tr>
            <th class="my-table-header" scope="col">Name</th>
            <th class="my-table-header" scope="col">Class</th>
            <th class="my-table-header" scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(champ, i) of this.champions"
            :key="i"
            @click="setSelectedChampion(champ)"
            :class="{ 'selected-champ': champ === selectedChampion }"
          >
            <td class="text-start">
              {{ champ.name }}
            </td>
            <td class="text-start">
              {{ Array.isArray(champ.role) ? champ.role.join(", ") : "N/A" }}
            </td>
            <td class="text-start">{{ champ.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Leírás -->
    <div class="col-8">
      <div class="text-center">
        <h1 class="champ-name-h1">
          {{ this.selectedChampion.name }}
        </h1>
        <p class="champ-name-p">{{ this.selectedChampion.title }}</p>
      </div>
      <div class="d-flex justify-content-center">
        <img
          :src="this.selectedChampion.image"
          class="img-fluid my-img"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { provide } from 'vue'
export default {
  provide(){
    return{
      champions: this.champions
    }
  },
  data() {
    return {
      champions: [],
      selectedChampion: {},
      tableHeight: 0,
    };
  },
  async mounted() {
    await this.getChampions();
    this.selectedChampion = this.champions[0];

    this.calculateTableHeight();
    window.addEventListener("resize", this.calculateTableHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateTableHeight);
  },
  methods: {
    setSelectedChampion(champion) {
      this.selectedChampion = champion;
    },
    async getChampions() {
      try {
        const response = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/hu_HU/champion.json"
        );
        const data = await response.json();
        const champData = data.data;

        this.champions = Object.values(champData).map((champ) => ({
          id: champ.key,
          name: champ.name,
          image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
          role: champ.tags,
          title: champ.title,
        }));
      } catch (error) {
        console.log("Error:", error);
      }
    },

    calculateTableHeight() {
      const windowHeight = window.innerHeight;
      const headerHeight = 128;
      this.tableHeight = windowHeight - headerHeight;
    },
  },
};
</script>

<style>

.selected-champ td {
  color: var(--text-color) !important;
  text-align: center !important;
}
td:hover{
  cursor: pointer;
}

.my-img {
  border-radius: 10px;
  border: 5px solid var(--text-color);
  max-height: 500px;
}

.champ-name-p {
  font-style: italic;
  font-weight: 700;
  font-size: x-large;
  color: var(--bg-black-100);
}

.champ-name-h1 {
  font-size: 4rem;
}

html,
body {
  height: 100%;
  margin: 0;
}

.full-height {
  height: 100%;
}

.text-start {
  text-align: left !important;
}

td {
  color: var(--text-black-700) !important;
}

.table > :not(caption) > * > * {
  background: var(--bg-black-100);
}

.my-table {
  border-radius: 20px;
  overflow: hidden;
  border: var(--text-color);
}

.table-responsive {
  display: flex;
  justify-content: center;
}

.table-wrapper {
  overflow-y: auto;
}

.my-table-header {
  text-align: center;
  color: var(--text-color) !important;
  font-weight: 700;
  font-size: x-large;
}

.my-table-name-span:hover {
  color: var(--text-color);
  transition: 0.3s;
  cursor: pointer;
}
</style>
