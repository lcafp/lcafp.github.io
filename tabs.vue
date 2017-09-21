<template>
  <div>
    <nav>
      <ul>
        <li v-for="item,i in items" v-on:click="switchItem(i)" :class="{active: i==current}">
        {{ item.props.name }}
        </li>
      </ul>
    </nav>
    <main>
      <transition name="fade" mode="in-out">
        <img :key="current" :src="currentImage" />
      </transition>
    </main>
    <ul class="legend">
      <li v-for="item in legend">
        <span :style="{backgroundColor: item.color}"></span>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        current: 0,
        size: null
      }
    },
    props: ['items', 'legend'],
    computed: {
      currentItem() {
        return this.items[this.current]
      },
      currentImageSize() {
        if(!this.size) return 'image'
        if(this.size.width >= 450 && this.currentItem.image_md) {
          return 'image_md'
        }
        return 'image'
      },
      currentImage() {
        return 'assets/' + this.currentItem[this.currentImageSize]
      }
    },
    mounted() {
      this.resize()
      window.onresize = this.resize
    },
    methods: {
      resize() {
        this.size = this.$el.getBoundingClientRect()
      },
      switchItem(i) {
        this.current = i
      }
    }
  }
</script>

<style scoped>
  body {
    color : #231f20;
  }

  nav ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    padding: 0px;
    margin: 0px;
    margin-bottom: 12px;
  }
  nav ul li {
    width: 50%;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    font-family: 'Source Sans Pro';
    height: 44px;
    line-height: 44px;
    color: #849097;
    transition: box-shadow 0.33s ease-out, color 0.33s ease-out;
    -webkit-transition: box-shadow 0.33s ease-out, color 0.33s ease-out; /* Safari */
  }
  nav ul li.active {
    background-color: white;
    box-shadow: 0 0 7px rgba(132, 144, 151, 0.3);
    color : #231f20;
    border-radius: 2px;

  }
  h3 {
    font-size: 22px;
    margin: 0;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  p {
    border-top: 1px solid #e4ecef;
    padding-top: 1em;
    margin: 1em 0;
  }
  main {
    position: relative;
    max-height: 420px; /* 66% of 600px */
    height: 66vw;
  }
  main img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .legend{
    list-style-type: none;
    padding-top: 8px;
  }

  .legend span {
    width: 12px;
    height: 12px;
    border: 1px solid #231f20;
    border-radius: 1px; 
    display: inline-block;
    margin-right:8px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave {
    opacity: 1
  }

</style>
