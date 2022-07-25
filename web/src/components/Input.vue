<template>
	<fieldset class="field-group">
		<label v-if="hasLabel" class="input-label">
			{{ props.label }}
		</label>
		<div class="input-group">
			<input
				type="text"
				class="input"
				:class="{
					'error': hasError,
                    'has-icon': hasIcon,
				}"
				:disabled="props.disabled"
				:name="props.name"
				:id="`field_${props.name}`"
				:value="props.value"
				:placeholder="props.placeholder"
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
		<small v-if="hasError" class="input-error">
			{{ props.errorMessage }}
		</small>
	</fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon, { IconType } from "./Icon.vue";

export interface InputProps {
	value?: string;
	name: string;
	label?: string;
    icon?: IconType;
	hasError?: boolean;
	errorMessage?: string;
	placeholder?: string;
	disabled?: boolean;
}

const props = defineProps<InputProps>();

const hasError = computed(
	() =>
		(!!props.hasError && props.hasError === true) ||
		(!!props.errorMessage && props.errorMessage.length > 0)
);
const hasLabel = computed(() => !!props.label && props.label.length > 0);
const hasIcon = computed(() => !!props.icon && props.icon.length > 0);
</script>

<style scoped lang="scss">
.field-group {
	border: none;
	padding: 0;
	margin: 0;
}

.input-error, .input-label {
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.4px;
    font-weight: 500;
}

.input-label {
    color: var(--mine-shaft-700);
    margin-bottom: 0.25rem;
}

.input-error {
    color: var(--alizarin-crimson-500);
    margin-top: 0.25rem;
}

.input-group {
    position: relative;
    .input-icon {
        position: absolute;

        top: 50%;
        left: 0.875rem;
        transform: translateY(-50%);

        height: 1.125rem;
        width: 1.125rem;

		fill: var(--mine-shaft-100);

		&.disabled {
			fill: var(--mine-shaft-60);
		}
	}
}

.input {
	background: var(--mine-shaft-10);
	border: 1px solid var(--mine-shaft-30);
	border-radius: 0.5rem;
	padding: 0.5rem 0.75rem;

	color: var(--mine-shaft-700);
	font-size: 0.875rem;
	line-height: 1.125rem;
	font-weight: 400;

	outline: none;
	transition: border-color 200ms ease-out;

    &::placeholder {
        color: var(--mine-shaft-80);
    }

    &:hover {
        border-color: var(--mine-shaft-100);
    }

    &:focus {
        border-color: var(--persian-blue-600);
    }

	&:disabled {
		border-color: var(--mine-shaft-30);
		cursor: not-allowed;
		&, &::placeholder {
			color: var(--mine-shaft-60);
		}
	}

    &.error {
        border-color: var(--alizarin-crimson-500);
    }

    &.has-icon {
        padding-left: 2.625rem;
    }
}
</style>
