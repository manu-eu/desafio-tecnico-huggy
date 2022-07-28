<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

import { Contact } from "../types/contact";
import { useContactsStore } from "../stores";

import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Icon, { IconType } from "../components/Icon.vue";
import IconButton from "../components/IconButton.vue";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";

import emptyBook from "../assets/empty-book.png";

export interface PageState {
	contact: Contact | null;
	showContactForm: boolean;
	showDeleteContactDialog: boolean;
	showContactInfo: boolean;
}

const state: PageState = reactive({
	contact: null,
	showContactForm: false,
	showDeleteContactDialog: false,
	showContactInfo: false,
});

const contacts = useContactsStore();

const sortIcon = computed((): IconType => {
	return contacts.sortOrder === "asc" ? "north" : "south";
});

const sortIconIsShown = (prop: keyof Contact) => {
	return contacts.sortBy === prop;
};

const phoneNumberRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
const landLineNumberRegex = /^\d{4}-\d{4}$|^$/gi;

const schema = yup.object({
	id: yup.number().nullable(),
	name: yup.string().required().label("Nome"),
	email: yup.string().required().email().label("Email"),
	phone: yup.string().required().matches(phoneNumberRegex).label("Celular"),
	landline: yup
		.string()
		.nullable()
		.matches(landLineNumberRegex)
		.label("Telefone"),
	address: yup.string().nullable().max(120).label("Endereço"),
	district: yup.string().nullable().max(20).label("Bairro"),
	state: yup.string().nullable().max(20).label("Estado"),
});

const form = useForm<Contact>({
	validationSchema: schema,
});

const handleFormSubmit = form.handleSubmit((contact) => {
	if (contact.id) {
		contacts.updateItem(contact.id, contact);
	} else {
		contacts.createItem(contact);
	}
	state.showContactForm = false;
});

const updateSort = (sortBy: keyof Contact) => {
	if (contacts.sortBy === sortBy) {
		contacts.sortOrder = contacts.sortOrder === "asc" ? "desc" : "asc";
	} else {
		contacts.sortBy = sortBy;
		contacts.sortOrder = "desc";
	}
	contacts.updateItems();
};

const handleContactSearch = (event: KeyboardEvent) => {
	const value = (event.target as HTMLInputElement).value;
	contacts.search = value;
	contacts.updateItems();
};

const showContactForm = (contact?: Contact) => {
	state.contact = contact || null;
	state.showContactForm = true;
	state.showContactInfo = false;

	form.resetForm();

	form.setValues(contact || {
		id: null,
		name: "",
		email: "",
		phone: "",
		landline: "",
		address: "",
		district: "",
		state: "",
	});
};

const showContactDeleteDialog = (contact: Contact) => {
	state.contact = contact;
	state.showDeleteContactDialog = true;
	state.showContactInfo = false;
};

const handleContactDelete = () => {
	const contact = state.contact;

	if (contact) {
		contacts.deleteItem(contact.id);
		state.showDeleteContactDialog = false;
	}
};

const showContactInfo = (contact: Contact) => {
	state.contact = contact;
	state.showContactInfo = true;
};

onMounted(() => contacts.resetFilters().updateItems());
</script>

