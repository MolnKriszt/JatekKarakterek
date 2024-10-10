<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
    <div class="col" v-for="(champ, i) of filteredChampions" :key="i">
      <Card :id="champ.id">
        <template v-slot:image>
          <img :src="champ.image" class="card-img-top" :alt="champ.name" />
        </template>
        <template v-slot:name>
          <div class="d-flex justify-content-between">
            <h5 class="card-title" v-html="keresJelol(champ.name)"></h5>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn" @click="this.selectedChampion = champ"><i class="bi bi-three-dots"></i></button>
          </div>
        </template>
      </Card>
    </div>
  </div>

  <Modal>
    <template v-slot:name>
      <h1
        class="modal-title fs-5"
        id="exampleModalLabel"
        v-html="keresJelol(this.selectedChampion.name)"
      ></h1>
    </template>

    <template v-slot:image>
      <img :src="this.selectedChampion.image" class="img-fluid my-img" alt="" />
    </template>

    <template v-slot:title>
      <p class="modal-champ-name-p" v-html="keresJelol(this.selectedChampion.title)"></p>
    </template>

    <template v-slot:quote>
      <span v-html="keresJelol(this.selectedChampion.quote)"></span>
    </template>
  </Modal>
</template>

<script>
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
export default {
  components: { Card, Modal },
  inject: ["searchWord"],
  data() {
    return {
      champions: [],
      selectedChampion: {},
    };
  },
  async mounted() {
    await this.getChampions();
  },
  computed: {
    filteredChampions() {
      if (!this.searchWord) {
        return this.champions;
      }
      return this.champions.filter((c) => {
        return (
          c.name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          c.role.some((r) =>
            r.toLowerCase().includes(this.searchWord.toLowerCase())
          ) ||
          c.title.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          c.quote.toLowerCase().includes(this.searchWord.toLowerCase())
        );
      });
    },
  },
  methods: {
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
          quote: champ.blurb,
        }));
      } catch (error) {
        console.log("Error:", error);
      }
    },
  },
};
</script>

<style>
.modal-my-img{
  border-radius: 10px;
  border: 5px solid var(--text-color);
  max-height: 500px;
}

.modal-champ-name-p {
  font-style: italic;
  font-weight: 700;
  font-size: x-large;
  color: var(--text-black-700);
}

.mark {
  background-color: lightyellow !important;
}
</style>
