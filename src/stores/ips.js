import axios from "axios"
import { defineStore } from 'pinia'
import check from "ip-range-check";

export const useIPsStore = defineStore('ips', {
    state: () => ({
        rawData: {},
        ranges: []
    }),
    getters: {
        getRaw: (state) => state.rawData,
        getIPv4s: (state) => state.rawData.prefixes,
        getIPv6s: (state) => state.rawData.ipv6_prefixes,
        getIPRangeForIP: (state) => (ip) => state.ranges.filter(range => range.check(ip))
    },
    actions: {
        async load() {
            this.rawData = await (await axios.get('https://ip-ranges.amazonaws.com/ip-ranges.json')).data
            this.ranges = [
                ...this.rawData.prefixes
                    .map(x => Object.assign({}, x, {
                        check: (ip) => check(ip, x.ip_prefix)
                    })),
                ...this.rawData.ipv6_prefixes
                    .map(x => Object.assign({}, x, {
                        check: (ip) => check(ip, x.ipv6_prefix)
                    })),
            ]
        },
    },
})