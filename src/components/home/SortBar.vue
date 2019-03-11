<template>
  <div class="sort-bar">
    <ul class="navigation">
      <li :class="current === 1 ? 'active' : ''" @click='changeSort(1)'>
        <span>推荐</span>
      </li>
      <li :class="current === 2 ? 'active' : ''" @click='changeSort(2)'>
        <span>最新</span>
      </li>
      <li :class="current === 3 ? 'active' : ''" @click='changeSort(3)'>
        <span>最热</span>
      </li>
    </ul>    
  </div>
</template>

<script>
export default {
  name: 'SortBar',
  props: {
    current: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changeSort (index) {
      this.$emit('change-sort', index)
    }
  }
}
</script>

<style scoped>
.sort-bar {
  width: 1136px;
  margin-top: 26px;
}

ul.navigation {
  text-align: center;
}

.navigation > li {
  display: inline-block;
  height: 58px;
  line-height: 58px;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  transition: border .3s ease;  
}

.navigation > li:hover {
  color: #1F3EFF;
}

.navigation > li + li {
  margin-left: 54px;
}

.navigation li > span {
  display: block;
}

li.active {
  border-bottom: 4px solid #1F3EFF;
  color: #515151;
}
</style>

