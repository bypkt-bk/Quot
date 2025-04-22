<template>
  <footer class="footer">
    <!-- <div class="logo">
        <img :src="logo.src" alt="Logo" width="40" />
        <h2>QUOT</h2>
      </div> -->
    <div class="social-icons">
      <p class="Inc">© 2025 QUOT, Inc.</p>
      <Github @click="handleGithub" />
    </div>
  </footer>
</template>
<script setup>
import { Facebook, Instagram, Github } from "lucide-vue-next";
import logo from "@/assets/quot.svg";
const handleGithub = () => {
  window.location.href = "https://github.com/bypkt-bk/Quot";
};
</script>
<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  border-top: 2px solid #3c3c3c;
}
.footer_footerTop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}
.footerColumn_list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 20px;
}
h2 {
  font-family: Righteous;
  font-size: 24px;
}
h3 {
  font-family: Righteous;
  font-size: 16px;
}
.social-icons {
  display: flex;
  align-items: center;
  gap: 18px;
}
.settings {
  font-family: Onest;
  font-size: 14px;
}
.Inc {
  font-family: Onest;
  font-size: 14px;
}
ul {
  list-style: none;
  padding: 0;
}
ul li a {
  font-family: Onest;
  font-size: 14px;
}
</style>
