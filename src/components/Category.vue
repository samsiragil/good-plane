<template>
  <div>
    <h5 class="font-medium mb-4">Category</h5>
    <div class="w-100 mb-4">
      <BListGroup>
        <BListGroupItem v-for="category in categoryList" button>
          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-0 text-truncate">{{ category.name }}</p>
            <BDropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <svg width="5" height="22" viewBox="0 0 5 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1001_32907)">
                    <path
                      d="M0.499752 19.7329C0.499752 20.9634 1.48413 21.9595 2.7146 21.9595C3.94507 21.9595 4.94116 20.9634 4.94116 19.7329C4.94116 18.5025 3.94507 17.5064 2.7146 17.5064C1.48413 17.5064 0.499752 18.5025 0.499752 19.7329Z"
                      fill="black" fill-opacity="0.85" />
                    <path
                      d="M0.499752 11.0259C0.499752 12.2564 1.48413 13.2407 2.7146 13.2407C3.94507 13.2407 4.94116 12.2564 4.94116 11.0259C4.94116 9.79541 3.94507 8.79932 2.7146 8.79932C1.48413 8.79932 0.499752 9.79541 0.499752 11.0259Z"
                      fill="black" fill-opacity="0.85" />
                    <path
                      d="M0.499752 2.31885C0.499752 3.54932 1.48413 4.5337 2.7146 4.5337C3.94507 4.5337 4.94116 3.54932 4.94116 2.31885C4.94116 1.08838 3.94507 0.0922852 2.7146 0.0922852C1.48413 0.0922852 0.499752 1.08838 0.499752 2.31885Z"
                      fill="black" fill-opacity="0.85" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1001_32907">
                      <rect width="21.8672" height="4.46484" fill="white"
                        transform="matrix(0 1 -1 0 4.94116 0.0922852)" />
                    </clipPath>
                  </defs>
                </svg>
              </template>
              <BDropdownHeader style="max-width: 200px;" class="text-truncate">{{ category.name }}</BDropdownHeader>
              <BDropdownItem @click="openForm(category)">Edit</BDropdownItem>
              <BDropdownItem @click="toggleDeleteModal(true, category)">Delete</BDropdownItem>
            </BDropdown>
          </div>
        </BListGroupItem>
      </BListGroup>
    </div>
    <p class="mb-0 font-medium text-success cursor-pointer" @click="openForm()">+ Create new category</p>
  </div>

  <BModal v-model="isShowFormModal" :title="formModalTitle" hide-footer>
    <div class="p-4">
      <div class="w-100 mb-4">
        <label class="mb-2">Category Name</label>
        <BFormInput class="p-3" v-model="form.name" size="md" placeholder="" @keyup.enter="saveCategory()" />
      </div>
      <div class="text-center pb-4">
        <BButton :disabled="form.name === ''" :loading="isSavingCategory" loading-fill variant="success"
          @click="saveCategory()">Save Category</BButton>
      </div>
    </div>
  </BModal>

  <BModal 
    :no-close-on-backdrop="isDeletingCategory"
    :no-close-on-esc="isDeletingCategory"
    :hide-header-close="isDeletingCategory"
    v-model="isShowDeleteModal" 
    :title="deleteModalTitle">
    <p>This can't be undone</p>
    <template #footer>
      <div class="d-flex align-items-center justify-content-end">
        <BButton 
          class="me-2" 
          variant="secondary" 
          :disabled="isDeletingCategory"
          @click="toggleDeleteModal(false)">Cancel</BButton>
        <BButton 
          class="ms-2" 
          loading-fill 
          variant="danger" 
          :loading="isDeletingCategory"
          @click="deleteCategory()">Delete</BButton>
      </div>
    </template>
  </BModal>

  <Teleport to="body">
    <div class="toast-container position-fixed p-3 top-0 end-0">
      <BToast no-close-button :variant="messageAction.type === 'success' ? `success` : `danger`" v-model="messageAction.show">
        <template #title>{{ messageAction.title }}</template>
        {{ messageAction.description }}
      </BToast>
    </div>
  </Teleport>

</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useCategoryStore } from '@/stores/category';
  import cloneDeep from 'lodash/cloneDeep';

  // State that related to the form modal
  const isShowFormModal = ref(false);
  const formType = ref('new');
  const form = ref({ name: '' })
  const isSavingCategory = ref(false);

  // Store interaction for category data 
  const categoryStore = useCategoryStore();
  const categoryList = computed(() => categoryStore.getCategories())

  // Computed properties related to the form modal title
  const formModalTitle = computed(() => 
    formType.value === 'new' ? 'Add new Category' : 'Edit Category'
  );

  // Form modal control method
  const toggleModalForm = (show = true) => {
    isShowFormModal.value = show;
  };
  const openForm = (selectedData = null) => {
    if (!selectedData) {
      resetForm();
    } else {
      form.value = cloneDeep(selectedData);
      formType.value = 'update';
    }
    toggleModalForm();
  }

  // Reset the form modal
  const resetForm = () => {
    form.value = { name: '' };
    formType.value = 'new';
  };

  // Save category logic
  const saveCategory = async () => {
    try {
      isSavingCategory.value = true;
      if (formType.value === 'new') await categoryStore.addNewCategory(form.value.name);
      else await categoryStore.updateCategory(form.value.id, form.value.name);
      toggleModalForm(false)
      setMessageAction('success', 'Category Saved Successfully', 'The category has been saved and is now available in the list.');
    } catch (error) {
      console.error('Failed to Save Category : ', error);
      setMessageAction('error', 'Failed to Save Category', 'An error occurred while saving the category. Please try again.');
    } finally {
      isSavingCategory.value = false;
    }
  }

  
  // State that related to the delete category 
  const isShowDeleteModal = ref(false);
  const selectedCategory = ref({ id: '', name: '' })
  const isDeletingCategory = ref(false);

  // Computed properties related to the delete modal title
  const deleteModalTitle = computed(() => {
    let title = 'Are you sure want to delete ';
    if(selectedCategory.value.id) title += `${selectedCategory.value.name}?`
    return title;
  });

  // Delete Modal control method
  const toggleDeleteModal = (show = true, selectedData=null) => {
    selectedCategory.value = selectedData ? cloneDeep(selectedData) : {};
    isShowDeleteModal.value = show;
  };

  // Delete category logic
  const deleteCategory = async () => {
    try {
      isDeletingCategory.value = true;
      await categoryStore.deleteCategory(selectedCategory.value.id)
      toggleDeleteModal(false)
      setMessageAction('success', 'Category Deleted Successfully', 'The category has been removed from the list.')
    } catch (error) {
      console.error("Failed to Delete Category : ", error)
      setMessageAction('error', 'Failed to Delete Category', 'An error occurred while deleting the category. Please try again.')
    } finally {
      isDeletingCategory.value = false;
    }
  }

  // State toast massage
  const messageAction = ref({
    show: false,
    type: '',
    title: '',
    description: ''
  })

  // Show toast message logic
  const setMessageAction = (type, title, description) => {
    messageAction.value = { show : true, type, title, description }
  }
</script>