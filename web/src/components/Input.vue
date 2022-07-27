<template>
	<fieldset class="field-group">
		<label v-if="hasLabel" class="caption input-label">
			{{ props.label }}
		</label>
		<div class="input-group">
			<input
				type="text"
				class="input-field body-2"
				:class="{
					'error': !!errorMessage,
                    'has-icon': hasIcon,
				}"
				:disabled="props.disabled"
				:id="`field_${props.name}`"
				v-model="value"
				:placeholder="props.placeholder"
				:rules="props.rules"
			/>
            <Icon
                v-if="hasIcon"
                class="input-icon"
				:class="{
					'disabled': props.disabled,
				}"
                :icon="props.icon || 'none'"
            />
		</div>
		<small v-if="!!errorMessage" class="caption input-error">
			{{ errorMessage }}
		</small>
	</fieldset>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, toRef } from "vue";
import Icon, { IconType } from "./Icon.vue";



export interface InputProps {
	value?: string;
	name: string;
	label?: string;
    icon?: IconType;
	placeholder?: string;
	disabled?: boolean;
	rules?: string;
}

const props = defineProps<InputProps>();

const nameRef = toRef(props, 'name');
const { errorMessage, value } = useField(nameRef, '', {
	validateOnMount: false,
	validateOnValueUpdate: true,
});

//  = props.value || value;

const hasLabel = computed(() => !!props.label && props.label.length > 0);
const hasIcon = computed(() => !!props.icon && props.icon.length > 0);
</script>

<style scoped>

</style>
