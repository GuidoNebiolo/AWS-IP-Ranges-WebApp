import axios from "axios"
import { defineStore } from 'pinia'

export const useIpsStore = defineStore('ips', {
    state: () => ({
        data: {}
    }),
    getters: {
        getRaw: (state) => state.data,
        getIPv4s: (state) => state.data.prefixes,
        getIPv6s: (state) => state.data.ipv6_prefixes,
    },
    actions: {
        async load() {
            this.data = await (await axios.get('https://ip-ranges.amazonaws.com/ip-ranges.json')).data
        },
    },
})