<template>
  <div>
    <div class="container">
      <h3 class="click-text">Check it. Print it.</h3>
      <h3 class="login-text">Log in to your QUOT account</h3>
      <Button class="btn" @click="handleClick()">
        <img :src="google.src" alt="Google" />
        Continue with Google
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/atoms/button.vue";
import google from "@/assets/google.svg";

function handleClick() {
  window.location.href = "/home/1";
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
}
.click-text,
.login-text {
  font-family: "Righteous", sans-serif;
  font-size: 24px;
}
.login-text {
  opacity: 50%;
}
.btn {
  gap: 18px;
  display: flex;
  width: 100%;
  padding: 6px 12px;
  justify-content: center;
  gap: 18px;
}
</style>
