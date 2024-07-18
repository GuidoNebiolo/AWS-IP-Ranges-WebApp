<script setup>
import { onMounted, ref } from "vue";
import IPTable from "./components/IPTable.vue";

import axios from "axios"
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const tableData = ref([])

onMounted(async () => {
  try {
    const data = await (await axios.get('https://ip-ranges.amazonaws.com/ip-ranges.json')).data
    console.log(data)
    tableData.value.push(...data['prefixes'].map(i => [i['service'], i['region'], i['ip_prefix']]))
  } catch (error) {
    console.error(error)
  }
})

</script>

<template>
  <div>
    <IPTable :tableData="tableData"/>
  </div>
</template>
