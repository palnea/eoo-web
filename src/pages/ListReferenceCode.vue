<script setup>
import { computed, onMounted, ref } from 'vue';
import apiService from "@/services/api.service";
import { consoleError } from "@/utils/logger";
import { errorMessage } from "@/utils/message";

const loading = ref(false);
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);

const defaultItem = {
  id: '',
  code: '',
  trial_days: 0,
  start_date: 0,
  usage_limit: 0,
  times_used: 0,
  school: 0,
};

const editedItem = ref(Object.assign({}, defaultItem));

const headers = [
  {
    title: 'Kod',
    align: 'start',
    sortable: false,
    key: 'code',
  },
  { title: 'Premium Süresi', key: 'trial_days' },
  { title: 'Başlangıç Tarihi', key: 'start_date' },
  { title: 'Kullanım Limiti(Adet)', key: 'usage_limit' },
  { title: 'Kullanım Sayısı', key: 'times_used' },
  { title: 'Okul', key: 'school' },
  { title: 'Oluşturan', key: 'created_by', sortable: false },
  { title: 'Düzenle / Sil', key: 'actions', sortable: false }
]

const refCodes = ref([]);

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Yeni Kod' : 'Kodu Düzenle';
});

const editItem = (item) => {
  editedIndex.value = refCodes.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = refCodes.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  refCodes.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialog.value = false;
  editedItem.value = Object.assign({}, defaultItem);
  editedIndex.value = -1;
};

const closeDelete = () => {
  dialogDelete.value = false;
  editedItem.value = Object.assign({}, defaultItem);
  editedIndex.value = -1;
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(refCodes.value[editedIndex.value], editedItem.value);
  } else {
    refCodes.value.push(editedItem.value);
  }
  close();
};

const listRefCodes = async () => {
  try {
    loading.value = true
    const response = await apiService.fetchRefCodes()
    refCodes.value = response.data.response_body
  } catch (err) {
    consoleError(err)
    errorMessage('Bilgiler hatalı.')
  } finally {
    loading.value = false
  }
}

onMounted(listRefCodes)
</script>


<template>
  <v-data-table
    :headers="headers"
    :items="refCodes"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    :loading="loading"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
        class="bright-purple-gradient"
      >
        <v-toolbar-title class="font-weight-medium">Referans Kodları</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              class="mb-2 no-uppercase"
              v-bind="props"
            >
              Kod Ekle +
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card style="margin-top: 30px">
            <v-card-title class="text-h5">Silmek istediğine emin misin?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">İptal</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Sil</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="listRefCodes"
      >
        Yenile
      </v-btn>
    </template>
  </v-data-table>
</template>


<style scoped>

</style>
