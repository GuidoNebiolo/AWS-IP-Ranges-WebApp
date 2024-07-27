<script async setup>
import { onMounted, ref } from "vue";

import { useIpsStore } from "./stores/ips";
const store = useIpsStore()

import IPTable from "./components/IPTable.vue";

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

onMounted(async () => {
  await store.load()
})

</script>

<template>
  <div>
    <IPTable :tableData="store.getIPv4s?.map(i => [i['service'], i['region'], i['ip_prefix']])" />
  </div>
</template>
