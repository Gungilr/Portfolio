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

<template>
  <link id="stylesheet" rel="stylesheet" href="/components/Blog.css">
    <div class="page" asscroll-container>
      <div class="page-wrapper" asscroll> 
        <div id="navbar">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </div>

        <section class="first-section section">
          <div class="text-section">
            <div class="section-intro">
              <h1 class="hero-main-title">Ryan Tan Blog</h1>
            </div>
            <div class="main-text">
              <h3 class="section-heading"> Potato Blog </h3>
            </div>
          </div>
        </section>
      </div>
    </div>
</template>
