<template>
    <div class="row w-100 mx-auto rounded p-3" style="margin-top: 15px;">
        <div>
            <marquee style="font-size: 18px;font-weight: bolder; color:bisque">Đăng ký mượn sách ngay để không bỏ lỡ những cuốn sách hay và bổ ích!</marquee>
        </div>
        <div>
            <BookList :books="books" :bookIndex="bookIndex" @show:book="getShowBook" />
        </div>
        <!-- Thêm phần thông tin sách đè nổi lên -->
        <div class="modal-overlay" v-if="bookIndex >= 0">
            <div class="modal-content" style="background-color:rgba(0, 0, 0, 0.9);">
                <!-- Thêm nút đóng -->
                <button class="btn btn-close" @click="hideBookInfo">
                    <i class="fa-regular fa-rectangle-xmark" title="Đóng"></i>
                </button>
                <BookCard :book="filteredBooks" />
                <div v-if="filteredBooks.soQuyen > 0">
                    <button type="button" style="background-color:#EC6F13; margin-top:10px; margin-bottom:10px; border: 2px solid blue; color:black; margin-left:240px;" class="btn btn-outline-secondary" @click="showRent">
                        <b>Mượn sách</b></button>
                    <form @submit.prevent="RentBook(filteredBooks)" style="width: 50%; margin-left:140px"
                        class="border rounded border-2 p-2 border-primary mt-2" v-if="showRentBook">
                        <label class="form-lable"><b>Ngày mượn sách:</b></label>
                        <input v-model="rentBook.ngayMuon" type="date" class="form-control" style="font-size: 17px; background-color: bisque;" required disabled />
                        <br>
                        <label class="form-lable"><b>Chọn ngày trả sách:</b></label>
                        <input v-model="rentBook.ngayTra" :min="rentBook.ngayMuon" type="date" style="font-size: 17px; background-color: bisque;" required class="form-control" />
                        <button class="btn btn-outline-primary mt-2" style="margin-left:70px; color:#EC6F13; border: 1px solid #EC6F13;">Đăng ký mượn</button>
                    </form>
                </div>
                <div v-else style="text-align: center; font-size:20px; color:red">
                    <b>Sách hiện đã được mượn hết!!!</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '@/services/book.service';
import BookList from '@/components/BookList.vue';
import BookCard from '@/components/BookCard.vue';
import theodoimuonsachService from '@/services/theodoimuonsach.service';
export default {
    data() {
        return {
            books: [],
            bookIndex: -1,
            rentBook: {
                maDocGia: "",
                maSach: "",
                ngayMuon: new Date().toISOString().substr(0, 10),
                ngayTra: "",
                trangThai:0
            },
            showRentBook:false,
            showModal: false // Thêm biến showModal để kiểm soát trạng thái của modal
        }
    },
    components: {
        BookList,
        BookCard,
    },
    computed: {
        filteredBooks() {
            return this.books[this.bookIndex];
        }
    },
    methods: {
        showRent(){
            this.showRentBook = !this.showRentBook;
        },
        async getBook() {
            try {
                this.books = await BookService.getAll();
            }
            catch (error) {
                console.log('There was an error!', error);
            }
        },
        getShowBook(bookIndex) {
            this.bookIndex = bookIndex;
            this.showModal = true; // Hiển thị modal khi bấm vào sách tương ứng
        },
        async RentBook(book) {
            this.rentBook.maDocGia = sessionStorage.getItem("userName");
            this.rentBook.maSach = book._id;
            console.log(book);
            try{
                const result = await theodoimuonsachService.create(this.rentBook);
                book.soQuyen =book.soQuyen - 1;
                await BookService.update(book._id,book);
                alert("Đăng ký mượn sách thành công!");
            }
            catch(error){
                console.log(error);
            }
        },
        hideBookInfo() {
            this.bookIndex = -1;
            this.showModal = false; // Ẩn modal khi bấm vào nút đóng
        }
    },
    mounted() {
        if (localStorage.getItem('reloaded')) {
            localStorage.removeItem('reloaded');
        } else {
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
        this.getBook();
    }
}
</script>

<style>
    /* CSS cho phần modal-overlay */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Màu đen với độ mờ 50% */
        z-index: 1000; /* Lớp z-index để nằm trên tất cả các phần tử khác */
        display: flex;
        justify-content: center; /* Căn giữa theo chiều ngang */
        align-items: center; /* Căn giữa theo chiều dọc */
        color: #EC6F13;
    }

    /* CSS cho phần modal-content */
    .modal-content {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Đổ bóng cho phần nội dung */
        max-width: 50%; /* Giới hạn chiều rộng của phần nội dung */
        max-height: 80%; /* Giới hạn chiều cao của phần nội dung */
        overflow-y: auto; /* Hiển thị thanh cuộn khi nội dung quá dài */
        position: relative; /* Đặt vị trí tương đối để có thể đặt nút đóng tuyệt đối */
        border: 3px solid blue;
    }

    .btn-close {
        position: absolute;
        top: 1px;
        right: 10px;
        /* background: none; */
        /* border: none; */
        font-size: 30px;
        cursor: pointer;
        color: #EC6F13;
    }
    /* CSS cho nút đóng */
    .btn-close:hover {
        top: 0px;
        right: 8px;
        font-size: 32px;
        color: #EC6F13;
    }
</style>
