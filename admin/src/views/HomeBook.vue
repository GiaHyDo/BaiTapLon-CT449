    <template>
        <div style="margin-left:200px; width: 720px; height: 600px; overflow: hidden; position: relative;">
        <div style="padding-left:20px; padding-bottom:10px; background-color: rgba(0, 0, 0, 0.9); border-radius: 10px;padding-top:10px;border:3px solid #EC6F13">
            <div class="w-50">
            <SearchBook v-model="searchText" />
            </div>
            <h4 style="color:bisque; font-size:22px;margin-left:390px;margin-top:18px;position:absolute">
            Thông tin chi tiết sách
            <i class="fas fa-book"></i>
            </h4>
            <div class="row" style="">
            <div class="mt-3 col-md-6">
                <h4 style="font-size: 26px; color:#EC6F13">
                <b style="margin-left:50px">Tất Cả Các Sách
                <i class="fa-regular fa-bookmark"></i>
                </b>
                </h4>
                <!-- Đặt style overflow-y: auto cho phần danh sách sách -->
                <div class="book-list-container" style="max-height: 350px; overflow-y: auto; margin-top:10px">
                <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" @click="retrieveNxb(activeBook.maNxb)" />
                <p v-else>Không có quyển sách nào!</p>
                </div>
                <!-- ----------------------------------------------------------------- -->
                <div class="mt-3 row agign-items-center">
                <button class="btn btn-sm col btn-outline-success me-2" style="color:#EC6F13;" @click="goToAddBook">
                    <b>Thêm sách mới</b>
                </button>
                <button class="btn btn-sm col btn-outline-danger" style="color:#EC6F13" @click="removeAllBooks">
                    <b>Xóa tất cả</b>
                </button>
                </div>
            </div>
            <!-- ----------------------------------------------------------------- -->
            <div class="mt-3 col-md-6">
                <div v-if="activeBook != null" style="padding-top:40px;padding-left:30px;">
                <BookCard :book="activeBook" :tenNXB="tenNxb" />
                <router-link :to="{ name: 'book-edit', params: { id: activeBook._id }}">
                    <span class="mt-2">
                    <button class="btn btn-sm btn-outline-primary" style="margin-top:20px;margin-left:38px;
                        border: 2px solid #EC6F13; color:#EC6F13;font-size: 18px;">
                        <b>Chỉnh sửa</b>
                    </button>
                    </span>
                </router-link>
                <!-- Nút "Xóa" để xóa sách -->
                <button class="btn btn-sm btn-outline-danger" @click="deleteBook" style="margin-top:20px;margin-left:20px;
                    border: 2px solid #EC6F13; color:#EC6F13;font-size: 18px;">
                    <b>Xóa</b>
                </button>
                </div>
                <div v-if="activeBook == null">
                <p style="padding-top:40px;padding-left:10px;color:blue"><b>Vui lòng chọn sách để xem thông tin!</b></p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </template>
    <script>
    import BookList from "@/components/BookList.vue";
    import BookCard from "@/components/BookCard.vue";
    import BookService from "@/services/book.service";
    import SearchBook from "@/components/InputSearch.vue";
    import NxbService from "@/services/nxb.service";
    
    export default {
        components: {
        SearchBook,
        BookList,
        BookCard,
        },
        data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
            nxb: [],
            tenNxb: "",
            userName: "",
        };
        },
        watch: {
        searchText() {
            this.activeIndex = -1;
        },
        },
        computed: {
        bookStrings() {
            return this.books.map((book) => {
            const { tenSach } = book;
            return [this.removeAccents(tenSach)].join().toLowerCase();
            });
        },
        filteredBooks() {
            if (!this.searchText) {
            return this.books;
            }
            return this.books.filter((_book, index) => {
            return this.bookStrings[index].includes(this.searchText);
            });
        },
        activeBook() {
            if (this.activeIndex < 0) {
            return null;
            } else {
            return this.filteredBooks[this.activeIndex];
            }
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
        getUserName() {
            this.userName = sessionStorage.getItem("userName");
            return this.userName;
        },
        },
        methods: {
        removeAccents(string) {
            return string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
        },
        async retrieveNxb(id) {
            try {
            this.nxb = await NxbService.get(id);
            } catch (error) {
            console.log(error);
            }
            this.tenNxb = this.nxb.tenNxb;
        },
        async retrieveBooks() {
            try {
            this.books = await BookService.getAll();
            } catch (error) {
            console.log(error);
            }
        },
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sach?")) {
            try {
                await BookService.deleteAll();
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        goToAddBook() {
            this.$router.push({ name: "book-add" });
        },
        scrollToNext() {
            // Điều chỉnh vị trí cuộn xuống dưới
            const listContainer = document.querySelector(".scroll-container");
            listContainer.scrollBy({
            top: 100, // Điều chỉnh tùy theo kích thước của mỗi mục sách
            behavior: "smooth",
            });
        },
        async deleteBook() {
            if (confirm("Bạn có chắc muốn xóa sách này?")) {
            try {
                await BookService.delete(this.activeBook._id);
                alert("Sách đã được xóa thành công!");
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
            }
        },
        },
        mounted() {
        if (localStorage.getItem("reloaded")) {
            localStorage.removeItem("reloaded");
        } else {
            localStorage.setItem("reloaded", "1");
            location.reload();
        }
        if (!this.getUserName) {
            this.$router.replace({ name: "login" });
        }
        this.refreshList();
        },
    };
    </script>
    