<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

defineProps({
    tableData: Array,
})
</script>

<template>
    <div>
        <DataTable :data="tableData" class="display" data-page-length='25'>
            <thead>
                <tr>
                    <th id="service">Service</th>
                    <th id="region">Region</th>
                    <th id="ip_prefix">IP Prefix</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>
