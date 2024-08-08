<script async setup>
import { onMounted, ref } from "vue";
import IPTable from "./components/IPTable.vue";
import { useIPsStore } from "./stores/ips";

const store = useIPsStore()

onMounted(async () => {
  await store.load()
})

const page = ref('ipv4')
const foundIPRange = ref([])

let ipInput = ref()

function updateFounds() {
  console.log(ipInput.value)
  foundIPRange.value = store.getIPRangeForIP(ipInput.value)
}

</script>

<template>
  <div>
    <nav class="nav nav-pills nav-fill">
      <a class="nav-link" href="#" :class="{ 'active': page === 'ipv4' }" @click="page = 'ipv4'">List IPv4</a>
      <a class="nav-link" href="#" :class="{ 'active': page === 'ipv6' }" @click="page = 'ipv6'">List IPv6</a>
      <a class="nav-link" href="#" :class="{ 'active': page === 'ip_check' }" @click="page = 'ip_check'">Check IP</a>
    </nav>
    <br>
    <br>
    <div>
      <IPTable v-if="page === 'ipv4'" title="IPv4"
        :tableData="store.getIPv4s?.map(i => [i['service'], i['region'], i['ip_prefix']])" />
      <IPTable v-if="page === 'ipv6'" title="IPv6"
        :tableData="store.getIPv6s?.map(i => [i['service'], i['region'], i['ipv6_prefix']])" />
      <div v-if="page === 'ip_check'">
        <!-- <form> -->
        <div class="form-group">
          <input type="string" class="form-control" id="inputIP" aria-describedby="ipHelp" placeholder="Enter IP"
            @change="updateFounds" v-model="ipInput">
          <small id="ipHelp" class="form-text text-muted">We'll never share your IP with anyone else.</small>
        </div>
        <!-- <button class="btn btn-primary" @click="foundIPRange = store.getIPRangeForIP('')">Submit</button> -->
        <!-- </form> -->
        <ul>
          <li v-for="i in foundIPRange">
            <b>Service</b>: {{ i.service }} | <b>Region</b>: {{ i.region }} | <b>IP Prefix</b>: {{ !!i.ip_prefix ? i.ip_prefix : i.ipv6_prefix }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
