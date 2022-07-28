<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useAuthStore } from "../stores";

import Button from "../components/Button.vue";
import Loading from "../components/Loading.vue";

const huggyAuthUrl = import.meta.env.VITE_HUGGY_AUTH_SERVICE_URL || '';

const hasCodeQueryParam = ref(false);

onMounted(() => {
	const queryParams = new URLSearchParams(window.location.search);
	if (queryParams.has("code")) {
		const code = queryParams.get("code") as string;
		useAuthStore().huggySocialLogin(code);
		hasCodeQueryParam.value = true;
	}
});
</script>

<template>
	<div class="login-wrapper">
		<h1 class="headline-1">Login</h1>
		<Loading v-if="hasCodeQueryParam" />
		<a
			v-else
			:href="huggyAuthUrl"
		>
			<Button title="Fazer login com a Huggy" />
		</a>
	</div>
</template>

<style scoped></style>
