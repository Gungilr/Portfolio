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
        
        <header id="navbar">
          <div class="nav-links">
            <a class = "navbar-left" href="#Blog">Home</a>
            <a class = "navbar-left" href="#contact">Contact</a>
            <a class = "navbar-right" href="/StartScreen.vue">Main</a>
          </div>
        </header>

        <section class="first-section section">
          <div class="text-section">
            <div class="section-intro">
              <h1 class="hero-main-title">Ryan Tan</h1>
            </div>
            <div class="main-text">
              <h3 class="section-heading">Potato Pages </h3>
            </div>
          </div>
        </section>


        <section class="second-section section">
          <div class="section-wrapper">
            <div class="section-left left">
              <h2 class="section-main-title">Random</h2>
              <div class="text-section">
                <div class="top-section-random">
                  <h3 class="section-secondary-title">A Cherry Blossom Blooming</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur non incidunt harum,
                    autem doloribus aut ducimus neque corporis quis, obcaecati itaque? Earum, amet.
                     Officiis illum tempore officia, iusto perferendis nisi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
</template>