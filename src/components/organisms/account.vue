<template>
  <div class="edit-container">
    <CircleUserRound class="logo-head" />
    <div class="email">
      <p>Email</p>
      <input placeholder="Your name" v-model="user.email" disabled />
    </div>
    <div class="edit">
      <p>First name & Last name</p>
      <input placeholder="Your name" v-model="user.name" />
    </div>
    <div class="edit">
      <p>Tax ID</p>
      <input placeholder="Tax ID" v-model="user.taxId" />
    </div>
    <div class="edit">
      <p>Phone number</p>
      <input placeholder="Your phone number" v-model="user.phoneNumber" />
    </div>
    <button class="save" v-on:click="handleSave">Save</button>
    <button class="cancel" v-on:click="handleCancel">Cencel</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CircleUserRound } from "lucide-vue-next";
import VueCookies from "vue-cookies";
import { trpc } from "@/lib/trpc";
const user = ref({
  id: "",
  name: "",
  phoneNumber: "",
  taxId: "",
  googleId: "",
  email: "",
});

onMounted(async () => {
  const raw = VueCookies.get("auth");
  const auth = typeof raw === "string" ? JSON.parse(raw) : raw;

  try {
    const fetchedUser = await trpc.user.getByUserId.query(auth.userId);
    user.value = {
      id: fetchedUser.id,
      name: fetchedUser.name,
      phoneNumber: fetchedUser.phoneNumber ?? "",
      taxId: fetchedUser.taxId ?? "",
      googleId: fetchedUser.googleId,
      email: fetchedUser.email,
    };
  } catch (err) {
    console.error("❌ Failed to fetch user:", err);
  }
});

const handleSave = async () => {
  try {
    if (!user.value.name) {
      alert("Missing name");
      return;
    }
    const { googleId, name, email, phoneNumber, taxId } = user.value;
    await trpc.user.update.mutate({
      googleId,
      name,
      email,
      phoneNumber,
      taxId,
    });
    alert("Save success");
  } catch (err) {
    console.error("Failed to update user:", err);
  }
};

const handleCancel = () => {
  window.history.back();
};
</script>

<style scoped>
.logo-head {
  width: 36px;
  height: 36px;
}
.edit-container {
  display: flex;
  width: 440px;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid #3c3c3c;
  background: #242424;
  position: relative;
}

.edit,
.email {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
}
.email input {
  border: none;
}
input {
  display: flex;
  height: 40px;
  width: 100%;
  padding: 10px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid #3c3c3c;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
}
.save {
  background-color: white;
  color: black;
  border-radius: 6px;
  border: 1px solid #ffffff;
  width: 100%;
  height: 38px;
  cursor: pointer;
}
.cancel {
  border-radius: 6px;
  border: 1px solid #ffffff;
  width: 100%;
  height: 38px;
  cursor: pointer;
}
</style>
