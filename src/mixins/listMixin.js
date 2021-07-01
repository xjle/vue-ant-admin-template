export default {
    created() {
        console.log('这里是listMixin');
        this.getList();

    },
    data() {
        return {
            current: 1,
            pageSize: 5,
            total: 0,
            dataSource: [],
            selectedRowKeys: [],
        }
    },
    methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        }
        ,

        loadData(val) {
            console.log(val);
            const {
                page,
                pageSize
            } = val;
            this.current = page;
            this.pageSize = pageSize;
            this.getList();
        },
    }
}