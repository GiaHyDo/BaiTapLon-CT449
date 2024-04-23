<template>
    <div>
    <div v-if="rentBooks.length == 0" class="text-center fs-3 m-auto text-light p-5">
        Không tìm thấy lịch sử mượn sách
    </div>
    <div v-else class="m-auto rounded w-75" style="border: 3px solid #EC6F13; background-color: rgba(0, 0, 0, 0.9);
            border-radius: 10px; margin:0px">
        <h3 class="text-center" style="color:#EC6F13; margin-top:10px">Danh Sách Mượn-Trả Sách</h3>
        <table class="table" style="color:black">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên Sách</th>
                <th>Tên tài khoản</th>
                <th>Tên độc giả</th>
                <th>Ngày mượn</th>
                <th>Ngày hẹn trả</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <RentCard v-for="(book,index) in rentBooks" :key="book._id" :rentBook="book" :index="index" @xacnhan:trasach="TraSach"/>
        </tbody>
    </table>
    </div>
</div>
</template>
<script>
import theodoimuonsachService from '@/services/theodoimuonsach.service';
import BookService from '@/services/book.service';
import RentCard from '@/components/RentCard.vue';
export default {
    data() {
        return {
            rentBooks:[],
        }
    },
    components:{
        RentCard,
    },
    methods: {
        async getRentBooks(){
            this.rentBooks = await theodoimuonsachService.getAll();
        },
        async TraSach(rent){
            rent.trangThai = 1;
            try{
                await theodoimuonsachService.update(rent._id,rent);
                const book = await BookService.get(rent.maSach);
                book.soQuyen += 1;
                await BookService.update(rent.maSach,book);
                alert('Đã cập nhật thành công');
            }catch(error){
                alert('Có lỗi xảy ra');
            }
        }
    },
    mounted(){
        this.getRentBooks();
    }
}
</script>