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
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="#" @click="page='ipv4'">IPv4</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="page='ipv6'">IPv6</a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" href="#" @click="page='ip_check'">Check IP</a>
      </li> -->
    </ul>
    <IPTable v-if="page === 'ipv4'" title="IPv4" :tableData="store.getIPv4s?.map(i => [i['service'], i['region'], i['ip_prefix']])" />
    <IPTable v-if="page === 'ipv6'" title="IPv6" :tableData="store.getIPv6s?.map(i => [i['service'], i['region'], i['ipv6_prefix']])" />
  </div>
</template>
