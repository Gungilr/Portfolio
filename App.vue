<script>
import StartScreen from './components/StartScreen.vue'
import Blog from './components/Blog.vue'


export default {
  components: {
    StartScreen,
    Blog,
  },
  data() {
    return {
      showStartScreen: false,
      showBlog: false,
    };
  },
  watch: {
    '$route'(to, from) {
      // Trigger the transition effect when navigating to a new route

      if(to == "StartScreen")
        this.showStartScreen = true;
      else if(to == "blog")
      {
        this.showBlog = true;
      }
    },
  },
  methods: {
    handleTransitionEnd() {
      // Reset the flag after the transition ends
      this.showStartScreen = false;
    },
  },
};
</script>

<template>
  <blog msg="" />
</template>