<template>
	<h2 class="headline-2 page-title">Contatos</h2>

	<section class="page-content">
		<div class="page-content-header flex justify-between wrap gap-1">
			<Input
				name="search"
				@keyup="handleContactSearch($event)"
				placeholder="Buscar contato"
				icon="search"
			/>
			<Button icon="add" @click="showContactForm()" title="Adicionar contato" />
		</div>

		<div class="overflow-x hide-scrollbar">
			<table class="table">
				<thead class="caption">
					<th>
						<span
							@click="updateSort('name')"
							class="cursor-pointer unselectable-text"
						>
							Nome
							<Icon
								v-if="sortIconIsShown('name')"
								class="sort-icon"
								:icon="sortIcon"
							/>
						</span>
					</th>
					<th>
						<span
							@click="updateSort('email')"
							class="cursor-pointer unselectable-text"
						>
							Email
							<Icon
								v-if="sortIconIsShown('email')"
								class="sort-icon"
								:icon="sortIcon"
							/>
						</span>
					</th>
					<th>
						<span
							@click="updateSort('phone')"
							class="cursor-pointer unselectable-text"
						>
							Telefone
							<Icon
								v-if="sortIconIsShown('phone')"
								class="sort-icon"
								:icon="sortIcon"
							/>
						</span>
					</th>
					<th></th>
				</thead>
				<tbody>
					<tr v-if="contacts.loading">
						<td colspan="4">
							<div class="empty-table">
								<Loading />
							</div>
						</td>
					</tr>
					<tr v-if="!contacts.loading && contacts.items.length === 0">
						<td colspan="4">
							<div class="empty-table">
								<img
									class="img"
									:src="emptyBook"
									alt="Imagem de livro aberto"
								/>
								<span class="subtitle-1">Ainda não há contatos</span>
								<Button
									icon="add"
									title="Adicionar contato"
									@click="showContactForm()"
								/>
							</div>
						</td>
					</tr>
					<tr
						v-if="!contacts.loading"
						@click="showContactInfo(contact)"
						class="body-2"
						tabindex="0"
						v-for="contact in contacts.items"
					>
						<td>
							<div class="table-avatar">
								<Avatar
									:image-src="contact.avatar || ''"
									:name="contact.name"
								/>
								{{ contact.name }}
							</div>
						</td>
						<td>
							{{ contact.email }}
						</td>
						<td>
							{{ contact.phone }}
						</td>
						<td class="table-cell">
							<div class="table-actions">
								<IconButton
									icon="delete"
									@click.stop="showContactDeleteDialog(contact)"
								/>
								<IconButton
									icon="edit"
									@click.stop="showContactForm(contact)"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<Modal size="large" v-if="state.showContactInfo && state.contact">
		<template #header>
			<div class="contact-info-header">
				<h2 class="headline-2">
					<Avatar
						:image-src="state.contact.avatar || ''"
						:name="state.contact.name"
					/>
					{{ state.contact.name }}
				</h2>
				<div class="contact-info-buttons">
					<IconButton
						@click="showContactDeleteDialog(state.contact as Contact)"
						icon="delete"
					/>
					<IconButton
						@click="showContactForm(state.contact as Contact)"
						icon="edit"
					/>
					<IconButton @click="state.showContactInfo = false" icon="close" />
				</div>
			</div>
		</template>

		<table class="contact-info-table">
			<tr>
				<td class="caption text-right text-mine-shaft-100">Email</td>
				<td class="body-2">{{ state.contact.email || "-" }}</td>
			</tr>
			<tr>
				<td class="caption text-right text-mine-shaft-100">Celular</td>
				<td class="body-2">{{ state.contact.phone || "-" }}</td>
			</tr>
			<tr>
				<td class="caption text-right text-mine-shaft-100">Telefone</td>
				<td class="body-2">{{ state.contact.landline || "-" }}</td>
			</tr>
			<tr>
				<td class="caption text-right text-mine-shaft-100">Endereço</td>
				<td class="body-2">{{ state.contact.address || "-" }}</td>
			</tr>
			<tr>
				<td class="caption text-right text-mine-shaft-100">Bairro</td>
				<td class="body-2">{{ state.contact.district || "-" }}</td>
			</tr>
			<tr>
				<td class="caption text-right text-mine-shaft-100">Estado</td>
				<td class="body-2">{{ state.contact.state || "-" }}</td>
			</tr>
		</table>
	</Modal>

	<Modal size="large" v-if="state.showContactForm">
		<template #header>
			{{ state.contact ? "Editar contato" : "Adicionar contato" }}
		</template>

		<form id="contact-form" @submit.prevent="handleFormSubmit()" class="form">
			<input type="hidden" name="id" />
			<div class="form-row">
				<Input rules="required|min:8" class="w-350" name="name" label="Nome" />
			</div>
			<div class="form-row">
				<Input class="w-350" name="email" label="Email" />
			</div>
			<div class="form-row">
				<Input class="w-250" name="landline" label="Telefone" />
			</div>
			<div class="form-row">
				<Input class="w-250" name="phone" label="Celular" />
			</div>
			<div class="form-row">
				<Input class="w-450" name="address" label="Endereço" />
			</div>
			<div class="form-row">
				<Input class="w-250" name="district" label="Bairro" />
				<Input class="w-150" name="state" label="Estado" />
			</div>
		</form>

		<template #footer>
			<Button
				color="secondary"
				@click="state.showContactForm = false"
				title="Cancelar"
			/>
			<Button
				color="primary"
				form="contact-form"
				type="submit"
				title="Salvar"
			/>
		</template>
	</Modal>

	<Modal size="small" v-if="state.showDeleteContactDialog">
		<template #header> Excluir este contato? </template>

		<template #footer>
			<Button
				color="secondary"
				@click="state.showDeleteContactDialog = false"
				title="Cancelar"
			/>
			<Button
				icon="delete"
				color="danger"
				@click="handleContactDelete()"
				title="Excluir"
			/>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
.table-avatar {
	display: flex;
	align-items: center;

	.avatar {
		margin-right: 1rem;
	}
}

.contact-info-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap-reverse;

	.contact-info-buttons,
	.headline-2 {
		display: flex;
		align-items: center;
	}

	.contact-info-buttons {
		gap: 0.25rem;
		margin-left: auto;
	}

	.headline-2 {
		gap: 1rem;
		white-space: nowrap;
	}
}

.contact-info-table {
	border-collapse: separate;
	border-spacing: 1.5rem;
}
</style>
