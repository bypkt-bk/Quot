<template>
  <button><slot /></button>
</template>

<script setup>
defineProps({
  label: String,
});
</script>

<style lang="css" scoped>
button {
  font-family: "Onest", sans-serif;
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 6px 20px;
  align-items: center;
  border-radius: 6px;
  background-color: white;
  color: black;
}

button.light {
  background-color: black;
  color: white;
}
</style>
