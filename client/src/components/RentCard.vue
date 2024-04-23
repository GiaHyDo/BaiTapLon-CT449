<template>
    <tr v-if="type == -1">
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td v-if="rentBook.trangThai == 0" style="color:brown"><b>Chưa trả sách</b></td>
        <td v-else style="color:green"><b>Đã trả sách</b></td>
    </tr>
    <tr v-else-if="type == 1 && rentBook.trangThai == 1">
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td style="color:green"><b>Đã trả sách</b></td>
    </tr>
    <tr v-else-if="type == 0 && rentBook.trangThai == 0">
        <td>{{ index+1 }}</td>
        <td>{{ book.tenSach }}</td>
        <td>{{ rentBook.ngayMuon }}</td>
        <td>{{ rentBook.ngayTra }}</td>
        <td style="color:brown"><b>Chưa trả sách</b></td>
    </tr>
</template>
<script>
import BookService from '@/services/book.service';
export default {
    props:{
        rentBook: {type: Object,required:true},
        index:{type:Number},
        type:{type:Number},
    },
    data(){
        return{
            book: {},
        }
    },
    methods:{
        async getBook(){
            this.book = await BookService.get(this.rentBook.maSach);
        }
    },
    mounted(){
        this.getBook();
    }
}
</script>

<style scoped>
    th{
        border:1px solid #EC6F13;
        text-align: center;
    }
    td{
        border:1px solid black;
        text-align: center;
        font-size: 17px;
    }
    td:hover {
        border:1px solid black;
        text-align: center;
        font-size: 17px;
        background-color:rgb(240, 148, 29);
    }
</style>