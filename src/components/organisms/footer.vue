<template>
  <footer class="footer">
    <div class="footer_footerTop">
      <div class="logo">
        <img src="src/assets/quot.svg" alt="Logo" width="40" />
        <h2>QUOT</h2>
      </div>
      <div class="social-icons">
        <Facebook />
        <Instagram />
        <Github />
      </div>
      <a class="settings" href="#">Cookie settings</a>
      <p class="Inc">© 2025 QUOT, Inc.</p>
    </div>

    <div class="footerColumn_list">
      <h3>Company</h3>
      <ul>
        <li><a href="#">About us</a></li>
        <li><a href="#">Security</a></li>
        <li><a href="#">Status</a></li>
        <li><a href="#">Terms & privacy</a></li>
      </ul>
    </div>

    <div class="footerColumn_list">
      <h3>Resources</h3>
      <ul>
        <li><a href="#">Help center</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Community</a></li>
      </ul>
    </div>

    <div class="footerColumn_list">
      <h3>QUOT for</h3>
      <ul>
        <li><a href="#">Small business</a></li>
        <li><a href="#">Restaurant</a></li>
        <li><a href="#">Store</a></li>
      </ul>
    </div>
  </footer>
</template>
<script setup>
import { Facebook, Instagram, Github } from "lucide-vue-next";
</script>
<style scoped>
.footer {
  display: flex;
  padding: 32px 80px;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 2px solid #3c3c3c;
}
.footer_footerTop {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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
