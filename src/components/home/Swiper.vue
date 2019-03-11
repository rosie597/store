<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="cover of covers" :key="cover.id">
        <img class="img" :src="cover.url">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> 
  </div>
</template>

<script>  
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from 'axios'

export default {
  name: "Swiper",
  props: {
    list: {
      type: Array
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        simulateTouch : false,
        loop:true,
        notNextTick: true,
        observer:true,
        observeParents:true,
        paginationClickable: true,
        autoplay : {
          delay: 3000
        },
        speed:300,
        pagination : {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
          bulletClass: 'pagination',
          bulletActiveClass : 'pagination-active',
        }
      },
      covers: []
    };
  },

  methods: {
    getCoverList () {
      axios.get(this.domainName+'/slide')
        .then((res) => {
          if(res.status === 200 && res.data.data) {
            this.covers = res.data.data || []
          }
        }).catch((err)=>{
          console.log(err)
        })
    }
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.getCoverList()
  }
};
</script>

<style>
.swiper {
  position: relative;
  width: 1136px;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 24px;
}

.swiper-container {
  width: 100%;
  height: 264px;
  overflow: hidden;
  border-radius: 8px; 
}

.swiper-container > .swiper-pagination {
  bottom: 24px;
}

.swiper-pagination > .pagination {
  display: inline-block;
  background-color: #fff;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 4px;
  outline: none;
  transition: all .5s ease;
}

.swiper-pagination > .pagination-active {
  width: 24px;
  border-radius: 4px;
}

.swiper-img {
  width: 100%;
  height: 264px;
}
.img{
  width: 100%;
}
</style>

