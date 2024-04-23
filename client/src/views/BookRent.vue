<template>
    <div v-if="rentBooks.length == 0" class="text-center fs-3 m-auto p-5 content rounded"
            style="color:#EC6F13; border: 3px solid #EC6F13; background-color: rgba(0, 0, 0, 0.9);">
        Bạn chưa mượn sách!
    </div>
    <div v-else style="border: 3px solid #EC6F13; border-radius: 5px; padding-top:10px; background-color:rgba(0, 0, 0, 0.9)">
        <div class="justify-content-end d-flex mb-2">
            <button style="width:90px;height:38px;margin-right:20px;background-color:#EC6F13;border:2px solid white;font-weight: bold;" @click="showType(-1)">Tất cả</button>
            <button style="width:90px;height:38px;margin-right:20px;background-color:green; color:white;border:2px solid white;font-weight: bold;" @click="showType(1)">Đã trả</button>
            <button style="width:90px;height:38px;margin-right:410px;background-color:brown; color:white;border:2px solid white;font-weight: bold;" @click="showType(0)">Chưa trả</button>
        </div>
        <table class="table" style="border: 3px solid blue;
                background-color:black; margin-bottom:0px;">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Sách</th>
                <th>Ngày Mượn</th>
                <th>Ngày Hẹn Trả</th>
                <th>Trạng Thái</th>
            </tr>
        </thead>
        <tbody>
            <RentCard v-for="(book,index) in rentBooks" :key="book.maDocGia" :rentBook="book" :type="type" :index="index"/>
        </tbody>
    </table>
    </div>
</template>
<script>
import theodoimuonsachService from '@/services/theodoimuonsach.service';
import RentCard from '@/components/RentCard.vue';
export default {
    data() {
        return {
            rentBooks:[],
            type:-1,
        }
    },
    components:{
        RentCard,
    },
    methods: {
        async getRentBooks(){
            this.rentBooks = await theodoimuonsachService.get(sessionStorage.getItem("userName"));
        },
        showType(type){
            this.type = type;
        }
    },
    mounted(){
        this.getRentBooks();
    }
}
</script>

<style scoped>
    table{
    border:1px solid blue;
    }
    th{
        border:2px solid blue;
        text-align: center;
        color: #EC6F13;
        font-weight: bold;
        font-size: 19px;
    }
</style>