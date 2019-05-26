<template>
  <div>
    <ul class="action-show">
      <li v-for='(item, index) in list' :key='item.id' @click="handleClick(item,index)"
      :class="{ 'action-show-li': true, 'action-show-liClick': item.isClick}"><img :src="item.img" alt=""></li>
      
    </ul>
    <div class="action-detail">
      <p class="action-detail-title">{{title}}</p>
      <p class="action-detail-main">{{detail}}</p>
      <button class="action-detail-button">参与投稿</button>
    </div>
    <!-- <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="cover of covers" :key="cover.id">
        <a :href="cover.redirectUrl?cover.redirectUrl||javascript:void(0)" target="_Blank"><img class="img" :src="cover.url" rel="nofollow noreferrer"></a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
    </swiper>  -->
  </div>
</template>

<script>  
// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from 'axios'

export default {
  name: "Swiper",
  props: {
    // list: {
    //   type: Array
    // }
  },
  components: {
    // swiper,
    // swiperSlide
  },
  data() {
    return {
      list:[
        { img:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=67b5af6d9c58d109d0eea1e0b031a7da/c83d70cf3bc79f3d423d2823b4a1cd11738b29c1.jpg',
        id:0,
        title:'活动标题0',
        detail:'0What is Time?Time is wealth for workers.Time is life for doctors.Time is victory for soldiers.Time is knowledge for students.Time is speed for scientists.Time is money for businessmen.Time is everything for all of us.Therefore, seize the time of today!What is Time?Time is wealth for workers.Time is life for doctors.Time is victory for soldiers.Time is knowledge for students.Time is speed for scientists.Time is money for businessmen.Time is everything for all of us.Therefore, seize the time of today!',
        isClick:true
        },
        { img:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=67b5af6d9c58d109d0eea1e0b031a7da/c83d70cf3bc79f3d423d2823b4a1cd11738b29c1.jpg',
        id:1,
        title:'活动标题1',
        detail:'1What is Time?Time is wealth for workers.Time is life for doctors.Time is victory for soldiers.Time is knowledge for students.Time is speed for scientists.Time is money for businessmen.Time is everything for all of us.Therefore, seize the time of today!What is Time?Time is wealth for workers.Time is life for doctors.Time is victory for soldiers.Time is knowledge for students.Time is speed for scientists.Time is money for businessmen.Time is everything for all of us.Therefore, seize the time of today!',
        isClick:false
        },
        { img:'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=67b5af6d9c58d109d0eea1e0b031a7da/c83d70cf3bc79f3d423d2823b4a1cd11738b29c1.jpg',
        id:2,
        title:'活动标题2',
        detail:'2What is Time?Time is wealth for workers.Time is life for doctors.Time is victory for soldiers.Time is knowledge for students.Time is speed for scientists.Time is money for businessmen.Time is everything for all of us.Therefore, seize the time of today!What is Time?Time is wealth for workers.Time is life for doctors.Time is victory for soldiers.Time is knowledge for students.Time is speed for scientists.Time is money for businessmen.Time is everything for all of us.Therefore, seize the time of today!'
        }
      ],
      title: '',
      detail: '',
      id: '',
      // swiperOption: {
      //   simulateTouch : false,
      //   loop:true,
      //   notNextTick: true,
      //   observer:true,
      //   observeParents:true,
      //   paginationClickable: true,
      //   autoplay : {
      //     delay: 3000
      //   },
      //   speed:300,
      //   pagination : {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //     type: 'bullets',
      //     bulletClass: 'pagination',
      //     bulletActiveClass : 'pagination-active',
      //   },
      //   navigation: {
      //     clickable: true,
      //       nextEl: '.swiper-button-next',
      //       prevEl: '.swiper-button-prev',
      //   },
      // },
      // covers: [],
    };
  },

  methods: {
    handleClick(item,index) {
      this.title = this.list[index].title;
      this.detail = this.list[index].detail;
      for(let i in this.list) {
        this.list[i].isClick = false;
      }
      this.list[index].isClick = true;
    }
    // getCoverList () {
    //   axios.get(this.domainName+'/slide')
    //     .then((res) => {
    //       if(res.status === 200 && res.data.data) {
    //         this.covers = res.data.data || []
    //       }
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
    // },
    // toNewPage(url){
    //   window.open(url)
    // }
  },

  computed: {
    // swiper() {
    //   return this.$refs.mySwiper.swiper;
    // }
  },
  mounted() {
    // this.getCoverList()
    this.title = this.list[0].title,
    this.detail = this.list[0].detail
  }
};
</script>

<style>
.action-show {
  height: 300px;
  /* width: 100%; */
  overflow: hidden;
  /* background-color: pink; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0 100px;

}
.action-show-li {
  width: 250px;
  height: 188px;
  cursor: pointer;
}
.action-show-liClick {
  box-shadow: 2px 2px 12px 2px #ccc
}
.action-show-li:hover {
  box-shadow: 2px 2px 12px 2px #ccc
}
.action-show-li img {
  width: 100%;
  height: 100%;
}
.action-detail {
  background-color: #a5a5ac;
  width: 100%;
  overflow: hidden;
  padding: 10px 30px;
  color: #fff;
}
.action-detail-title {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
  font-family: 'PingFangSC-Heavy'
}
.action-detail-main {
  text-align:left;
  font-size: 16px;
  font-family: 'PingFangSC-Medium'
}
.action-detail-button {
  background-color: #4959f6;
  border-radius: 4px;
  border: none;
  outline: none;
  width: 120px;
  height: 40px;
  margin: 20px 0;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
}
/* .swiper {
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
} */

</style>

