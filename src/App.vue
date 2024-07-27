<script async setup>
import { onMounted, ref } from "vue";
import IPTable from "./components/IPTable.vue";
import { useIpsStore } from "./stores/ips";

const store = useIpsStore()

onMounted(async () => {
  await store.load()
})

const page = ref('ipv4')

</script>

<template>
  <div>
    <nav class="nav nav-pills nav-fill">
      <a class="nav-link" href="#" :class="{ 'active': page === 'ipv4' }" @click="page = 'ipv4'">List IPv4</a>
      <a class="nav-link" href="#" :class="{ 'active': page === 'ipv6' }" @click="page = 'ipv6'">List IPv6</a>
      <!-- <a class="nav-link" href="#" :class="{ 'active': page === 'ip_check' }" @click="page = 'ip_check'">Check IP</a> -->
    </nav>
    <br>
    <br>
    <div>
      <IPTable v-if="page === 'ipv4'" title="IPv4"
        :tableData="store.getIPv4s?.map(i => [i['service'], i['region'], i['ip_prefix']])" />
      <IPTable v-if="page === 'ipv6'" title="IPv6"
        :tableData="store.getIPv6s?.map(i => [i['service'], i['region'], i['ipv6_prefix']])" />
    </div>
  </div>
</template>
