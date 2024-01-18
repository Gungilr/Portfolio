<script setup>
import Experience from '/components/BlogPage/Experience.js'
import Blog from './Blog.css?inline'
import { ref, onMounted } from 'vue'


onMounted(() => {
  if(document.readyState === 'ready' || document.readyState === 'complete') {
  const experience = new Experience(document.querySelector(".experience-canvas"));
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      const experience = new Experience(document.querySelector(".experience-canvas"));
    }
  }
}
});


</script>

<template className = {Blog}>
  <div class="experience">
    <canvas class="experience-canvas" data-engine="three.js r155dev"></canvas>
  </div>

  <div class="page-wrapper" asscroll> 
    <section class="hero">
      <div class="hero-wrapper">
        <div class="intro-text Header">Ryan Tan</div>
        <div class="intro-text Title">Potato Blog</div>
      </div>
    </section>
  </div>
</template>
