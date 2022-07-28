<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

import api, { Contact } from "../services/backend";

import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Icon, { IconType } from "../components/Icon.vue";
import IconButton from "../components/IconButton.vue";
import Modal from "../components/Modal.vue";

import emptyBook from '@/assets/empty-book.png';

export interface PageState {
	contacts: Contact[];
	currentContact: Contact | null;
	showContactForm: boolean;
	showDeleteContactDialog: boolean;
	showContactInfo: boolean;
    mounted: boolean;
    sortBy: keyof Contact;
    sortOrder: 'asc' | 'desc';
}

const state: PageState = reactive({
	contacts: [],
    currentContact: null,
    showContactForm: false,
    showDeleteContactDialog: false,
    showContactInfo: false,
    mounted: false,
    sortBy: 'name',
    sortOrder: 'desc',
});

const phoneNumberRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
const landLineNumberRegex = /^\d{4}-\d{4}$|^$/gi;

const schema = yup.object({
    id:       yup.number().nullable(),
    name:     yup.string().required().label('Nome'),
    email:    yup.string().required().email().label('Email'),
    phone:    yup.string().required().matches(phoneNumberRegex).label('Celular'),
    landline: yup.string().nullable().matches(landLineNumberRegex).label('Telefone'),
    address:  yup.string().nullable().label('Endereço'),
    district: yup.string().nullable().label('Bairro'),
    state:    yup.string().nullable().label('Estado'),
})

const sortIcon = computed((): IconType => {
    return state.sortOrder === 'asc' ? 'north' : 'south';
});

const form = useForm<Contact>({
    validationSchema: schema,
});

const handleFormSubmit = form.handleSubmit(async (contact) => {
    if(contact.id) {
        await api.updateContact(contact.id, contact);
    } else {
        await api.createContact(contact);
    }

    form.resetForm();
    state.showContactForm = false;

    updateList();
})

const updateSort = (sortBy: keyof Contact) => {
    if (state.sortBy === sortBy) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortBy = sortBy;
        state.sortOrder = 'desc';
    }
    updateList();
};

const updateList = async (search?: string) => {
    const contacts = await api.listContacts({
        search: search || '',
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
    })
    state.contacts = contacts
}

const handleContactSearch = (event: KeyboardEvent) => {
    const value = (event.target as HTMLInputElement).value;
    updateList(value);
};

const showContactForm = (contact?: Contact) => {
    state.currentContact = contact || null;
    state.showContactForm = true;
    form.resetForm();

    if(contact) {
        form.setValues(contact);
    }
}

const showContactDeleteDialog = (contact: Contact) => {
    state.currentContact = contact;
    state.showDeleteContactDialog = true;
}

const handleContactDelete = async () => {
    const contact = state.currentContact;

    if (contact) {
        await api.deleteContact(contact.id);
        await updateList();
        state.showDeleteContactDialog = false;
    }
}

const showContactInfo = (contact: Contact) => {
    state.currentContact = contact;
    state.showContactInfo = true;
    console.log(123);
}

onMounted(async () => {
    await updateList()
    state.mounted = true
});
</script>

<template>
	<h2 class="headline-2 page-title">Contatos</h2>

    <section class="page-content">
        <div class="page-content-header flex justify-between wrap gap-1">
			<Input name="search" @keyup="handleContactSearch($event)" placeholder="Buscar contato" icon="search" />
			<Button icon="add" @click="showContactForm()" title="Adicionar contato" />
        </div>

        <div class="overflow-x hide-scrollbar">
            <table class="table">
                <thead class="caption">
                    <th>
                        <span @click="updateSort('name')" class="cursor-pointer unselectable-text">
                            Nome
                            <Icon v-if="state.sortBy === 'name'" class="sort-icon" :icon="sortIcon"/>
                        </span>
                    </th>
                    <th>
                        <span @click="updateSort('email')" class="cursor-pointer unselectable-text">
                            Email
                            <Icon v-if="state.sortBy === 'email'" class="sort-icon" :icon="sortIcon"/>
                        </span>
                    </th>
                    <th>
                        <span @click="updateSort('phone')" class="cursor-pointer unselectable-text">
                            Telefone
                            <Icon v-if="state.sortBy === 'phone'" class="sort-icon" :icon="sortIcon"/>
                        </span>
                    </th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-if="state.mounted && state.contacts.length === 0">
                        <td colspan="4">
                            <div class="empty-table">
                                <img class="img" :src="emptyBook" alt="Imagem de livro aberto">
                                <span class="subtitle-1">Ainda não há contatos</span>
                                <Button icon="add" title="Adicionar contato" @click="showContactForm()"/>
                            </div>
                        </td>
                    </tr>
                    <tr @click="showContactInfo(contact)" class="body-2" tabindex="0" v-for="contact in state.contacts">
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
                                <IconButton icon="delete" @click.stop="showContactDeleteDialog(contact)"/>
                                <IconButton icon="edit" @click.stop="showContactForm(contact)"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <Modal size="large" v-if="state.showContactInfo && state.currentContact">
        <template #header>
            <div class="contact-info-header">
                <h2 class="headline-2">
                    <Avatar
                        :image-src="state.currentContact.avatar || ''"
                        :name="state.currentContact.name"
                    />
                    {{ state.currentContact.name }}
                </h2>
                <div class="contact-info-buttons">
                    <IconButton icon="delete"/>
                    <IconButton icon="edit"/>
                    <IconButton icon="close"/>
                </div>
            </div>
        </template>

        <table class="contact-info-table">
            <tr><td class="caption text-right text-mine-shaft-100">Email   </td><td class="body-2">{{ state.currentContact.email || '-' }}</td></tr>
            <tr><td class="caption text-right text-mine-shaft-100">Celular </td><td class="body-2">{{ state.currentContact.phone || '-' }}</td></tr>
            <tr><td class="caption text-right text-mine-shaft-100">Telefone</td><td class="body-2">{{ state.currentContact.landline || '-' }}</td></tr>
            <tr><td class="caption text-right text-mine-shaft-100">Endereço</td><td class="body-2">{{ state.currentContact.address || '-' }}</td></tr>
            <tr><td class="caption text-right text-mine-shaft-100">Bairro  </td><td class="body-2">{{ state.currentContact.district || '-' }}</td></tr>
            <tr><td class="caption text-right text-mine-shaft-100">Estado  </td><td class="body-2">{{ state.currentContact.state || '-' }}</td></tr>
        </table>
    </Modal>

    <Modal size="large" v-if="state.showContactForm">
        <template #header>
            {{ state.currentContact ? 'Editar contato' : 'Adicionar contato' }}
        </template>

        <form id="contact-form" @submit.prevent="handleFormSubmit()" class="form">
            <input type="hidden" name="id">
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
            <Button color="secondary" @click="state.showContactForm = false" title="Cancelar" />
            <Button color="primary" form="contact-form" type="submit" title="Salvar" />
        </template>
    </Modal>

    <Modal size="small" v-if="state.showDeleteContactDialog">
        <template #header>
            Excluir este contato?
        </template>

        <template #footer>
            <Button color="secondary" @click="state.showDeleteContactDialog = false" title="Cancelar" />
            <Button icon="delete" color="danger" @click="handleContactDelete()" title="Excluir" />
        </template>
    </Modal>

</template>

<style scoped lang="scss">
@import '../styles/colors';

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
