<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
    <div class="col" v-for="(champ, i) of filteredChampions" :key="i">
      <div class="card">
        <img :src="champ.image" class="card-img-top" alt="Champion Image" />
        <div class="card-body">
          <h5 class="card-title">{{ champ.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: [
    "searchWord"
  ],
  data() {
    return {
      champions: [],
      
    };
  },
  async mounted() {
    await this.getChampions();
  },
  computed:{
    filteredChampions(){
      if (!this.searchWord) {
        return this.champions;
      }
      return this.champions.filter((c)=> {
        return c.name.toLowerCase().includes(this.searchWord.toLowerCase()) || c.role.some(r => r.toLowerCase().includes(this.searchWord.toLowerCase())) || c.title.toLowerCase().includes(this.searchWord.toLowerCase()) || c.quote.toLowerCase().includes(this.searchWord.toLowerCase()) 
      })
    }
  },    
  methods:{
    keresJelol(text) {
      if (this.searchWord) {
        let what = new RegExp(this.searchWord, "gi");
        if (text) {
          text = text.replace(what, (match) => {
            return `<span class="mark p-0">${match}</span>`;
          });
        }
        return text;
      } else {
        return text;
      }
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
          quote: champ.blurb
        }));
      } catch (error) {
        console.log("Error:", error);
      }
    },
  },
};
</script>

<style>
.mark{
  background-color: lightyellow !important;
}
.card {
  border: 2px solid var(--text-color);
  border-radius: 10px;
  overflow: hidden;
}
.card-img-top {
  height: 200px; /* Állítsd be a megfelelő magasságot */
  object-fit: cover; /* Képarány megőrzése */
}
</style>
