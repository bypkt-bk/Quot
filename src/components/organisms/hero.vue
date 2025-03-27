<template>
  <div class="hero">
    <div class="infomation">
      <h1>
        Bill Generator<br />
        for your Store
      </h1>
      <p>Simplify Billing, Print with Ease, Manage with Power.</p>
      <Button @click="handleClick">Get started</Button>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="945"
      height="407"
      viewBox="0 0 945 407"
      fill="none"
    >
      <path
        d="M36.6835 14.8409C162.176 133.558 106.984 424.306 42.5071 390.134C-45.6636 343.403 93.4021 17.8823 170.353 39.2162C247.304 60.5501 146.791 191.348 149.175 194.131C151.56 196.914 237.947 167.251 265.954 216.101C295.341 267.357 116.197 358.259 162.176 383.492C203.352 406.088 373.108 250.229 412.504 149.853C426.781 113.477 348.388 321.025 412.504 356.136C465.661 385.245 549.933 57.2383 575.334 51.9664C600.735 46.6946 472.426 341.807 549.933 363.952C627.44 386.097 695.828 74.1115 723.185 51.9664C746.225 33.3154 658.706 312.497 701.692 348.32C744.679 384.143 930.308 337.899 930.308 337.899M410.268 78.6679L418.75 103.232L435.715 81.0078"
        stroke="white"
        stroke-width="28"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
import Button from "@/components/atoms/button.vue";

const path = document.querySelector("svg path");
const pathlenght = path.getTotalLength();

function handleClick() {
  alert("Button clicked!");
}
</script>

<style lang="css" scoped>
svg path {
  stroke-dasharray: 4000;
  stroke-dashoffset: 4000;
  animation: hello_animetion linear 3.5s forwards;
}
@keyframes hello_animetion {
  to {
    stroke-dashoffset: 0;
  }
}
.hero {
  display: flex;
  flex-wrap: wrap;
  padding: 80px 80px;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
}
.infomation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}
h1 {
  text-shadow: 0px 4px 25.7px rgba(255, 255, 255, 0.6);
  font-family: "Righteous", sans-serif;
  font-size: 64px;
}
p {
  text-shadow: 0px 4px 25.7px rgba(255, 255, 255, 0.6);
  font-family: "Onest", sans-serif;
  font-size: 16px;
  font-weight: 400;
}
svg {
  max-width: 720px;
}
</style>
