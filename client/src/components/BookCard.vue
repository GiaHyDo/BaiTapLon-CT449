<template>
    <h2 style="font-size: 35px; font-weight: bold;">{{ book.tenSach }}</h2>
    <i class="fa-solid fa-book-open" style="font-size: 170px; position:absolute; left:70px; top:80px;"></i>
    <div class="ms-2" style="padding-left:300px; padding-top:22px;height:200px">
        <p>Tác giả: <b>{{ book.tacGia }}</b></p>
        <p>Năm xuất bản: <b>{{ book.namXuatBan }}</b></p>
        <p>Nhà xuất bản: <b>{{ tenNxb }}</b></p>
        <p>Hiện còn: <b>{{ book.soQuyen }}</b></p>
    </div>
</template>

<script>
import nxbService from '@/services/nxb.service';
export default {
    props: {
        book: { type: Object },
    },
    data() {
        return {
            tenNxb: "",
        }
    },
    methods: {
        async getTenNxb(id) {
            try {
                const result = await nxbService.get(id);
                this.tenNxb = result.tenNxb;
            } catch (error) {
                console.log("Lỗi", error);
            }
        }
    },
    created() {
        this.getTenNxb(this.book.maNxb);
    }
}
</script>