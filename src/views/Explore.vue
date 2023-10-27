<template>
    <div>
    <h1>Explore</h1>

    <!-- Bootstrap Album Component -->
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <!-- Example card structure -->
          <div class="col" v-for="item in items" :key="item.id">
            <div class="card mb-4 box-shadow">
              <img
                class="card-img-top"
                :src="item.imageUrl"
                alt="Card image cap"
              />
              <div class="card-body">
                <p class="card-text">{{ item.name }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Like</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Poke Bowl',
          imageUrl: '../assets/pokebowl.jpg',
        },
        {
          id: 2,
          name: 'Card 2',
          imageUrl: '../assets/pokebowl.jpg',
        },
        {
          id: 3,
          name: 'Card 3',
          imageUrl: '../assets/pokebowl.jpg',
        },
        {
          id: 4,
          name: 'Card 3',
          imageUrl: '../assets/pokebowl.jpg',
        },
        {
          id: 5,
          name: 'Card 3',
          imageUrl: '../assets/pokebowl.jpg',
        },
        {
          id: 6,
          name: 'Card 3',
          imageUrl: '../assets/pokebowl.jpg',
        },
        // Add more card items as needed
      ],
    };
  },
};

</script>

<style>

</style>