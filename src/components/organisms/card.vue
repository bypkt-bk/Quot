<template>
  <a class="card" :href="`/store/${store.id}`">
    <Stores class="store-icon" />
    <h3
      :title="store.name"
      :style="{
        textAlign: 'start',
        fontFamily: 'Righteous',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
      }"
    >
      {{ store.name }}
    </h3>
    <div class="group">
      <Crown class="icon" />
      <span class="badge" v-for="owner in store.owner" :key="owner.id">{{
        getInitials(owner.name)
      }}</span>
    </div>
    <div class="group">
      <Landmark class="icon" />
      <span class="amount">{{ formatRevenue(store.revenue) }}</span>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { Store as Stores, Crown, Users, Landmark } from "lucide-vue-next";
import { type Store } from "@/lib/shared";
import { defineProps } from "vue";

// Define the prop for the store
defineProps<{
  store: Store;
}>();

function getInitials(name: string): string {
  if (!name) return "";
  const nameParts = name.split(" ");
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
}
function formatRevenue(revenue: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    notation: "standard",
    maximumFractionDigits: 2,
  }).format(revenue);
}
</script>

<style scoped>
.card {
  display: flex;
  padding: 20px 34px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid #707070;
  background: #434343;
  cursor: pointer;
}

h3 {
  color: white;
  font-family: Righteous;
  font-size: 18px;
}

.group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.store-icon {
  width: 36px;
  height: 36px;
}
.edit-icon {
  cursor: pointer;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 15.673px;
  top: 16.611px;
}

.badge {
  display: flex;
  width: 24px;
  height: 24px;
  padding: 5px 4px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #707070;
  background: white;
  color: black;
  font-family: Onest;
  font-size: 12px;
}

.amount {
  display: block;
  text-align: start;
  font-family: Onest;
  font-size: 16px;
}
</style>
