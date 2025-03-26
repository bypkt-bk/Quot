<template>
  <div class="hero">
    <div class="infomation">
      <h1>
        Bill Generator<br />
        for your Store
      </h1>
      <p>Simplify Billing, Print with Ease, Manage with Power.</p>
      <Button label="Get started" @click="handleClick" />
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="580"
      height="449"
      viewBox="0 0 580 449"
      fill="none"
    >
      <path
        d="M10.5894 236.191C52.9966 192.144 205.93 409.27 160.719 436.577C115.508 463.884 -22.3541 170.068 79.7372 173.074C181.829 176.08 147.079 277.405 149.463 280.188C151.847 282.971 306.969 258.638 229.243 386.742C151.516 514.846 206.061 197.813 235.347 188.308C264.634 178.804 259.296 384.192 330.047 358.007C377.255 340.535 149.784 -18.8733 270.724 64.4851C320.625 98.8793 352.951 338.262 423.678 312.124C494.405 285.987 229.622 -23.0244 344.6 13.5005C437.231 42.9266 434.903 292.651 522.525 250.595C549.25 237.768 555.015 208.616 569.355 182.672M195.86 146.135L213.398 156.335V137.606"
        stroke="white"
        stroke-width="20"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
import Button from "@/components/atoms/button.vue";

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
  font-family: Righteous;
  font-size: 64px;
}
p {
  text-shadow: 0px 4px 25.7px rgba(255, 255, 255, 0.6);
  font-family: "Onest";
  font-size: 16px;
  font-weight: 400;
}
svg {
  max-width: 100%;
}
</style>
