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
import { signInWithGoogle } from "@/firebase/auth";
import { trpc } from "@/lib/trpc";

function handleClick() {
  signInWithGoogle()
    .then(async ({ user, token }) => {
      console.log("User signed in successfully");
      const User = await trpc.getUserById.query({
        id: user.uid,
      });
      if (!User) {
        await trpc.createUser.mutate({
          googleId: user.uid,
          email: user.email,
          name: user.displayName,
        });
        return window.location.href = "/home/1";
      }
      window.location.href = "/home/1";
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
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
